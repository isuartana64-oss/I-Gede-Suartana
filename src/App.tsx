/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { schoolStorage } from './data/storage';
import { ExamSchedule, UserSession } from './types';
import { UnifiedLoginForm } from './components/auth/UnifiedLoginForm';
import { Header } from './components/common/Header';
import { StudentPortal } from './components/student/StudentPortal';
import { ExamLockScreen } from './components/student/ExamLockScreen';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [activeExamForStudent, setActiveExamForStudent] = useState<ExamSchedule | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Check saved dark mode
    const isDark = schoolStorage.getDarkMode();
    setDarkMode(isDark);
    schoolStorage.setDarkMode(isDark);

    // Check saved session
    const savedUser = schoolStorage.getCurrentUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    setIsInitialized(true);
  }, []);

  const handleToggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    schoolStorage.setDarkMode(next);
  };

  const handleLogout = () => {
    schoolStorage.setCurrentUser(null);
    setCurrentUser(null);
    setActiveExamForStudent(null);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] dark:bg-slate-950">
        <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in -> Unified Login Form
  if (!currentUser) {
    return (
      <UnifiedLoginForm
        onLoginSuccess={user => setCurrentUser(user)}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
    );
  }

  // Student taking active exam -> Lock Browser Screen
  if (currentUser.role === 'siswa' && activeExamForStudent) {
    return (
      <ExamLockScreen
        exam={activeExamForStudent}
        student={currentUser}
        onFinishExam={() => setActiveExamForStudent(null)}
      />
    );
  }

  // Main application view
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Header */}
      <Header
        currentUser={currentUser}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onLogout={handleLogout}
      />

      {/* Main Content by Role */}
      <main className="flex-1 pb-12">
        {currentUser.role === 'siswa' && (
          <StudentPortal
            student={currentUser}
            onStartExam={exam => setActiveExamForStudent(exam)}
          />
        )}

        {currentUser.role === 'guru' && (
          <TeacherDashboard teacher={currentUser} />
        )}

        {currentUser.role === 'admin' && (
          <AdminDashboard admin={currentUser} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-sky-100 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 py-4 px-4 text-center text-xs text-slate-400">
        <p className="font-semibold text-slate-600 dark:text-slate-300">
          SMA Negeri 1 Selat — Sistem Manajemen & Distribusi Soal Google Form
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Jl. Raya Duda - Selat, Kabupaten Karangasem, Bali • Ujian SAS Terpadu
        </p>
      </footer>
    </div>
  );
}
