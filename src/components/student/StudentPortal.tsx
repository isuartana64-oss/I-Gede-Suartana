import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Lock,
  Play,
  Shield,
  FileText,
  User,
  GraduationCap,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ExamSchedule, StudentSession, UserSession } from '../../types';
import { schoolStorage } from '../../data/storage';

interface StudentPortalProps {
  student: UserSession;
  onStartExam: (exam: ExamSchedule) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  student,
  onStartExam,
}) => {
  const [exams, setExams] = useState<ExamSchedule[]>([]);
  const [sessions, setSessions] = useState<StudentSession[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const refreshData = () => {
    const allExams = schoolStorage.getExams();
    // Filter exams where targetClasses contains student's class OR student NIS is explicitly allowed
    const relevant = allExams.filter(exam => {
      const matchClass = student.className && exam.targetClasses.includes(student.className);
      const matchNis = exam.allowedStudentNisList?.includes(student.id);
      return matchClass || matchNis;
    });

    setExams(relevant);
    setSessions(schoolStorage.getSessions());
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [student]);

  // Compute countdown text
  const getCountdownText = (startTimeIso: string) => {
    const diff = Math.max(0, new Date(startTimeIso).getTime() - currentTime);
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (days > 0) return `${days}h ${hours}j ${minutes}m ${seconds}d`;
    if (hours > 0) return `${hours}j ${minutes}m ${seconds}d`;
    return `${minutes}m ${seconds}d`;
  };

  // Exam categorization
  const activeExams: ExamSchedule[] = [];
  const upcomingExams: ExamSchedule[] = [];
  const completedExams: ExamSchedule[] = [];

  exams.forEach(exam => {
    const start = new Date(exam.startTime).getTime();
    const end = new Date(exam.endTime).getTime();
    const mySession = sessions.find(s => s.examId === exam.id && s.studentNis === student.id);

    if (mySession?.status === 'selesai' || currentTime > end) {
      completedExams.push(exam);
    } else if (currentTime >= start && currentTime <= end) {
      activeExams.push(exam);
    } else if (currentTime < start) {
      upcomingExams.push(exam);
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-100 via-sky-50 to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 sm:p-8 border border-sky-100 dark:border-slate-800 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 text-sky-800 dark:text-sky-300 text-xs font-bold border border-sky-200/50 dark:border-sky-800/50">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Portal Siswa SMAN 1 Selat</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Selamat Datang, {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">NIS: {student.id}</span>
              <span>•</span>
              <span className="font-semibold text-sky-700 dark:text-sky-300">Kelas: {student.className}</span>
              <span>•</span>
              <span>Tahun Ajaran 2026/2027</span>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-sky-100 dark:border-slate-700 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Waktu Sekarang</p>
              <p className="text-sm font-mono font-bold text-slate-800 dark:text-slate-100">
                {new Date(currentTime).toLocaleTimeString('id-ID')} WITA
              </p>
            </div>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-sky-200/20 dark:bg-sky-500/5 pointer-events-none blur-2xl" />
      </div>

      {/* Rules & Anti-Cheat Info Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 flex items-start gap-3">
        <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-300 space-y-1">
          <p className="font-bold">Ketentuan & Keamanan Ujian (Kunci Browser):</p>
          <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-400/90">
            Ujian hanya dapat diakses tepat saat waktu mulai tiba. Saat pengerjaan, dilarang berpindah aplikasi, membuka tab baru, atau keluar dari layar ujian. Pelanggaran tercatat otomatis dan ujian dapat dibekukan oleh sistem jika melanggar toleransi.
          </p>
        </div>
      </div>

      {/* Section 1: Ujian Yang Sedang Berlangsung (Active Now) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Ujian Berlangsung (Siap Dikerjakan)
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {activeExams.length} Soal Tersedia
          </span>
        </div>

        {activeExams.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
            <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Tidak ada ujian yang sedang aktif saat ini
            </p>
            <p className="text-[11px] text-slate-400">
              Silakan cek jadwal ujian yang akan datang pada daftar di bawah.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeExams.map(exam => {
              const mySession = sessions.find(s => s.examId === exam.id && s.studentNis === student.id);
              const isLocked = mySession?.status === 'terkunci_curang';

              return (
                <div
                  key={exam.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 p-5 sm:p-6 border-2 border-sky-400 dark:border-sky-500 shadow-md shadow-sky-500/5 space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 mb-1.5">
                        {exam.subject}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {exam.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Pengampu: {exam.teacherName}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold flex items-center gap-1 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Aktif
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Batas Waktu</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {new Date(exam.endTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WITA
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Durasi</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {exam.durationMinutes} Menit
                      </span>
                    </div>
                  </div>

                  {exam.instructions && (
                    <p className="text-xs text-slate-500 italic bg-amber-50/50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-amber-100 dark:border-slate-700">
                      "{exam.instructions}"
                    </p>
                  )}

                  {isLocked ? (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs font-bold text-center">
                      Akun Anda Terkunci karena Kecurangan. Hubungi Pengawas!
                    </div>
                  ) : (
                    <button
                      onClick={() => onStartExam(exam)}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>{mySession?.status === 'mengerjakan' ? 'Lanjutkan Ujian (Sedang Berlangsung)' : 'Buka & Kerjakan Soal Ujian'}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 2: Jadwal Ujian Akan Datang (Upcoming with Precision Countdown) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Jadwal Ujian Akan Datang
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {upcomingExams.length} Terjadwal
          </span>
        </div>

        {upcomingExams.length === 0 ? (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-400">
            Belum ada jadwal ujian berikutnya untuk kelas Anda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingExams.map(exam => {
              const countdown = getCountdownText(exam.startTime);

              return (
                <div
                  key={exam.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 mb-1">
                        {exam.subject}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {exam.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Guru: {exam.teacherName}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200/60 shrink-0">
                      Akan Datang
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-sky-50/60 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Jadwal Mulai</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {new Date(exam.startTime).toLocaleString('id-ID', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })} WITA
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-sky-600 dark:text-sky-400 block font-semibold">Hitung Mundur</span>
                      <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-300">
                        {countdown || 'Segera'}
                      </span>
                    </div>
                  </div>

                  <button
                    disabled
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Terkunci - Menunggu Jadwal Dibuka</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 3: Riwayat Ujian Yang Telah Diselesaikan */}
      {completedExams.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Riwayat Ujian Selesai
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {completedExams.map(exam => {
              const mySession = sessions.find(s => s.examId === exam.id && s.studentNis === student.id);

              return (
                <div key={exam.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500">
                      {exam.subject}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {exam.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Selesai dikerjakan: {mySession?.completedAt ? new Date(mySession.completedAt).toLocaleString('id-ID') : 'Selesai'}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold shrink-0">
                    Selesai
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
