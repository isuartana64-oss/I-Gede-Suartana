import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Search,
  CheckSquare,
  Square,
  AlertCircle,
  Calendar,
  Clock,
  Link,
  BookOpen,
  Users,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import {
  OFFICIAL_CLASSES,
  OFFICIAL_SUBJECTS,
  Student,
} from '../../data/schoolData';
import { ExamSchedule, UserSession } from '../../types';
import { schoolStorage } from '../../data/storage';

interface CreateExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  currentUser: UserSession;
  examToEdit?: ExamSchedule | null;
}

export const CreateExamModal: React.FC<CreateExamModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  currentUser,
  examToEdit,
}) => {
  const allStudents = useMemo(() => schoolStorage.getAllStudents(), []);

  // Form states
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [subjectSearch, setSubjectSearch] = useState('');
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [googleFormUrl, setGoogleFormUrl] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [allowedNisList, setAllowedNisList] = useState<string[]>([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [lockBrowser, setLockBrowser] = useState(true);
  const [instructions, setInstructions] = useState('Kerjakan secara mandiri dan jujur. Dilarang berpindah aplikasi.');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize or prefill when modal opens
  useEffect(() => {
    if (examToEdit) {
      setTitle(examToEdit.title);
      setSubject(examToEdit.subject);
      setSubjectSearch(examToEdit.subject);
      setGoogleFormUrl(examToEdit.googleFormUrl);
      setSelectedClasses(examToEdit.targetClasses);
      setAllowedNisList(examToEdit.allowedStudentNisList || []);
      setDurationMinutes(examToEdit.durationMinutes || 90);
      setLockBrowser(examToEdit.lockBrowser ?? true);
      setInstructions(examToEdit.instructions || '');

      // Parse dates
      const sDate = new Date(examToEdit.startTime);
      const eDate = new Date(examToEdit.endTime);
      setStartDate(sDate.toISOString().slice(0, 10));
      setStartTime(sDate.toTimeString().slice(0, 8)); // HH:mm:ss
      setEndDate(eDate.toISOString().slice(0, 10));
      setEndTime(eDate.toTimeString().slice(0, 8)); // HH:mm:ss
    } else {
      // Default new exam setup
      setTitle('Sumatif Akhir Semester (SAS)');
      // If teacher has assigned subject, default to first one
      const defaultSubj = currentUser.mapel?.[0] && OFFICIAL_SUBJECTS.includes(currentUser.mapel[0])
        ? currentUser.mapel[0]
        : '';
      setSubject(defaultSubj);
      setSubjectSearch(defaultSubj);
      setGoogleFormUrl('');
      setSelectedClasses(['XII-A']);

      // Prepopulate allowed NIS with students of XII-A
      const initialClassStudents = allStudents.filter(s => s.className === 'XII-A').map(s => s.nis);
      setAllowedNisList(initialClassStudents);

      // Default start time: Now rounded up to next 10 minutes
      const now = new Date();
      now.setMinutes(Math.ceil(now.getMinutes() / 10) * 10, 0, 0);
      setStartDate(now.toISOString().slice(0, 10));
      setStartTime(now.toTimeString().slice(0, 8));

      // Default end time: +90 minutes
      const later = new Date(now.getTime() + 90 * 60000);
      setEndDate(later.toISOString().slice(0, 10));
      setEndTime(later.toTimeString().slice(0, 8));
      setDurationMinutes(90);
      setLockBrowser(true);
      setInstructions('Kerjakan secara mandiri dan jujur. Dilarang berpindah aplikasi selama ujian.');
    }
    setErrorMessage(null);
  }, [examToEdit, isOpen, currentUser, allStudents]);

  // Filter subjects based on search input
  const filteredSubjects = useMemo(() => {
    if (!subjectSearch) return OFFICIAL_SUBJECTS;
    return OFFICIAL_SUBJECTS.filter(s =>
      s.toLowerCase().includes(subjectSearch.toLowerCase())
    );
  }, [subjectSearch]);

  // Students belonging to the selected classes
  const targetClassStudents = useMemo(() => {
    if (selectedClasses.length === 0) return [];
    return allStudents.filter(s => selectedClasses.includes(s.className));
  }, [allStudents, selectedClasses]);

  // Students filtered by studentSearch
  const displayedStudents = useMemo(() => {
    if (!studentSearch.trim()) return targetClassStudents;
    const q = studentSearch.toLowerCase();
    return targetClassStudents.filter(
      s => s.name.toLowerCase().includes(q) || s.nis.includes(q)
    );
  }, [targetClassStudents, studentSearch]);

  // Class toggle handler
  const handleToggleClass = (cls: string) => {
    let nextClasses: string[];
    if (selectedClasses.includes(cls)) {
      nextClasses = selectedClasses.filter(c => c !== cls);
    } else {
      nextClasses = [...selectedClasses, cls];
    }
    setSelectedClasses(nextClasses);

    // Auto update allowed NIS list
    const studentsInNextClasses = allStudents.filter(s => nextClasses.includes(s.className));
    setAllowedNisList(studentsInNextClasses.map(s => s.nis));
  };

  // Toggle single student
  const handleToggleStudent = (nis: string) => {
    if (allowedNisList.includes(nis)) {
      setAllowedNisList(allowedNisList.filter(id => id !== nis));
    } else {
      setAllowedNisList([...allowedNisList, nis]);
    }
  };

  // Select all or deselect all for current target classes
  const handleSelectAllStudents = (select: boolean) => {
    if (select) {
      const allTargetNis = targetClassStudents.map(s => s.nis);
      setAllowedNisList(allTargetNis);
    } else {
      setAllowedNisList([]);
    }
  };

  // Submission validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Title validation
    if (!title.trim()) {
      setErrorMessage('Judul ujian wajib diisi!');
      return;
    }

    // 2. Subject validation from official list
    if (!OFFICIAL_SUBJECTS.includes(subject)) {
      setErrorMessage(
        'Mata pelajaran tidak valid! Silakan pilih mata pelajaran resmi dari daftar dropdown SMAN 1 Selat.'
      );
      return;
    }

    // 3. Google Form URL validation
    if (!googleFormUrl.trim()) {
      setErrorMessage('Link Google Form wajib diisi!');
      return;
    }
    if (
      !googleFormUrl.includes('docs.google.com/forms') &&
      !googleFormUrl.includes('forms.gle') &&
      !googleFormUrl.startsWith('http')
    ) {
      setErrorMessage(
        'Link Google Form tidak valid. Harap masukkan tautan lengkap (contoh: https://docs.google.com/forms/... atau https://forms.gle/...)'
      );
      return;
    }

    // 4. Date and time validation
    if (!startDate || !startTime || !endDate || !endTime) {
      setErrorMessage('Harap lengkapi tanggal, jam, menit, dan detik mulai serta selesai!');
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      setErrorMessage('Format tanggal atau waktu tidak valid!');
      return;
    }

    if (startDateTime >= endDateTime) {
      setErrorMessage('Waktu selesai harus lebih lama daripada waktu mulai ujian!');
      return;
    }

    // 5. Classes and students validation
    if (selectedClasses.length === 0) {
      setErrorMessage('Pilih minimal satu kelas tujuan untuk ujian ini!');
      return;
    }

    if (allowedNisList.length === 0) {
      setErrorMessage('Minimal satu siswa harus dicentang untuk mendapatkan akses ujian!');
      return;
    }

    // Save exam schedule
    const examData: ExamSchedule = {
      id: examToEdit?.id || `exam_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      title: title.trim(),
      subject,
      googleFormUrl: googleFormUrl.trim(),
      targetClasses: selectedClasses,
      allowedStudentNisList: allowedNisList,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      durationMinutes: Number(durationMinutes) || 90,
      lockBrowser,
      instructions: instructions.trim(),
      teacherNip: currentUser.nip || currentUser.id,
      teacherName: currentUser.name,
      createdAt: examToEdit?.createdAt || new Date().toISOString(),
      status: 'scheduled',
    };

    schoolStorage.saveExam(examData);
    onSaved();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-sky-100 dark:border-slate-800 my-auto">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-gradient-to-r from-sky-50/50 to-amber-50/30 dark:from-slate-800/80 dark:to-slate-800/40 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {examToEdit ? 'Ubah Jadwal & Link Soal Ujian' : 'Buat Jadwal & Distribusi Link Google Form'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SMAN 1 Selat • Penjadwalan Presisi & Pembatasan Peserta
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Judul & Mapel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Judul Soal / Ujian <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Contoh: Sumatif Akhir Semester (SAS) Ganjil"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
              />
            </div>

            {/* Mata Pelajaran - Searchable Combobox */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Mata Pelajaran Resmi <span className="text-rose-500">*</span></span>
                {subject && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Valid
                  </span>
                )}
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={subjectSearch}
                  onFocus={() => setIsSubjectDropdownOpen(true)}
                  onChange={e => {
                    setSubjectSearch(e.target.value);
                    setSubject(e.target.value);
                    setIsSubjectDropdownOpen(true);
                  }}
                  placeholder="Ketik untuk mencari mapel..."
                  className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Dropdown Menu */}
              {isSubjectDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700 z-50 py-1 divide-y divide-slate-50 dark:divide-slate-800">
                  {filteredSubjects.length === 0 ? (
                    <div className="p-3 text-center text-xs text-slate-400">
                      Mata pelajaran tidak ditemukan dalam 22 daftar resmi
                    </div>
                  ) : (
                    filteredSubjects.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSubject(s);
                          setSubjectSearch(s);
                          setIsSubjectDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                          subject === s
                            ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{s}</span>
                        {subject === s && <span className="text-sky-600">✓</span>}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 2. Link Google Form */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5 text-sky-600" />
              <span>Tautan / Link Google Form Soal <span className="text-rose-500">*</span></span>
            </label>
            <input
              type="url"
              value={googleFormUrl}
              onChange={e => setGoogleFormUrl(e.target.value)}
              placeholder="https://docs.google.com/forms/d/e/.../viewform atau https://forms.gle/..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Nilai siswa akan otomatis masuk ke Google Spreadsheet / Google Drive akun guru masing-masing.
            </p>
          </div>

          {/* 3. Pengaturan Tanggal, Jam, Menit, Detik Mulai & Selesai Presisi */}
          <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Jadwal Akses Presisi (Tanggal, Jam, Menit, Detik)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Tombol soal benar-benar baru dapat diakses oleh siswa tepat saat detik jadwal mulai tiba.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Mulai */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Waktu Mulai Dibuka
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    required
                    className="px-2.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                  <input
                    type="time"
                    step="1"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    required
                    className="px-2.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-sky-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Selesai */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Waktu Selesai Ditutup
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    required
                    className="px-2.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-sky-400 focus:outline-none"
                  />
                  <input
                    type="time"
                    step="1"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    required
                    className="px-2.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:ring-2 focus:ring-sky-400 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="w-32">
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Durasi Pengerjaan
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="15"
                    max="240"
                    value={durationMinutes}
                    onChange={e => setDurationMinutes(Number(e.target.value))}
                    className="w-20 px-2 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none"
                  />
                  <span className="text-xs text-slate-500">Menit</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="lockBrowserToggle"
                  checked={lockBrowser}
                  onChange={e => setLockBrowser(e.target.checked)}
                  className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                />
                <label htmlFor="lockBrowserToggle" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Aktifkan Kunci Layar & Anti-Kecurangan
                </label>
              </div>
            </div>
          </div>

          {/* 4. Target Kelas & Checklist Siswa */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-600" />
                <span>Target Kelas & Pemilihan Siswa <span className="text-rose-500">*</span></span>
              </label>
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                {allowedNisList.length} dari {targetClassStudents.length} siswa terpilih
              </span>
            </div>

            {/* Class Badges Picker */}
            <div className="space-y-1.5">
              <p className="text-[11px] text-slate-500">Pilih satu atau beberapa kelas tujuan:</p>
              <div className="flex flex-wrap gap-1.5">
                {OFFICIAL_CLASSES.map(cls => {
                  const isSelected = selectedClasses.includes(cls);
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => handleToggleClass(cls)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-sky-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {cls}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Student Checklist Container */}
            {selectedClasses.length > 0 && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
                {/* Search & Select All Actions */}
                <div className="p-3 bg-white dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={studentSearch}
                      onChange={e => setStudentSearch(e.target.value)}
                      placeholder="Cari nama atau NIS siswa..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => handleSelectAllStudents(true)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 hover:bg-sky-200"
                    >
                      Pilih Semua
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectAllStudents(false)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200"
                    >
                      Batalkan Semua
                    </button>
                  </div>
                </div>

                {/* List of Students */}
                <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 p-1">
                  {displayedStudents.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      Tidak ada siswa ditemukan
                    </div>
                  ) : (
                    displayedStudents.map(st => {
                      const isChecked = allowedNisList.includes(st.nis);
                      return (
                        <label
                          key={st.nis}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800/60 cursor-pointer text-xs transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleStudent(st.nis)}
                              className="w-4 h-4 text-sky-600 rounded focus:ring-sky-400 cursor-pointer"
                            />
                            <span className="font-mono text-slate-500 font-semibold">{st.nis}</span>
                            <span className="font-medium text-slate-800 dark:text-slate-200">{st.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400">{st.gender}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-300">
                              {st.className}
                            </span>
                          </div>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 5. Catatan / Instruksi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Petunjuk Tambahan Untuk Siswa
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              placeholder="Contoh: Baca doa sebelum memulai. Periksa jawaban sebelum submit..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all"
            >
              {examToEdit ? 'Simpan Perubahan Jadwal' : 'Jadwalkan & Distribusikan Soal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
