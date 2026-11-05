-- =====================================================================
-- SKRIP DATABASE SUPABASE RESMI - PORTAL UJIAN SMAN 1 SELAT
-- Salin seluruh isi skrip ini ke menu 'SQL Editor' di dashboard Supabase Anda,
-- kemudian klik tombol 'Run' (Jalankan).
-- =====================================================================

-- 1. Tabel Jadwal Soal & Link Ujian (exams)
CREATE TABLE IF NOT EXISTS public.exams (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  google_form_url TEXT NOT NULL,
  target_classes TEXT[] NOT NULL DEFAULT '{}',
  allowed_student_nis_list TEXT[] NOT NULL DEFAULT '{}',
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 90,
  lock_browser BOOLEAN NOT NULL DEFAULT true,
  instructions TEXT DEFAULT '',
  teacher_nip TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabel Sesi Pengerjaan & Pengawasan Siswa Real-time (student_sessions)
CREATE TABLE IF NOT EXISTS public.student_sessions (
  id TEXT PRIMARY KEY,
  exam_id TEXT NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  student_nis TEXT NOT NULL,
  student_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'belum_mulai',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  violations_count INTEGER DEFAULT 0,
  violation_logs JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabel Kustom Kata Sandi Siswa, Guru & Admin (custom_passwords)
CREATE TABLE IF NOT EXISTS public.custom_passwords (
  user_id TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabel Notifikasi & Peringatan Real-time (notifications)
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  read BOOLEAN DEFAULT false,
  target_role TEXT DEFAULT 'all',
  target_user_id TEXT
);

-- =====================================================================
-- KEAMANAN: AKTIFKAN ROW LEVEL SECURITY (RLS) & KEBIJAKAN AKSES PUBLIK
-- =====================================================================

ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_passwords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Kebijakan akses penuh untuk klien anonim (aplikasi ujian SMAN 1 Selat)
DROP POLICY IF EXISTS "Public access exams" ON public.exams;
CREATE POLICY "Public access exams" ON public.exams FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access student_sessions" ON public.student_sessions;
CREATE POLICY "Public access student_sessions" ON public.student_sessions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access custom_passwords" ON public.custom_passwords;
CREATE POLICY "Public access custom_passwords" ON public.custom_passwords FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access notifications" ON public.notifications;
CREATE POLICY "Public access notifications" ON public.notifications FOR ALL USING (true) WITH CHECK (true);

-- =====================================================================
-- FITUR REAL-TIME: AKTIFKAN REPLIKASI LANGSUNG ANTAR PERANGKAT (900 SISWA & GURU)
-- =====================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.exams;
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.custom_passwords;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- =====================================================================
-- SELESAI: Database Supabase SMAN 1 Selat siap digunakan secara online!
-- =====================================================================
