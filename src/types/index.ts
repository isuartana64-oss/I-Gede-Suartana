export type UserRole = 'admin' | 'guru' | 'siswa';

export interface UserSession {
  role: UserRole;
  id: string; // NIS for student, NIP or username for teacher/admin
  name: string;
  className?: string; // for student
  mapel?: string[]; // for teacher
  nip?: string;
  nis?: string;
  gender?: 'L' | 'P';
  title?: string;
}

export interface ExamSchedule {
  id: string;
  title: string;
  subject: string;
  googleFormUrl: string;
  targetClasses: string[]; // e.g. ["X-A", "X-B"]
  allowedStudentNisList: string[]; // specific student NIS permitted
  startTime: string; // ISO string or YYYY-MM-DDTHH:mm:ss
  endTime: string; // ISO string or YYYY-MM-DDTHH:mm:ss
  durationMinutes: number;
  lockBrowser: boolean;
  instructions?: string;
  teacherNip: string;
  teacherName: string;
  createdAt: string;
  status?: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

export interface StudentSession {
  id: string; // examId_nis
  examId: string;
  studentNis: string;
  studentName: string;
  className: string;
  status: 'belum_mulai' | 'mengerjakan' | 'selesai' | 'terkunci_curang';
  startedAt?: string;
  completedAt?: string;
  violationsCount: number;
  violationLogs: Array<{
    timestamp: string;
    type: 'tab_switch' | 'blur' | 'fullscreen_exit' | 'devtools_or_key' | 'other';
    description: string;
  }>;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert' | 'success';
  timestamp: string;
  read: boolean;
  targetRole?: UserRole | 'all';
  targetUserId?: string;
}

export interface UserCredential {
  userId: string; // NIS or NIP or username
  passwordHash: string; // stored plain or simple hash for local storage
  role: UserRole;
  name: string;
}
