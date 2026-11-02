import React, { useState } from 'react';
import { LogOut, Moon, Sun, ShieldCheck, UserCheck } from 'lucide-react';
import { SchoolLogo } from './Logo';
import { NotificationBell } from './NotificationBell';
import { UserSession } from '../../types';

interface HeaderProps {
  currentUser: UserSession;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  darkMode,
  onToggleDarkMode,
  onLogout,
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const getRoleBadge = () => {
    switch (currentUser.role) {
      case 'admin':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Kurikulum / Admin
          </span>
        );
      case 'guru':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Guru Pengampu
          </span>
        );
      case 'siswa':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
            Siswa ({currentUser.className || 'Peserta'})
          </span>
        );
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-sky-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <SchoolLogo size="md" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-white tracking-tight truncate">
                  SMAN 1 SELAT
                </span>
                <span className="hidden sm:inline-block text-[11px] font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md border border-sky-200/60 dark:border-sky-800/60">
                  Ujian Online SAS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate hidden md:block">
                Kabupaten Karangasem, Bali • Portal Terpadu Google Form
              </p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* User status */}
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                {currentUser.name}
              </span>
              <div className="flex items-center justify-end gap-1.5 mt-0.5">
                {getRoleBadge()}
              </div>
            </div>

            {/* Notification Bell */}
            <NotificationBell currentUser={currentUser} />

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              aria-label="Ganti mode tampilan"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
              title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Logout button */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200/80 dark:border-rose-900/60 transition-colors focus:outline-none"
              title="Keluar dari Akun"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-sky-100 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Konfirmasi Keluar
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
              Apakah Anda yakin ingin keluar dari akun <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser.name}</span>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
