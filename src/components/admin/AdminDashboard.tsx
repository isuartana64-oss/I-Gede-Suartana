import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ShieldAlert,
  Search,
  Key,
  Check,
  Plus,
  Trash2,
  Edit3,
  FileSpreadsheet,
  FileText,
  UserCheck,
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  OFFICIAL_CLASSES,
  OFFICIAL_SUBJECTS,
  Student,
  Teacher,
} from '../../data/schoolData';
import { ExamSchedule, StudentSession, UserSession } from '../../types';
import { schoolStorage } from '../../data/storage';
import { CreateExamModal } from '../teacher/CreateExamModal';
import { exportExamReportToExcel, exportExamReportToPDF } from '../../utils/exportUtils';

interface AdminDashboardProps {
  admin: UserSession;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin }) => {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'jadwal' | 'pengawasan' | 'password' | 'siswa' | 'guru'>('ringkasan');
  const [exams, setExams] = useState<ExamSchedule[]>([]);
  const [sessions, setSessions] = useState<StudentSession[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examToEdit, setExamToEdit] = useState<ExamSchedule | null>(null);
  const [examToDelete, setExamToDelete] = useState<ExamSchedule | null>(null);

  // Monitoring
  const [selectedExamId, setSelectedExamId] = useState<string>('');

  // Password Management
  const [passwordUserType, setPasswordUserType] = useState<'siswa' | 'guru' | 'admin'>('siswa');
  const [passwordSearchQuery, setPasswordSearchQuery] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState<string | null>(null);

  // Student directory filters
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('ALL');
  const [studentDirectorySearch, setStudentDirectorySearch] = useState('');

  // Teacher directory search
  const [teacherDirectorySearch, setTeacherDirectorySearch] = useState('');

  const refreshData = () => {
    const allExams = schoolStorage.getExams();
    setExams(allExams);
    const allSessions = schoolStorage.getSessions();
    setSessions(allSessions);
    if (!selectedExamId && allExams.length > 0) {
      setSelectedExamId(allExams[0].id);
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSavePassword = (userId: string) => {
    if (!newPasswordInput.trim()) return;
    schoolStorage.setUserPassword(userId, newPasswordInput.trim());
    setEditingUserId(null);
    setNewPasswordInput('');
    setPasswordSuccessMsg(`Kata sandi untuk ID ${userId} berhasil diperbarui!`);
    setTimeout(() => setPasswordSuccessMsg(null), 3500);
  };

  const handleResetViolation = (examId: string, nis: string) => {
    schoolStorage.resetStudentViolation(examId, nis);
    refreshData();
  };

  const handleDeleteExam = (exam: ExamSchedule) => {
    schoolStorage.deleteExam(exam.id);
    setExamToDelete(null);
    refreshData();
  };

  // Filtered Students for Directory
  const filteredStudents = INITIAL_STUDENTS.filter(s => {
    const matchClass = selectedClassFilter === 'ALL' || s.className === selectedClassFilter;
    const matchSearch =
      !studentDirectorySearch.trim() ||
      s.name.toLowerCase().includes(studentDirectorySearch.toLowerCase()) ||
      s.nis.includes(studentDirectorySearch.trim());
    return matchClass && matchSearch;
  });

  // Filtered Teachers for Directory
  const filteredTeachers = INITIAL_TEACHERS.filter(t => {
    if (!teacherDirectorySearch.trim()) return true;
    const q = teacherDirectorySearch.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.nip.replace(/\s+/g, '').includes(q.replace(/\s+/g, '')) ||
      t.mapel.some(m => m.toLowerCase().includes(q))
    );
  });

  // Current selected exam for monitoring
  const activeExam = exams.find(e => e.id === selectedExamId) || exams[0];
  const activeExamStudents = activeExam
    ? INITIAL_STUDENTS.filter(s =>
        activeExam.targetClasses.includes(s.className) &&
        (activeExam.allowedStudentNisList?.includes(s.nis) ?? true)
      )
    : [];
  const activeExamSessions = activeExam
    ? sessions.filter(s => s.examId === activeExam.id)
    : [];

  const sessionMap = new Map<string, StudentSession>();
  activeExamSessions.forEach(s => sessionMap.set(s.studentNis, s));

  // Violations aggregate count
  const totalViolationsCount = sessions.reduce((acc, s) => acc + (s.violationsCount || 0), 0);
  const activeWorkingStudentsCount = sessions.filter(s => s.status === 'mengerjakan').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Admin Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-100 via-sky-50 to-indigo-50/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 sm:p-7 border border-sky-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 mb-2">
            Administrator & Wakasek Kurikulum
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            I Gede Suartana, S.Pd.
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            NIP: 19880406 202421 1 017 • SMA Negeri 1 Selat, Karangasem, Bali
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
          <span>Tambah Jadwal / Link Soal</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { key: 'ringkasan', label: 'Ringkasan & Dasbor' },
          { key: 'jadwal', label: `Semua Jadwal Soal (${exams.length})` },
          { key: 'pengawasan', label: `Pengawasan Real-Time ${totalViolationsCount > 0 ? `(${totalViolationsCount} Alert)` : ''}` },
          { key: 'password', label: 'Kelola Kata Sandi' },
          { key: 'siswa', label: `Data Siswa (${INITIAL_STUDENTS.length})` },
          { key: 'guru', label: `Data Guru (${INITIAL_TEACHERS.length})` },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: RINGKASAN */}
      {activeTab === 'ringkasan' && (
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Total Murid SMAN 1 Selat</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {INITIAL_STUDENTS.length}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">Kelas X, XI, dan XII Terpadu</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-3">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Dewan Guru</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {INITIAL_TEACHERS.length}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">Terdaftar dengan NIP Resmi</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Mata Pelajaran Resmi</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {OFFICIAL_SUBJECTS.length}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">Sesuai Kurikulum SMAN 1 Selat</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500 font-medium">Jadwal Soal Google Form</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {exams.length}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">{activeWorkingStudentsCount} siswa sedang ujian</p>
            </div>
          </div>

          {/* Quick Info & Guide */}
          <div className="p-5 rounded-3xl bg-sky-50/70 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 space-y-2">
            <h3 className="text-xs font-bold text-sky-900 dark:text-sky-200">
              Karakteristik & Mekanisme Sistem Ujian SMAN 1 Selat:
            </h3>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
              <li>
                <strong>Satu Pintu Akses (Unified Login):</strong> Siswa cukup mengetikkan NIS (contoh: 7056) dan kata sandi default 12345. Guru masuk dengan NIP, dan Admin masuk dengan username admin/kurikulum atau NIP Wakasek.
              </li>
              <li>
                <strong>Kunci Browser Anti-Curang:</strong> Siswa yang membuka aplikasi lain, beralih tab, atau keluar layar penuh akan otomatis dicatat pelanggarannya dan dilaporkan secara real-time.
              </li>
              <li>
                <strong>Penguncian Waktu Presisi:</strong> Link soal Google Form tidak dapat diakses sebelum tanggal, jam, menit, dan detik mulai tiba.
              </li>
              <li>
                <strong>Penyimpanan Nilai Otomatis:</strong> Nilai ujian siswa otomatis masuk ke Google Spreadsheet / Google Drive milik masing-masing guru pembuat soal tanpa membebani server sekolah.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: SEMUA JADWAL SOAL */}
      {activeTab === 'jadwal' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Seluruh Jadwal Ujian Google Form di SMAN 1 Selat
            </h2>
            <button
              onClick={() => {
                setExamToEdit(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 text-white text-xs font-bold hover:bg-sky-600"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Jadwal</span>
            </button>
          </div>

          {exams.length === 0 ? (
            <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
              Belum ada jadwal soal ujian yang dibuat. Klik tombol 'Tambah Jadwal' di atas.
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="py-3 px-3.5">Mata Pelajaran</th>
                      <th className="py-3 px-3.5">Judul Soal</th>
                      <th className="py-3 px-3.5">Guru Pengampu</th>
                      <th className="py-3 px-3.5">Kelas</th>
                      <th className="py-3 px-3.5">Waktu Mulai - Selesai</th>
                      <th className="py-3 px-3.5 text-center">Peserta</th>
                      <th className="py-3 px-3.5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {exams.map(exam => (
                      <tr key={exam.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3.5 font-bold text-sky-700 dark:text-sky-300">
                          {exam.subject}
                        </td>
                        <td className="py-3 px-3.5 font-semibold text-slate-900 dark:text-white">
                          {exam.title}
                        </td>
                        <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300">
                          {exam.teacherName}
                        </td>
                        <td className="py-3 px-3.5 font-semibold">
                          {exam.targetClasses.join(', ')}
                        </td>
                        <td className="py-3 px-3.5 text-slate-500 font-mono text-[11px]">
                          {new Date(exam.startTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {new Date(exam.endTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WITA
                        </td>
                        <td className="py-3 px-3.5 text-center font-bold text-sky-600">
                          {exam.allowedStudentNisList?.length || 0}
                        </td>
                        <td className="py-3 px-3.5 text-center">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedExamId(exam.id);
                                setActiveTab('pengawasan');
                              }}
                              className="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950"
                              title="Pantau Pengawasan"
                            >
                              <Users className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setExamToEdit(exam);
                                setIsModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setExamToDelete(exam)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PENGAWASAN REAL-TIME */}
      {activeTab === 'pengawasan' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
                Pilih Jadwal Ujian:
              </label>
              <select
                value={selectedExamId}
                onChange={e => setSelectedExamId(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                {exams.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.subject} - {e.title} ({e.targetClasses.join(', ')})
                  </option>
                ))}
              </select>
            </div>

            {activeExam && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => exportExamReportToExcel(activeExam, activeExamStudents, activeExamSessions)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Ekspor Excel</span>
                </button>
                <button
                  onClick={() => exportExamReportToPDF(activeExam, activeExamStudents, activeExamSessions)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Ekspor PDF</span>
                </button>
              </div>
            )}
          </div>

          {activeExam ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Berita Acara & Pengawasan Ujian: {activeExam.subject}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pengampu: {activeExam.teacherName} • Target: {activeExam.targetClasses.join(', ')}
                  </p>
                </div>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 dark:bg-sky-950 px-3 py-1 rounded-full">
                  {activeExamStudents.length} Siswa Terjadwal
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3 text-center w-10">No</th>
                      <th className="py-2.5 px-3">NIS</th>
                      <th className="py-2.5 px-3">Nama Siswa</th>
                      <th className="py-2.5 px-3 text-center">Kelas</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                      <th className="py-2.5 px-3 text-center">Waktu Mulai</th>
                      <th className="py-2.5 px-3 text-center">Pelanggaran</th>
                      <th className="py-2.5 px-3 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {activeExamStudents.map((st, i) => {
                      const sess = sessionMap.get(st.nis);
                      let statusBadge = (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500">
                          Belum Masuk
                        </span>
                      );
                      if (sess?.status === 'selesai') {
                        statusBadge = (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            ✓ Selesai
                          </span>
                        );
                      } else if (sess?.status === 'terkunci_curang') {
                        statusBadge = (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                            ⚠️ Terkunci Curang
                          </span>
                        );
                      } else if (sess?.status === 'mengerjakan') {
                        statusBadge = (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                            ● Mengerjakan
                          </span>
                        );
                      }

                      return (
                        <tr key={st.nis} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="py-2.5 px-3 text-center text-slate-400">{i + 1}</td>
                          <td className="py-2.5 px-3 font-mono font-semibold">{st.nis}</td>
                          <td className="py-2.5 px-3 font-semibold">{st.name}</td>
                          <td className="py-2.5 px-3 text-center">{st.className}</td>
                          <td className="py-2.5 px-3 text-center">{statusBadge}</td>
                          <td className="py-2.5 px-3 text-center font-mono text-[11px] text-slate-500">
                            {sess?.startedAt ? new Date(sess.startedAt).toLocaleTimeString('id-ID') : '-'}
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold">
                            {(sess?.violationsCount || 0) > 0 ? (
                              <span className="text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full text-[10px]">
                                {sess?.violationsCount}x keluar
                              </span>
                            ) : (
                              <span className="text-emerald-600 text-[10px]">0</span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {(sess?.violationsCount || 0) > 0 && (
                              <button
                                onClick={() => handleResetViolation(activeExam.id, st.nis)}
                                className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
                              >
                                Buka Kunci
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Belum ada ujian yang dapat dipantau
            </div>
          )}
        </div>
      )}

      {/* TAB 4: KELOLA KATA SANDI */}
      {activeTab === 'password' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Kelola & Atur Ulang Kata Sandi Akun
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Admin berhak mengubah kata sandi siswa, guru, atau akun admin kapan saja sesuai kebutuhan.
              </p>
            </div>

            {passwordSuccessMsg && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{passwordSuccessMsg}</span>
              </div>
            )}

            {/* Filter by Role */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPasswordUserType('siswa')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  passwordUserType === 'siswa'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Siswa (743 Siswa)
              </button>
              <button
                onClick={() => setPasswordUserType('guru')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  passwordUserType === 'guru'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Guru (49 Guru)
              </button>
              <button
                onClick={() => setPasswordUserType('admin')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  passwordUserType === 'admin'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                Akun Admin
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={passwordSearchQuery}
                onChange={e => setPasswordSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan Nama atau NIS/NIP..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </div>

          {/* List of Accounts with Password Change form */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm divide-y divide-slate-100 dark:divide-slate-800 max-h-[600px] overflow-y-auto">
            {passwordUserType === 'admin' ? (
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Administrator Kurikulum (ID: admin / kurikulum)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Kata sandi saat ini: <span className="font-mono">{schoolStorage.getUserPassword('admin')}</span>
                  </p>
                </div>

                {editingUserId === 'admin' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newPasswordInput}
                      onChange={e => setNewPasswordInput(e.target.value)}
                      placeholder="Sandi baru..."
                      className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                    />
                    <button
                      onClick={() => handleSavePassword('admin')}
                      className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-bold text-xs"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditingUserId(null)}
                      className="px-2 py-1.5 text-xs text-slate-500"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingUserId('admin');
                      setNewPasswordInput('');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200"
                  >
                    <Key className="w-3.5 h-3.5 text-sky-500" />
                    <span>Ubah Kata Sandi</span>
                  </button>
                )}
              </div>
            ) : passwordUserType === 'guru' ? (
              INITIAL_TEACHERS.filter(t => {
                if (!passwordSearchQuery) return true;
                const q = passwordSearchQuery.toLowerCase();
                return t.name.toLowerCase().includes(q) || t.nip.includes(q);
              }).map(teacher => {
                const currentPass = schoolStorage.getUserPassword(teacher.nip);
                const isEditing = editingUserId === teacher.nip;

                return (
                  <div key={teacher.nip} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {teacher.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        NIP: {teacher.nip} • Mapel: {teacher.mapel.join(', ')}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Kata Sandi: <span className="font-mono font-bold text-slate-600 dark:text-slate-300">{currentPass}</span>
                      </p>
                    </div>

                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newPasswordInput}
                          onChange={e => setNewPasswordInput(e.target.value)}
                          placeholder="Ketik kata sandi baru..."
                          className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                        />
                        <button
                          onClick={() => handleSavePassword(teacher.nip)}
                          className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-bold text-xs"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
                          className="px-2 py-1.5 text-xs text-slate-500"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingUserId(teacher.nip);
                          setNewPasswordInput('');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 shrink-0"
                      >
                        <Key className="w-3.5 h-3.5 text-sky-500" />
                        <span>Ganti Sandi</span>
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              INITIAL_STUDENTS.filter(s => {
                if (!passwordSearchQuery) return true;
                const q = passwordSearchQuery.toLowerCase();
                return s.name.toLowerCase().includes(q) || s.nis.includes(q);
              }).map(student => {
                const currentPass = schoolStorage.getUserPassword(student.nis);
                const isEditing = editingUserId === student.nis;

                return (
                  <div key={student.nis} className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sky-600">{student.nis}</span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {student.name}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                          {student.className}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Kata Sandi Aktif: <span className="font-mono font-bold text-slate-600 dark:text-slate-300">{currentPass}</span>
                      </p>
                    </div>

                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newPasswordInput}
                          onChange={e => setNewPasswordInput(e.target.value)}
                          placeholder="Sandi baru..."
                          className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                        />
                        <button
                          onClick={() => handleSavePassword(student.nis)}
                          className="px-3 py-1.5 rounded-xl bg-sky-500 text-white font-bold text-xs"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditingUserId(null)}
                          className="px-2 py-1.5 text-xs text-slate-500"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingUserId(student.nis);
                          setNewPasswordInput('');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 shrink-0"
                      >
                        <Key className="w-3.5 h-3.5 text-sky-500" />
                        <span>Ganti Sandi</span>
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 5: DATA SISWA RESMI */}
      {activeTab === 'siswa' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Filter Kelas:</label>
              <select
                value={selectedClassFilter}
                onChange={e => setSelectedClassFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none"
              >
                <option value="ALL">Semua Kelas ({INITIAL_STUDENTS.length})</option>
                {OFFICIAL_CLASSES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={studentDirectorySearch}
                onChange={e => setStudentDirectorySearch(e.target.value)}
                placeholder="Cari nama atau NIS..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-500 flex items-center justify-between border-b border-slate-100 dark:border-slate-700">
              <span>Menampilkan {filteredStudents.length} siswa</span>
              <span>SMAN 1 Selat</span>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase text-[10px] tracking-wider sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3 text-center w-12">No</th>
                    <th className="py-2.5 px-3">NIS</th>
                    <th className="py-2.5 px-3">Nama Lengkap</th>
                    <th className="py-2.5 px-3 text-center">L/P</th>
                    <th className="py-2.5 px-3 text-center">Kelas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredStudents.map((st, i) => (
                    <tr key={st.nis} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 text-center text-slate-400">{i + 1}</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-slate-700 dark:text-slate-300">{st.nis}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">{st.name}</td>
                      <td className="py-2.5 px-3 text-center text-slate-500">{st.gender}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 font-bold text-sky-700 dark:text-sky-300 text-[10px]">
                          {st.className}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DATA GURU RESMI */}
      {activeTab === 'guru' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Daftar 49 Guru SMAN 1 Selat
            </h3>
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={teacherDirectorySearch}
                onChange={e => setTeacherDirectorySearch(e.target.value)}
                placeholder="Cari guru atau mapel..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTeachers.map(t => (
              <div
                key={t.nip}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {t.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">#{t.no}</span>
                </div>
                <p className="text-[11px] font-mono text-slate-500">
                  NIP: {t.nip}
                </p>
                <p className="text-[11px] text-sky-700 dark:text-sky-300 font-semibold">
                  {t.roleTitle} • {t.mapel.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Exam Modal */}
      {examToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-rose-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold mb-1">
              Hapus Jadwal Ujian?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
              Hapus ujian <strong>{examToDelete.subject} - {examToDelete.title}</strong>?
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
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Exam Modal */}
      <CreateExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={refreshData}
        currentUser={admin}
        examToEdit={examToEdit}
      />
    </div>
  );
};
