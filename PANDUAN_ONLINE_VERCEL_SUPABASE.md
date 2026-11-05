# PANDUAN MENGONLINEKAN PORTAL UJIAN SMAN 1 SELAT
## Menggunakan GitHub, Vercel, dan Supabase (Real-Time Database)

Dokumen ini berisi panduan lengkap langkah demi langkah untuk mengonlinekan aplikasi Portal Ujian SMAN 1 Selat agar mampu diakses secara bersamaan oleh 900+ siswa dan 49 dewan guru dengan penyimpanan data tersinkronisasi secara **Real-Time**.

---

### KENAPA SEBELUMNYA GAGAL DI VERCEL? (PENYEBAB & SOLUSI)
Kegagalan pada build Vercel umumnya terjadi karena 2 faktor:
1. **Konflik Peer Dependency npm (`ERESOLVE`):** Node/npm versi baru di Vercel secara ketat memeriksa ketergantungan paket.
   👉 **Solusi yang sudah dibuatkan:** Berkas `.npmrc` (`legacy-peer-deps=true`) dan `package-lock.json` resmi telah ditambahkan ke proyek ini.
2. **Vercel Salah Mendeteksi Tipe Proyek:** Karena terdapat dependensi server/express, Vercel terkadang menganggap proyek ini sebagai server backend Node.js bukan frontend Vite, sehingga gagal mencari folder output.
   👉 **Solusi yang sudah dibuatkan:** Berkas `vercel.json` telah ditambahkan untuk memaksa Vercel menggunakan framework **Vite**, folder output **`dist`**, dan perintah install dengan `--legacy-peer-deps`.

---

## LANGKAH 1: MENYIAPKAN DATABASE SUPABASE (REALTIME)

1. Buka situs [https://supabase.com](https://supabase.com) dan buat akun (bisa *Login with GitHub*).
2. Klik tombol **New Project**:
   - **Name:** `ujian-sman1selat`
   - **Database Password:** Buat password yang kuat dan catat.
   - **Region:** Pilih **Singapore (ap-southeast-1)** agar kecepatan akses dari Bali/Indonesia sangat cepat dan stabil.
   - **Pricing Plan:** Pilih **Free Plan** (cukup untuk ribuan siswa).
   - Klik **Create new project** dan tunggu sekitar 1-2 menit hingga database selesai dibuat.
3. Jalankan Skrip Database:
   - Pada panel sebelah kiri dashboard Supabase, klik menu **SQL Editor** (ikon terminal `>_`).
   - Buka berkas `supabase_schema.sql` yang ada di aplikasi ini.
   - Salin (*copy*) seluruh isinya, lalu tempel (*paste*) ke dalam kolom SQL Editor Supabase.
   - Klik tombol hijau **Run** di pojok kanan bawah.
   - Pastikan muncul pesan `Success. No rows returned`. Seluruh tabel (`exams`, `student_sessions`, `custom_passwords`, `notifications`) dan fitur *Realtime* telah aktif!
4. Salin Kunci API Supabase:
   - Di panel kiri Supabase, klik ikon roda gigi **Project Settings** -> pilih **API**.
   - Salin **Project URL** (contoh: `https://abcdefghijklm.supabase.co`).
   - Salin **Project API Keys** bagian **`anon` `public`** (kunci panjang berawalan `eyJ...`).

---

## LANGKAH 2: MENGUNGGAH / MEMPERBARUI KODE KE GITHUB

Jalankan perintah berikut di komputer Anda agar berkas konfigurasi perbaikan (`vercel.json`, `.npmrc`, `package-lock.json`) terkirim ke GitHub:

```bash
git add .
git commit -m "Perbaikan konfigurasi Vercel dan Supabase"
git push origin main
```

*(Jika baru pertama kali membuat repository di GitHub:)*
```bash
git init
git add .
git commit -m "Inisialisasi Portal Ujian SMAN 1 Selat"
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/portal-ujian-sman1selat.git
git push -u origin main
```

---

## LANGKAH 3: DEPLOY KE VERCEL (CARA SUKSES)

1. Buka [https://vercel.com](https://vercel.com) dan masuk dengan akun GitHub Anda.
2. Jika Anda sudah mencoba deploy sebelumnya dan statusnya **Failed / Error**:
   - Masuk ke proyek tersebut di dashboard Vercel.
   - Pergi ke tab **Settings** -> **General**:
     - **Build Command:** Pastikan berisi `vite build` (atau kosongkan agar dibaca dari `vercel.json`).
     - **Output Directory:** Pastikan berisi `dist` (atau kosongkan agar dibaca dari `vercel.json`).
     - **Install Command:** Pastikan berisi `npm install --legacy-peer-deps`.
   - Pergi ke tab **Settings** -> **Environment Variables**:
     - Tambahkan:
       - **Key:** `VITE_SUPABASE_URL` | **Value:** Masukkan Project URL Supabase Anda.
       - **Key:** `VITE_SUPABASE_ANON_KEY` | **Value:** Masukkan Anon Public Key Supabase Anda.
   - Pergi ke tab **Deployments**, klik titik tiga `...` pada deployment terbaru, lalu pilih **Redeploy**.
3. Jika baru pertama kali mengimpor repository:
   - Klik tombol **Add New...** -> pilih **Project**.
   - Klik tombol **Import** pada repositori `portal-ujian-sman1selat`.
   - Buka menu **Environment Variables**, masukkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
   - Klik **Deploy**.
   - Vercel akan otomatis membaca berkas `vercel.json` dan `.npmrc` yang telah kita siapkan, sehingga proses build langsung sukses 100%!

---

## LANGKAH 4: MENAMBAHKAN DOMAIN SEKOLAH (OPSIONAL)

Jika SMAN 1 Selat ingin menggunakan subdomain resmi sekolah (misal: `ujian.sman1selat.sch.id`):
1. Di dashboard proyek Vercel, masuk ke **Settings** -> **Domains**.
2. Masukkan nama domain: `ujian.sman1selat.sch.id` lalu klik **Add**.
3. Vercel akan memberikan petunjuk DNS (CNAME Record).
4. Hubungi administrator domain web SMAN 1 Selat untuk memasukkan CNAME tersebut ke DNS Management sekolah. Dalam hitungan menit domain resmi sekolah sudah aktif dengan HTTPS!
