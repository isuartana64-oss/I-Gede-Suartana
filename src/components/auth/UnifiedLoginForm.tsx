import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import { SchoolLogo } from '../common/Logo';
import { schoolStorage } from '../../data/storage';
import { UserSession } from '../../types';

interface UnifiedLoginFormProps {
  onLoginSuccess: (user: UserSession) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const UnifiedLoginForm: React.FC<UnifiedLoginFormProps> = ({
  onLoginSuccess,
  darkMode,
  onToggleDarkMode,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage('Silakan masukkan Nomor Induk atau ID Akun Anda.');
      return;
    }

    if (!password) {
      setErrorMessage('Silakan masukkan kata sandi.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = schoolStorage.authenticate(identifier, password);
      setIsLoading(false);

      if (result.success && result.user) {
        schoolStorage.setCurrentUser(result.user);
        onLoginSuccess(result.user);
      } else {
        setErrorMessage(result.error || 'ID Pengguna atau Kata Sandi tidak sesuai.');
      }
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#F0F9FF] via-[#FAF8F5] to-[#F5EFE6] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-8 sm:px-6 lg:px-8 transition-colors">
      {/* Top Bar with School Name and Theme Toggle */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <SchoolLogo size="sm" />
          <span className="text-xs font-bold tracking-tight text-slate-700 dark:text-slate-300">
            SMAN 1 SELAT
          </span>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="text-xs font-medium px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors"
          title="Ganti Mode Tampilan"
        >
          {darkMode ? '🌙 Mode Malam' : '☀️ Mode Terang'}
        </button>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl p-7 sm:p-9 shadow-xl shadow-sky-950/5 border border-sky-100 dark:border-slate-800">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="flex justify-center mb-4">
              <SchoolLogo size="xl" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Portal Ujian Sekolah
            </h1>
            <p className="text-xs sm:text-sm text-sky-800 dark:text-sky-300 font-semibold mt-1">
              SMA NEGERI 1 SELAT
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Pelaksanaan Sumatif Akhir Semester Terpadu
            </p>
          </div>

          {/* Alert Error */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Single Identifier Input */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Nomor Induk / ID Pengguna
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="Masukkan NIS / NIP / ID Akun"
                  autoComplete="username"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-500 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-sm shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Masuk ke Portal Ujian</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Sistem Terenkripsi & Pengawasan Terintegrasi</span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
              Jika mengalami kendala akses, hubungi panitia ujian sekolah atau wali kelas.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-md w-full mx-auto text-center mt-6">
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Tim Kurikulum SMA Negeri 1 Selat
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
          Jl. Raya Duda - Selat, Kabupaten Karangasem, Bali
        </p>
      </footer>
    </div>
  );
};
