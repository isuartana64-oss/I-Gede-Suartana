import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  Student,
  Teacher,
} from './schoolData';
import {
  AppNotification,
  ExamSchedule,
  StudentSession,
  UserSession,
} from '../types';
import { supabase, isSupabaseConfigured, safeSupabase } from './supabase';

const STORAGE_KEYS = {
  EXAMS: 'sman1selat_exams_v1',
  SESSIONS: 'sman1selat_sessions_v1',
  PASSWORDS: 'sman1selat_passwords_v1',
  NOTIFICATIONS: 'sman1selat_notifications_v1',
  DARK_MODE: 'sman1selat_dark_mode_v1',
  CURRENT_USER: 'sman1selat_current_user_v1',
};

// Helper to normalize strings for comparison
export function cleanId(str: string): string {
  return str.replace(/\s+/g, '').trim().toLowerCase();
}

type StorageChangeListener = () => void;

class SchoolStorage {
  private listeners: Set<StorageChangeListener> = new Set();
  private isSyncingWithSupabase = false;

  constructor() {
    this.initSupabaseSync();
  }

  public subscribe(listener: StorageChangeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(cb => {
      try {
        cb();
      } catch (err) {
        console.warn('Listener notification error:', err);
      }
    });
  }

  private getStored<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data) as T;
    } catch (err) {
      console.warn(`Error reading ${key} from storage:`, err);
      return defaultValue;
    }
  }

  private setStored<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`Error saving ${key} to storage:`, err);
    }
  }

  // --- SUPABASE CLOUD & REAL-TIME SYNC ---
  private async initSupabaseSync(): Promise<void> {
    if (!isSupabaseConfigured || !supabase || this.isSyncingWithSupabase) return;
    this.isSyncingWithSupabase = true;

    try {
      // 1. Initial hydration from Supabase
      const [examsRes, sessionsRes, passwordsRes, notifsRes] = await Promise.all([
        supabase.from('exams').select('*').order('created_at', { ascending: false }),
        supabase.from('student_sessions').select('*'),
        supabase.from('custom_passwords').select('*'),
        supabase.from('notifications').select('*').order('timestamp', { ascending: false }).limit(50),
      ]);

      if (examsRes.data) {
        const formattedExams: ExamSchedule[] = examsRes.data.map(row => ({
          id: row.id,
          title: row.title,
          subject: row.subject,
          googleFormUrl: row.google_form_url,
          targetClasses: row.target_classes || [],
          allowedStudentNisList: row.allowed_student_nis_list || [],
          startTime: row.start_time,
          endTime: row.end_time,
          durationMinutes: row.duration_minutes,
          lockBrowser: row.lock_browser,
          instructions: row.instructions,
          teacherNip: row.teacher_nip,
          teacherName: row.teacher_name,
          status: row.status,
          createdAt: row.created_at,
        }));
        this.setStored(STORAGE_KEYS.EXAMS, formattedExams);
      }

      if (sessionsRes.data) {
        const formattedSessions: StudentSession[] = sessionsRes.data.map(row => ({
          id: row.id,
          examId: row.exam_id,
          studentNis: row.student_nis,
          studentName: row.student_name,
          className: row.class_name,
          status: row.status,
          startedAt: row.started_at,
          completedAt: row.completed_at,
          violationsCount: row.violations_count,
          violationLogs: row.violation_logs || [],
        }));
        this.setStored(STORAGE_KEYS.SESSIONS, formattedSessions);
      }

      if (passwordsRes.data) {
        const passMap: Record<string, string> = {};
        passwordsRes.data.forEach(row => {
          passMap[cleanId(row.user_id)] = row.password;
        });
        const localPasswords = this.getCustomPasswords();
        this.setStored(STORAGE_KEYS.PASSWORDS, { ...localPasswords, ...passMap });
      }

      if (notifsRes.data) {
        const formattedNotifs: AppNotification[] = notifsRes.data.map(row => ({
          id: row.id,
          title: row.title,
          message: row.message,
          type: row.type,
          timestamp: row.timestamp,
          read: row.read,
          targetRole: row.target_role,
          targetUserId: row.target_user_id,
        }));
        this.setStored(STORAGE_KEYS.NOTIFICATIONS, formattedNotifs);
      }

      this.notifyListeners();

      // 2. Setup Realtime subscription across all 900+ users
      supabase
        .channel('public:all_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'exams' }, payload => {
          const current = this.getExams();
          if (payload.eventType === 'DELETE') {
            const updated = current.filter(e => e.id !== (payload.old as any).id);
            this.setStored(STORAGE_KEYS.EXAMS, updated);
          } else {
            const row = payload.new as any;
            const updatedItem: ExamSchedule = {
              id: row.id,
              title: row.title,
              subject: row.subject,
              googleFormUrl: row.google_form_url,
              targetClasses: row.target_classes || [],
              allowedStudentNisList: row.allowed_student_nis_list || [],
              startTime: row.start_time,
              endTime: row.end_time,
              durationMinutes: row.duration_minutes,
              lockBrowser: row.lock_browser,
              instructions: row.instructions,
              teacherNip: row.teacher_nip,
              teacherName: row.teacher_name,
              status: row.status,
              createdAt: row.created_at,
            };
            const idx = current.findIndex(e => e.id === updatedItem.id);
            if (idx >= 0) current[idx] = updatedItem;
            else current.unshift(updatedItem);
            this.setStored(STORAGE_KEYS.EXAMS, current);
          }
          this.notifyListeners();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'student_sessions' }, payload => {
          const current = this.getSessions();
          if (payload.eventType === 'DELETE') {
            const updated = current.filter(s => s.id !== (payload.old as any).id);
            this.setStored(STORAGE_KEYS.SESSIONS, updated);
          } else {
            const row = payload.new as any;
            const updatedItem: StudentSession = {
              id: row.id,
              examId: row.exam_id,
              studentNis: row.student_nis,
              studentName: row.student_name,
              className: row.class_name,
              status: row.status,
              startedAt: row.started_at,
              completedAt: row.completed_at,
              violationsCount: row.violations_count,
              violationLogs: row.violation_logs || [],
            };
            const idx = current.findIndex(s => s.id === updatedItem.id);
            if (idx >= 0) current[idx] = updatedItem;
            else current.unshift(updatedItem);
            this.setStored(STORAGE_KEYS.SESSIONS, current);
          }
          this.notifyListeners();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'custom_passwords' }, payload => {
          if (payload.eventType !== 'DELETE') {
            const row = payload.new as any;
            const passes = this.getCustomPasswords();
            passes[cleanId(row.user_id)] = row.password;
            this.setStored(STORAGE_KEYS.PASSWORDS, passes);
            this.notifyListeners();
          }
        })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, payload => {
          const row = payload.new as any;
          const notifs = this.getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
          notifs.unshift({
            id: row.id,
            title: row.title,
            message: row.message,
            type: row.type,
            timestamp: row.timestamp,
            read: row.read,
            targetRole: row.target_role,
            targetUserId: row.target_user_id,
          });
          this.setStored(STORAGE_KEYS.NOTIFICATIONS, notifs.slice(0, 50));
          this.notifyListeners();
        })
        .subscribe();
    } catch (err) {
      console.warn('Supabase sync initialization warning:', err);
    }
  }

  // Passwords Map { [cleanUserId]: newPassword }
  private getCustomPasswords(): Record<string, string> {
    return this.getStored<Record<string, string>>(STORAGE_KEYS.PASSWORDS, {});
  }

  public setUserPassword(userId: string, newPassword: string): void {
    const passwords = this.getCustomPasswords();
    passwords[cleanId(userId)] = newPassword;
    this.setStored(STORAGE_KEYS.PASSWORDS, passwords);
    this.notifyListeners();

    if (isSupabaseConfigured && supabase) {
      safeSupabase(
        supabase.from('custom_passwords').upsert({
          user_id: cleanId(userId),
          password: newPassword,
          updated_at: new Date().toISOString(),
        })
      );
    }
  }

  public getUserPassword(userId: string): string {
    const passwords = this.getCustomPasswords();
    return passwords[cleanId(userId)] || '12345';
  }

  // --- Authentication ---
  // Single input identification: Checks Admin -> Teacher -> Student
  public authenticate(identifierRaw: string, passwordRaw: string): { success: boolean; user?: UserSession; error?: string } {
    if (!identifierRaw.trim() || !passwordRaw) {
      return { success: false, error: 'Harap isi ID Pengguna dan Kata Sandi.' };
    }

    const cleanInput = cleanId(identifierRaw);
    const passInput = passwordRaw.trim();

    // 1. Check Admin
    // Admin usernames: 'admin', 'kurikulum', or Wakasek NIP '198804062024211017' (I Gede Suartana)
    const isAdminId = cleanInput === 'admin' || cleanInput === 'kurikulum' || cleanInput === '198804062024211017';
    if (isAdminId) {
      const savedPass = this.getCustomPasswords()[cleanInput] || this.getCustomPasswords()['admin'];
      const validPass = savedPass ? passInput === savedPass : (passInput === '12345' || passInput === 'admin123');
      if (validPass) {
        return {
          success: true,
          user: {
            role: 'admin',
            id: 'admin',
            name: 'I Gede Suartana, S.Pd. (Wakasek Kurikulum)',
            title: 'Administrator & Wakasek Kurikulum',
            nip: '19880406 202421 1 017',
          },
        };
      }
      return { success: false, error: 'ID Pengguna atau Kata Sandi salah.' };
    }

    // 2. Check Teacher (49 Teachers)
    const matchedTeacher = INITIAL_TEACHERS.find(t => {
      const cleanNip = cleanId(t.nip);
      const cleanName = cleanId(t.name);
      return cleanNip === cleanInput || cleanName === cleanInput;
    });

    if (matchedTeacher) {
      const savedPass = this.getCustomPasswords()[cleanId(matchedTeacher.nip)];
      const validPass = savedPass ? passInput === savedPass : passInput === '12345';
      if (validPass) {
        // If the teacher is Wakasek Kurikulum (I Gede Suartana), offer admin role
        const isKurikulum = matchedTeacher.nip.includes('19880406 202421 1 017');
        return {
          success: true,
          user: {
            role: isKurikulum ? 'admin' : 'guru',
            id: matchedTeacher.nip,
            nip: matchedTeacher.nip,
            name: matchedTeacher.name,
            title: matchedTeacher.roleTitle,
            mapel: matchedTeacher.mapel,
          },
        };
      }
      return { success: false, error: 'ID Pengguna atau Kata Sandi salah.' };
    }

    // 3. Check Student (743 Students)
    const matchedStudent = INITIAL_STUDENTS.find(s => cleanId(s.nis) === cleanInput);
    if (matchedStudent) {
      const savedPass = this.getCustomPasswords()[cleanId(matchedStudent.nis)];
      const validPass = savedPass ? passInput === savedPass : passInput === '12345';
      if (validPass) {
        return {
          success: true,
          user: {
            role: 'siswa',
            id: matchedStudent.nis,
            nis: matchedStudent.nis,
            name: matchedStudent.name,
            className: matchedStudent.className,
            gender: matchedStudent.gender,
          },
        };
      }
      return { success: false, error: 'ID Pengguna atau Kata Sandi salah.' };
    }

    // Not found
    return { success: false, error: 'Akun tidak ditemukan. Periksa NIS / NIP Anda.' };
  }

  // --- Current User Persistence ---
  public getCurrentUser(): UserSession | null {
    return this.getStored<UserSession | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  public setCurrentUser(user: UserSession | null): void {
    this.setStored(STORAGE_KEYS.CURRENT_USER, user);
  }

  // --- Exams Management ---
  public getExams(): ExamSchedule[] {
    return this.getStored<ExamSchedule[]>(STORAGE_KEYS.EXAMS, []);
  }

  public saveExam(exam: ExamSchedule): void {
    const exams = this.getExams();
    const existingIndex = exams.findIndex(e => e.id === exam.id);
    if (existingIndex >= 0) {
      exams[existingIndex] = exam;
    } else {
      exams.unshift(exam);
    }
    this.setStored(STORAGE_KEYS.EXAMS, exams);
    this.notifyListeners();

    // Sync to Supabase
    if (isSupabaseConfigured && supabase) {
      safeSupabase(
        supabase.from('exams').upsert({
          id: exam.id,
          title: exam.title,
          subject: exam.subject,
          google_form_url: exam.googleFormUrl,
          target_classes: exam.targetClasses,
          allowed_student_nis_list: exam.allowedStudentNisList,
          start_time: exam.startTime,
          end_time: exam.endTime,
          duration_minutes: exam.durationMinutes,
          lock_browser: exam.lockBrowser,
          instructions: exam.instructions,
          teacher_nip: exam.teacherNip,
          teacher_name: exam.teacherName,
          status: exam.status || 'scheduled',
          created_at: exam.createdAt,
        })
      );
    }

    // Broadcast notification for students
    this.addNotification({
      id: `notif_${Date.now()}`,
      title: `Jadwal Ujian Baru: ${exam.subject}`,
      message: `${exam.title} untuk kelas ${exam.targetClasses.join(', ')} telah dijadwalkan pada ${new Date(exam.startTime).toLocaleString('id-ID')}.`,
      type: 'info',
      timestamp: new Date().toISOString(),
      read: false,
      targetRole: 'all',
    });
  }

  public deleteExam(examId: string): void {
    const exams = this.getExams().filter(e => e.id !== examId);
    this.setStored(STORAGE_KEYS.EXAMS, exams);

    const sessions = this.getSessions().filter(s => s.examId !== examId);
    this.setStored(STORAGE_KEYS.SESSIONS, sessions);
    this.notifyListeners();

    // Delete in Supabase
    if (isSupabaseConfigured && supabase) {
      safeSupabase(supabase.from('exams').delete().eq('id', examId));
    }
  }

  // --- Student Sessions & Anti-Cheat Real-time Monitoring ---
  public getSessions(examId?: string): StudentSession[] {
    const sessions = this.getStored<StudentSession[]>(STORAGE_KEYS.SESSIONS, []);
    if (examId) {
      return sessions.filter(s => s.examId === examId);
    }
    return sessions;
  }

  public getStudentSession(examId: string, studentNis: string): StudentSession | undefined {
    const sessions = this.getSessions();
    return sessions.find(s => s.examId === examId && s.studentNis === studentNis);
  }

  public recordExamStart(examId: string, student: { nis: string; name: string; className: string }): StudentSession {
    const sessions = this.getSessions();
    let session = sessions.find(s => s.examId === examId && s.studentNis === student.nis);

    if (!session) {
      session = {
        id: `${examId}_${student.nis}`,
        examId,
        studentNis: student.nis,
        studentName: student.name,
        className: student.className,
        status: 'mengerjakan',
        startedAt: new Date().toISOString(),
        violationsCount: 0,
        violationLogs: [],
      };
      sessions.unshift(session);
    } else {
      session.status = 'mengerjakan';
      if (!session.startedAt) session.startedAt = new Date().toISOString();
    }

    this.setStored(STORAGE_KEYS.SESSIONS, sessions);
    this.notifyListeners();

    // Supabase Realtime sync
    if (isSupabaseConfigured && supabase) {
      safeSupabase(
        supabase.from('student_sessions').upsert({
          id: session.id,
          exam_id: session.examId,
          student_nis: session.studentNis,
          student_name: session.studentName,
          class_name: session.className,
          status: session.status,
          started_at: session.startedAt,
          completed_at: session.completedAt || null,
          violations_count: session.violationsCount,
          violation_logs: session.violationLogs,
          updated_at: new Date().toISOString(),
        })
      );
    }

    return session;
  }

  public recordExamFinish(examId: string, studentNis: string): void {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.examId === examId && s.studentNis === studentNis);
    if (session) {
      session.status = 'selesai';
      session.completedAt = new Date().toISOString();
      this.setStored(STORAGE_KEYS.SESSIONS, sessions);
      this.notifyListeners();

      if (isSupabaseConfigured && supabase) {
        safeSupabase(
          supabase.from('student_sessions').upsert({
            id: session.id,
            exam_id: session.examId,
            student_nis: session.studentNis,
            student_name: session.studentName,
            class_name: session.className,
            status: session.status,
            started_at: session.startedAt,
            completed_at: session.completedAt,
            violations_count: session.violationsCount,
            violation_logs: session.violationLogs,
            updated_at: new Date().toISOString(),
          })
        );
      }
    }
  }

  public recordViolation(
    examId: string,
    studentNis: string,
    type: 'tab_switch' | 'blur' | 'fullscreen_exit' | 'devtools_or_key' | 'other',
    description: string
  ): StudentSession | undefined {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.examId === examId && s.studentNis === studentNis);
    if (session) {
      session.violationsCount += 1;
      session.violationLogs.push({
        timestamp: new Date().toISOString(),
        type,
        description,
      });

      if (session.violationsCount >= 5) {
        session.status = 'terkunci_curang';
      }

      this.setStored(STORAGE_KEYS.SESSIONS, sessions);
      this.notifyListeners();

      if (isSupabaseConfigured && supabase) {
        safeSupabase(
          supabase.from('student_sessions').upsert({
            id: session.id,
            exam_id: session.examId,
            student_nis: session.studentNis,
            student_name: session.studentName,
            class_name: session.className,
            status: session.status,
            started_at: session.startedAt,
            completed_at: session.completedAt || null,
            violations_count: session.violationsCount,
            violation_logs: session.violationLogs,
            updated_at: new Date().toISOString(),
          })
        );
      }

      this.addNotification({
        id: `alert_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        title: `Peringatan Kecurangan (${session.studentName})`,
        message: `Siswa ${session.studentName} (${session.className}) terdeteksi ${description} (Pelanggaran ke-${session.violationsCount}).`,
        type: 'alert',
        timestamp: new Date().toISOString(),
        read: false,
        targetRole: 'guru',
      });
    }
    return session;
  }

  public resetStudentViolation(examId: string, studentNis: string): void {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.examId === examId && s.studentNis === studentNis);
    if (session) {
      session.violationsCount = 0;
      session.status = 'mengerjakan';
      this.setStored(STORAGE_KEYS.SESSIONS, sessions);
      this.notifyListeners();

      if (isSupabaseConfigured && supabase) {
        safeSupabase(
          supabase.from('student_sessions').update({
            violations_count: 0,
            status: 'mengerjakan',
            updated_at: new Date().toISOString(),
          }).eq('id', session.id)
        );
      }
    }
  }

  // --- Notifications ---
  public getNotifications(role?: string, userId?: string): AppNotification[] {
    const notifs = this.getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    return notifs.filter(n => {
      if (!role) return true;
      if (n.targetRole === 'all') return true;
      if (n.targetRole === role) return true;
      if (n.targetUserId && userId && n.targetUserId === userId) return true;
      return false;
    });
  }

  public addNotification(notification: AppNotification): void {
    const notifs = this.getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    notifs.unshift(notification);
    this.setStored(STORAGE_KEYS.NOTIFICATIONS, notifs.slice(0, 50));
    this.notifyListeners();

    if (isSupabaseConfigured && supabase) {
      safeSupabase(
        supabase.from('notifications').insert({
          id: notification.id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          timestamp: notification.timestamp,
          read: notification.read,
          target_role: notification.targetRole || 'all',
          target_user_id: notification.targetUserId || null,
        })
      );
    }
  }

  public markNotificationAsRead(id: string): void {
    const notifs = this.getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const target = notifs.find(n => n.id === id);
    if (target) {
      target.read = true;
      this.setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
      this.notifyListeners();

      if (isSupabaseConfigured && supabase) {
        safeSupabase(supabase.from('notifications').update({ read: true }).eq('id', id));
      }
    }
  }

  public markAllNotificationsAsRead(): void {
    const notifs = this.getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    notifs.forEach(n => (n.read = true));
    this.setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
    this.notifyListeners();

    if (isSupabaseConfigured && supabase) {
      safeSupabase(supabase.from('notifications').update({ read: true }).neq('id', ''));
    }
  }

  // --- Dark Mode ---
  public getDarkMode(): boolean {
    return this.getStored<boolean>(STORAGE_KEYS.DARK_MODE, false);
  }

  public setDarkMode(enabled: boolean): void {
    this.setStored(STORAGE_KEYS.DARK_MODE, enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // --- Data Accessors ---
  public getAllStudents(): Student[] {
    return INITIAL_STUDENTS;
  }

  public getAllTeachers(): Teacher[] {
    return INITIAL_TEACHERS;
  }
}

export const schoolStorage = new SchoolStorage();
