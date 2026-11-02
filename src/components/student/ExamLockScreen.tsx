import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lock,
  Maximize2,
  ExternalLink,
  Info,
} from 'lucide-react';
import { ExamSchedule, StudentSession, UserSession } from '../../types';
import { schoolStorage } from '../../data/storage';

interface ExamLockScreenProps {
  exam: ExamSchedule;
  student: UserSession;
  onFinishExam: () => void;
}

export const ExamLockScreen: React.FC<ExamLockScreenProps> = ({
  exam,
  student,
  onFinishExam,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [violations, setViolations] = useState<number>(0);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [showFinishConfirm, setShowFinishConfirm] = useState<boolean>(false);
  const [isLockedByViolations, setIsLockedByViolations] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInteractingWithForm = useRef<boolean>(false);
  const blurTimeoutRef = useRef<number | null>(null);

  // Initialize session & timer
  useEffect(() => {
    // Record start in storage
    const session = schoolStorage.recordExamStart(exam.id, {
      nis: student.id,
      name: student.name,
      className: student.className || '',
    });
    setViolations(session.violationsCount);
    if (session.violationsCount >= 5) {
      setIsLockedByViolations(true);
    }

    // Calculate end time
    const end = new Date(exam.endTime).getTime();
    const now = Date.now();
    const diffSeconds = Math.max(0, Math.floor((end - now) / 1000));
    setSecondsRemaining(diffSeconds);

    // Request fullscreen on start
    requestFullscreen();

    // Timer countdown
    const timerInterval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [exam, student]);

  // Request Fullscreen helper
  const requestFullscreen = () => {
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
      }
    } catch {
      // ignore
    }
  };

  // Anti-Cheat Detectors: ACCURATE APP-SWITCHING DETECTION ONLY (NO FALSE ALARMS ON GOOGLE FORM CLICKS)
  useEffect(() => {
    const handleViolation = (type: 'tab_switch' | 'blur', msg: string) => {
      if (isLockedByViolations) return;

      const updated = schoolStorage.recordViolation(exam.id, student.id, type, msg);
      if (updated) {
        setViolations(updated.violationsCount);
        setWarningMessage(msg);
        setShowWarningModal(true);

        // Vibrate mobile device if supported
        try {
          if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
          }
        } catch {
          // ignore
        }

        if (updated.violationsCount >= 5) {
          setIsLockedByViolations(true);
        }
      }
    };

    // 1. Visibility Change: This ONLY fires when user genuinely leaves the tab, switches apps, or minimizes!
    // It NEVER fires when clicking inside an iframe or filling Google Form options.
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' || document.hidden) {
        handleViolation(
          'tab_switch',
          'Anda terdeteksi beralih ke aplikasi lain atau meninggalkan tab halaman ujian!'
        );
      }
    };

    // 2. Window Blur: Carefully filter out legitimate Google Form clicks!
    // When a user clicks or taps inside the Google Form iframe, the main window loses focus to the iframe.
    // That is NOT a violation—it means the student is actively answering questions!
    const handleWindowBlur = () => {
      if (blurTimeoutRef.current) {
        window.clearTimeout(blurTimeoutRef.current);
      }

      blurTimeoutRef.current = window.setTimeout(() => {
        // If the document is still visible, check if focus moved to the Google Form iframe
        const activeEl = document.activeElement;
        const isIframeActive =
          activeEl === iframeRef.current ||
          activeEl?.tagName === 'IFRAME' ||
          isInteractingWithForm.current;

        // If user is interacting with the Google Form, DO NOT flag violation!
        if (document.visibilityState === 'visible' && isIframeActive) {
          return;
        }

        // If the document is still visible, the student hasn't left the page!
        if (document.visibilityState === 'visible') {
          return;
        }

        // Only trigger if document is genuinely hidden (left the app)
        if (document.visibilityState === 'hidden' || document.hidden) {
          handleViolation(
            'blur',
            'Anda terdeteksi membuka aplikasi lain di luar halaman ujian!'
          );
        }
      }, 400);
    };

    // 3. Page Hide: fires when mobile browser is backgrounded to open WhatsApp/another app
    const handlePageHide = () => {
      handleViolation(
        'tab_switch',
        'Anda terdeteksi beralih ke aplikasi lain!'
      );
    };

    // 4. Fullscreen state update (do not penalize, mobile keyboards cause temporary fullscreen resizing)
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // 5. Prevent developer tools shortcut keys on desktop
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        handleViolation('tab_switch', 'Aksi tombol pintas terlarang dicegah!');
        return false;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('pagehide', handlePageHide);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (blurTimeoutRef.current) {
        window.clearTimeout(blurTimeoutRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('pagehide', handlePageHide);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [exam.id, student.id, isLockedByViolations]);

  const handleTimeExpired = () => {
    schoolStorage.recordExamFinish(exam.id, student.id);
    alert('Waktu ujian telah berakhir! Sesi pengerjaan Anda telah selesai.');
    onFinishExam();
  };

  const handleConfirmFinish = () => {
    schoolStorage.recordExamFinish(exam.id, student.id);
    setShowFinishConfirm(false);
    onFinishExam();
  };

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Convert Google Form URL to embedded version if possible
  const getEmbedUrl = (rawUrl: string) => {
    let url = rawUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    if (url.includes('docs.google.com/forms') && !url.includes('embedded=true')) {
      url += (url.includes('?') ? '&' : '?') + 'embedded=true';
    }
    return url;
  };

  const embedUrl = getEmbedUrl(exam.googleFormUrl);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-100 flex flex-col select-none exam-locked-viewport">
      {/* Top Security & Countdown Header */}
      <header className="bg-slate-950/95 border-b border-slate-800 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 shrink-0">
        {/* Left: Security Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
            <Lock className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">KUNCI BROWSER AKTIF</span>
            <span className="sm:hidden">TERKUNCI</span>
          </div>

          <div className="hidden md:flex flex-col text-xs">
            <span className="font-bold text-slate-200 truncate max-w-xs">{exam.subject} - {exam.title}</span>
            <span className="text-[11px] text-slate-400">{student.name} ({student.className}) • NIS: {student.id}</span>
          </div>
        </div>

        {/* Center: Live Countdown Timer */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700">
          <Clock className={`w-4 h-4 ${secondsRemaining < 300 ? 'text-rose-400 animate-bounce' : 'text-sky-400'}`} />
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-medium leading-none">Sisa Waktu</span>
            <span className={`text-sm sm:text-base font-mono font-bold leading-tight ${secondsRemaining < 300 ? 'text-rose-400' : 'text-slate-100'}`}>
              {formatTime(secondsRemaining)}
            </span>
          </div>
        </div>

        {/* Right: Violations & Finish Button */}
        <div className="flex items-center gap-2">
          {/* Violations Counter */}
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
              violations > 0
                ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Pelanggaran hanya terhitung bila membuka aplikasi lain di luar ujian"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Keluar Aplikasi:</span>
            <span className="font-bold">{violations}/5</span>
          </div>

          {/* Fullscreen Button */}
          {!isFullscreen && (
            <button
              onClick={requestFullscreen}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              title="Aktifkan Layar Penuh"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}

          {/* Selesai Button */}
          <button
            onClick={() => setShowFinishConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Selesai</span>
          </button>
        </div>
      </header>

      {/* Embedded Google Form Viewport */}
      <main
        className="flex-1 w-full bg-slate-100 relative overflow-hidden flex flex-col"
        onMouseEnter={() => {
          isInteractingWithForm.current = true;
        }}
        onMouseLeave={() => {
          isInteractingWithForm.current = false;
        }}
        onTouchStart={() => {
          isInteractingWithForm.current = true;
        }}
      >
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title="Google Form Ujian"
          className="w-full flex-1 border-0"
          allow="camera; microphone; display-capture; fullscreen"
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
          onLoad={() => {
            isInteractingWithForm.current = true;
          }}
        />

        {/* Direct Link Assistant for mobile devices */}
        <div className="bg-slate-900 border-t border-slate-800 py-1.5 px-4 text-center text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px]">
            <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="truncate">Klik jawaban pada formulir Google Form di atas secara normal. Tekan <strong>Kirim</strong> di formulir sebelum klik Selesai.</span>
          </div>
          <a
            href={exam.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-sky-400 hover:underline shrink-0"
          >
            Buka di Tab Terpisah <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </main>

      {/* Violation Alert Modal (Only shown if user actually switched apps or tabs!) */}
      {showWarningModal && !isLockedByViolations && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-rose-500 text-center animate-shake">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-rose-600 dark:text-rose-400 mb-2">
              PERINGATAN KECURANGAN!
            </h3>
            <p className="text-sm font-semibold mb-2">
              {warningMessage}
            </p>
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 mb-6">
              Pelanggaran tercatat: <strong>{violations} dari 5 kali kesempatan</strong>.
              <br />
              Pengawas dan Panitia SAS memantau seluruh perpindahan aplikasi Anda secara real-time.
            </div>
            <button
              onClick={() => {
                setShowWarningModal(false);
                requestFullscreen();
              }}
              className="w-full py-3 px-5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all active:scale-95"
            >
              Saya Mengerti & Kembali ke Soal
            </button>
          </div>
        </div>
      )}

      {/* Permanently Locked Modal if violations reach 5 */}
      {isLockedByViolations && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-lg">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-rose-600 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-600 text-white mx-auto flex items-center justify-center mb-4 animate-bounce">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-rose-600 mb-2">
              UJIAN DIBEKUKAN
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Anda telah melakukan pelanggaran lebih dari batas toleransi (5 kali beralih ke aplikasi lain).
              Sistem telah mengunci pengerjaan soal dan mengirimkan laporan ke Pengawas Ujian.
            </p>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 mb-6">
              Silakan segera temui Pengawas Ujian di ruang kelas Anda untuk verifikasi identitas dan pembukaan kunci.
            </div>
            <button
              onClick={onFinishExam}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
            >
              Tutup & Keluar ke Halaman Awal
            </button>
          </div>
        </div>
      )}

      {/* Selesai / Submit Confirmation Modal */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-sky-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold mb-1">
              Konfirmasi Selesai Mengerjakan
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Apakah Anda sudah menekan tombol <strong>Kirim / Submit</strong> pada formulir Google Form di atas?
            </p>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-left text-xs text-amber-800 dark:text-amber-300 mb-6">
              ⚠️ <strong>Penting:</strong> Setelah Anda menekan 'Ya, Selesai', Anda tidak dapat membuka kembali lembar soal ini.
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => setShowFinishConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                onClick={handleConfirmFinish}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition-colors"
              >
                Ya, Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
