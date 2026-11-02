import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Clock,
  ExternalLink,
  ShieldAlert,
  Users,
  FileSpreadsheet,
  FileText,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { ExamSchedule, StudentSession, UserSession } from '../../types';
import { schoolStorage } from '../../data/storage';
import { CreateExamModal } from './CreateExamModal';
import { exportExamReportToExcel, exportExamReportToPDF } from '../../utils/exportUtils';

interface TeacherDashboardProps {
  teacher: UserSession;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teacher }) => {
  const [exams, setExams] = useState<ExamSchedule[]>([]);
  const [sessions, setSessions] = useState<StudentSession[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examToEdit, setExamToEdit] = useState<ExamSchedule | null>(null);
  const [selectedExamIdForMonitor, setSelectedExamIdForMonitor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jadwal' | 'pengawasan'>('jadwal');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [examToDelete, setExamToDelete] = useState<ExamSchedule | null>(null);

  const refreshData = () => {
    const all = schoolStorage.getExams();
    // Teacher sees their own exams (or all if admin)
    const filtered = teacher.role === 'admin'
      ? all
      : all.filter(e => e.teacherNip === teacher.nip || e.teacherName === teacher.name);
    setExams(filtered);
    setSessions(schoolStorage.getSessions());

    if (!selectedExamIdForMonitor && filtered.length > 0) {
      setSelectedExamIdForMonitor(filtered[0].id);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
      setSessions(schoolStorage.getSessions());
    }, 3000);
    return () => clearInterval(interval);
  }, [teacher]);

  const handleDeleteExam = (exam: ExamSchedule) => {
    schoolStorage.deleteExam(exam.id);
    setExamToDelete(null);
    refreshData();
  };

  const handleResetViolation = (examId: string, nis: string) => {
    schoolStorage.resetStudentViolation(examId, nis);
    refreshData();
  };

  const allStudents = schoolStorage.getAllStudents();
  const selectedExam = exams.find(e => e.id === selectedExamIdForMonitor) || exams[0];

  const currentExamStudents = selectedExam
    ? allStudents.filter(s =>
        selectedExam.targetClasses.includes(s.className) &&
        (selectedExam.allowedStudentNisList?.includes(s.nis) ?? true)
      )
    : [];

  const currentExamSessions = selectedExam
    ? sessions.filter(s => s.examId === selectedExam.id)
    : [];

  const sessionMap = new Map<string, StudentSession>();
  currentExamSessions.forEach(s => sessionMap.set(s.studentNis, s));

  // Compute status badge for exam card
  const getExamStatus = (exam: ExamSchedule) => {
    const s = new Date(exam.startTime).getTime();
    const e = new Date(exam.endTime).getTime();
    if (currentTime < s) {
      return {
        label: 'Akan Datang',
        color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200',
      };
    }
    if (currentTime > e) {
      return {
        label: 'Selesai / Berakhir',
        color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200',
      };
    }
    return {
      label: 'Sedang Berlangsung',
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 animate-pulse',
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-100 via-sky-50 to-amber-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 sm:p-7 border border-sky-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-200/70 text-sky-900 dark:bg-sky-950 dark:text-sky-300 mb-2">
            Panel Pengelolaan Ujian Guru
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {teacher.name}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
            <span>NIP: {teacher.nip || teacher.id}</span>
            <span>•</span>
            <span className="font-semibold text-sky-700 dark:text-sky-300">
              Mapel: {teacher.mapel?.join(', ') || 'Semua Mata Pelajaran'}
            </span>
          </p>
        </div>

        <button
          onClick={() => {
            setExamToEdit(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 active:scale-95 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Jadwal Soal Baru</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('jadwal')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'jadwal'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Daftar Soal & Jadwal ({exams.length})
        </button>
        <button
          onClick={() => setActiveTab('pengawasan')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'pengawasan'
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>Pemantauan & Laporan Real-Time</span>
          {sessions.some(s => s.violationsCount > 0) && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          )}
        </button>
      </div>

      {/* TAB 1: DAFTAR SOAL & JADWAL */}
      {activeTab === 'jadwal' && (
        <div className="space-y-4">
          {exams.length === 0 ? (
            <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Belum Ada Jadwal Soal Ujian
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Silakan klik tombol <strong>'Buat Jadwal Soal Baru'</strong> untuk memasukkan link Google Form soal Anda, menentukan kelas tujuan, dan menetapkan waktu mulai pengerjaan.
              </p>
              <button
                onClick={() => {
                  setExamToEdit(null);
                  setIsModalOpen(true);
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-bold hover:bg-sky-600"
              >
                <Plus className="w-4 h-4" />
                <span>Mulai Buat Jadwal</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exams.map(exam => {
                const status = getExamStatus(exam);
                const allowedCount = exam.allowedStudentNisList?.length || 0;

                return (
                  <div
                    key={exam.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-sky-300 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border border-sky-100 dark:border-sky-900 truncate">
                          {exam.subject}
                        </span>
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${status.color}`}>
                          {status.label}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {exam.title}
                      </h3>

                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Kelas:</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {exam.targetClasses.join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Peserta Berhak:</span>
                          <span className="font-semibold text-sky-600 dark:text-sky-400">
                            {allowedCount} Siswa
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Mulai:</span>
                          <span className="font-medium">
                            {new Date(exam.startTime).toLocaleString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })} WITA
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Selesai:</span>
                          <span className="font-medium">
                            {new Date(exam.endTime).toLocaleString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })} WITA
                          </span>
                        </div>
                      </div>

                      <a
                        href={exam.googleFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 font-mono truncate"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{exam.googleFormUrl}</span>
                      </a>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setSelectedExamIdForMonitor(exam.id);
                          setActiveTab('pengawasan');
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-sky-700 dark:text-sky-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Pantau</span>
                      </button>

                      <button
                        onClick={() => {
                          setExamToEdit(exam);
                          setIsModalOpen(true);
                        }}
                        className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit Jadwal Soal"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setExamToDelete(exam)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        title="Hapus Jadwal Soal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PEMANTAUAN REAL-TIME & EKSPOR LAPORAN */}
      {activeTab === 'pengawasan' && (
        <div className="space-y-4">
          {/* Exam Selector & Export Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                Pilih Ujian Untuk Dipantau:
              </label>
              <select
                value={selectedExamIdForMonitor || ''}
                onChange={e => setSelectedExamIdForMonitor(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                {exams.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.subject} - {e.title} ({e.targetClasses.join(', ')})
                  </option>
                ))}
              </select>
            </div>

            {selectedExam && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => exportExamReportToExcel(selectedExam, currentExamStudents, currentExamSessions)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Ekspor Excel</span>
                </button>

                <button
                  onClick={() => exportExamReportToPDF(selectedExam, currentExamStudents, currentExamSessions)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Ekspor PDF</span>
                </button>
              </div>
            )}
          </div>

          {/* Monitoring Stats */}
          {selectedExam ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <p className="text-[11px] text-slate-400 font-medium">Total Peserta Terdaftar</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    {currentExamStudents.length}
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-sky-100 dark:border-slate-800">
                  <p className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold">Sedang Mengerjakan</p>
                  <p className="text-xl font-black text-sky-600 dark:text-sky-400 mt-1">
                    {currentExamSessions.filter(s => s.status === 'mengerjakan').length}
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-slate-800">
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Telah Selesai</p>
                  <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    {currentExamSessions.filter(s => s.status === 'selesai').length}
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-rose-100 dark:border-slate-800">
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">Terdeteksi Pelanggaran</p>
                  <p className="text-xl font-black text-rose-600 dark:text-rose-400 mt-1">
                    {currentExamSessions.filter(s => s.violationsCount > 0).length}
                  </p>
                </div>
              </div>

              {/* Table of Students in selected exam */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Daftar Hadir & Aktivitas Siswa ({selectedExam.targetClasses.join(', ')})
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Pembaruan otomatis tiap 3 detik
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800">
                      <tr>
                        <th className="py-3 px-3 text-center w-10">No</th>
                        <th className="py-3 px-3">NIS</th>
                        <th className="py-3 px-3">Nama Siswa</th>
                        <th className="py-3 px-3 text-center">Kelas</th>
                        <th className="py-3 px-3 text-center">Status</th>
                        <th className="py-3 px-3 text-center">Waktu Mulai</th>
                        <th className="py-3 px-3 text-center">Pelanggaran Layar</th>
                        <th className="py-3 px-3 text-center">Aksi Pengawas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {currentExamStudents.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-slate-400">
                            Tidak ada siswa yang didaftarkan pada ujian ini
                          </td>
                        </tr>
                      ) : (
                        currentExamStudents.map((st, i) => {
                          const sess = sessionMap.get(st.nis);
                          let statusBadge = (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500">
                              Belum Masuk
                            </span>
                          );

                          if (sess) {
                            if (sess.status === 'selesai') {
                              statusBadge = (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                  ✓ Selesai
                                </span>
                              );
                            } else if (sess.status === 'terkunci_curang') {
                              statusBadge = (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                                  ⚠️ Terkunci Curang
                                </span>
                              );
                            } else if (sess.status === 'mengerjakan') {
                              statusBadge = (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                                  ● Sedang Mengerjakan
                                </span>
                              );
                            }
                          }

                          const hasViolation = (sess?.violationsCount || 0) > 0;

                          return (
                            <tr
                              key={st.nis}
                              className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                                hasViolation ? 'bg-rose-50/20' : ''
                              }`}
                            >
                              <td className="py-2.5 px-3 text-center text-slate-400">{i + 1}</td>
                              <td className="py-2.5 px-3 font-mono font-semibold text-slate-700 dark:text-slate-300">{st.nis}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                                {st.name}
                              </td>
                              <td className="py-2.5 px-3 text-center">
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-bold text-[10px]">
                                  {st.className}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-center">{statusBadge}</td>
                              <td className="py-2.5 px-3 text-center font-mono text-[11px] text-slate-500">
                                {sess?.startedAt ? new Date(sess.startedAt).toLocaleTimeString('id-ID') : '-'}
                              </td>
                              <td className="py-2.5 px-3 text-center">
                                {hasViolation ? (
                                  <span className="inline-flex items-center gap-1 font-bold text-rose-600 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-full text-[10px]">
                                    <ShieldAlert className="w-3 h-3" />
                                    {sess?.violationsCount}x keluar
                                  </span>
                                ) : (
                                  <span className="text-emerald-600 text-[10px] font-medium">Tertib (0)</span>
                                )}
                              </td>
                              <td className="py-2.5 px-3 text-center">
                                {hasViolation ? (
                                  <button
                                    onClick={() => handleResetViolation(selectedExam.id, st.nis)}
                                    className="p-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 inline-flex items-center gap-1"
                                    title="Buka kembali kunci siswa jika terjadi kendala teknis"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                    <span>Reset Kunci</span>
                                  </button>
                                ) : (
                                  <span className="text-slate-400 text-[10px]">-</span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Pilih ujian di atas untuk melihat data pemantauan
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {examToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-rose-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold mb-1">
              Hapus Jadwal Soal Ujian?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
              Apakah Anda yakin ingin menghapus ujian <strong>{examToDelete.subject} - {examToDelete.title}</strong>? Aksi ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setExamToDelete(null)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteExam(examToDelete)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      <CreateExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={refreshData}
        currentUser={teacher}
        examToEdit={examToEdit}
      />
    </div>
  );
};
