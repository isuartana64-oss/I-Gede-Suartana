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

class SchoolStorage {
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

  // Passwords Map { [cleanUserId]: newPassword }
  private getCustomPasswords(): Record<string, string> {
    return this.getStored<Record<string, string>>(STORAGE_KEYS.PASSWORDS, {});
  }

  public setUserPassword(userId: string, newPassword: string): void {
    const passwords = this.getCustomPasswords();
    passwords[cleanId(userId)] = newPassword;
    this.setStored(STORAGE_KEYS.PASSWORDS, passwords);
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
  // Notice: user requested "kosongkan semua data sampel", so default is empty array []!
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

    // Broadcast notification for students in the class
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

    // Also clean up any sessions for this exam
    const sessions = this.getSessions().filter(s => s.examId !== examId);
    this.setStored(STORAGE_KEYS.SESSIONS, sessions);
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
    return session;
  }

  public recordExamFinish(examId: string, studentNis: string): void {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.examId === examId && s.studentNis === studentNis);
    if (session) {
      session.status = 'selesai';
      session.completedAt = new Date().toISOString();
      this.setStored(STORAGE_KEYS.SESSIONS, sessions);
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

      // If violations exceed 5, flag as locked
      if (session.violationsCount >= 5) {
        session.status = 'terkunci_curang';
      }

      this.setStored(STORAGE_KEYS.SESSIONS, sessions);

      // Create high-priority real-time alert for proctors/teachers
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
    // Keep max 50 recent notifications
    this.setStored(STORAGE_KEYS.NOTIFICATIONS, notifs.slice(0, 50));
  }

  public markNotificationAsRead(id: string): void {
    const notifs = this.getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const target = notifs.find(n => n.id === id);
    if (target) {
      target.read = true;
      this.setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
    }
  }

  public markAllNotificationsAsRead(): void {
    const notifs = this.getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    notifs.forEach(n => (n.read = true));
    this.setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
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
