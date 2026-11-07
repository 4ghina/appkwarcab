# Pemetaan Migrasi SIM-KWARCAB
**Dokumen Arsitektur & Transisi Sistem Informasi Manajemen Kwartir Cabang**

---

## 1. Hasil Audit & Kondisi Awal Proyek
| Aspek | Implementasi Awal (AI Studio Runtime) | Catatan Status |
| :--- | :--- | :--- |
| **Runtime Container** | Node.js v22.14.0 / npm v10.9.2 / Bun v1.2.4 (Debian GNU/Linux 12 Bookworm) | PHP, Composer, dan MySQL tidak terpasang bawaan di container AI Studio |
| **Web Server & API** | Express v4.21.2 + Vite v8.3.0 (`server.ts`) melayani port 3000 | Berfungsi penuh & responsif |
| **Penyimpanan Data** | JSON storage di `/data/*.json` (`app-config.json`, `operational-events.json`) | Persisten lokal, belum relasional ACID |
| **Media Storage** | Local directory `/uploads/` dengan upload handler Multer | Berfungsi penuh untuk file hingga 5MB |
| **Autentikasi** | OTP Email simulasi backend (`/api/auth/*`) dengan cookie/session state | Berfungsi penuh untuk login, onboarding, dan pencegahan akun duplikat |
| **Frontend UI/UX** | React 19 + Tailwind CSS + Lucide Icons + Motion | Mobile-first community superapp theme (Cokelat `#5D4037`, Cream `#FAF8F5`, Hijau `#2E7D32`, Kuning `#F59E0B`) |
| **Pemisahan 3 Status** | Status email, status keanggotaan Gudep, dan daftar penugasan dipisah | Berfungsi pada UserProfile & UI |

---

## 2. Pemetaan Fitur ke Arsitektur Target (Laravel + Filament + MySQL)

| Fitur SIM-KWARCAB | Implementasi Node/React Saat Ini | Implementasi Target Laravel | Status Transisi |
| :--- | :--- | :--- | :--- |
| **Website Publik (Beranda, Profil)** | `HomeDashboard.tsx` & Desktop view | `routes/web.php` -> `HomeController@index` -> `views/public/home.blade.php` | Sudah dirancang & siap pakai |
| **Direktori Kwarran & Gudep** | `GudepMapView.tsx` (list & map) | `routes/web.php` -> `DirectoryController@ranting` & `@gudep` -> `views/public/*-detail.blade.php` | Slug URL publik `/ranting/{slug}`, `/gudep/{slug}` |
| **Verifikasi KTA & Dokumen Publik** | Digital KTA QR display di portal | `routes/web.php` -> `VerificationController@verifyKta` -> `views/public/verify-document.blade.php` | Terbuka publik, data sensitif (NIK, HP, alamat) disensor demi privasi |
| **Portal Anggota (`/portal`)** | App tab navigation & profile views | `routes/web.php` (auth middleware) -> `PortalController` -> `views/portal/*.blade.php` | Siap diintegrasikan |
| **Autentikasi OTP Email** | `AuthView.tsx` + `/api/auth/send-otp` | `OtpAuthService.php` + `OtpAuthController.php` (Laravel Mail + Queue + Hashing) | Hashing sha256/bcrypt, cooldown 60 detik, max attempts 5 |
| **Pencegahan Akun Ganda** | Indexed by email di memory & file | `users` table unique index pada kolom `email` | Skema migration strict |
| **Pemisahan 3 Status** | `UserProfile` (emailVerified, membershipStatus, assignments) | Relasi `User` 1:1 `MemberProfile`, 1:N `UserAssignment` | Enforce via Eloquent scopes & policies |
| **E-SKU & E-SKK** | `SKUProgressView.tsx` | `SkuItem`, `MemberSkuProgress`, `SkkBadge` models & migration | Pencatatan penguji, tanggal, dan bukti pengujian |
| **E-Garuda (4 Tahapan)** | `GarudaTrackerView.tsx` | `GarudaApplication` & `GarudaReview` models (Gudep -> Kwarran -> Kwarcab -> SK) | Tiered status flow & nomor SK resmi |
| **Pendaftaran Kegiatan & Kuota** | `EventsView.tsx` | `EventQuotaService.php` dengan `DB::transaction()` dan `lockForUpdate()` | Mencegah race condition / overbooking |
| **KTA RFID/NFC & Absensi** | `RfidNfcCardModule.tsx` + `/api/rfid/*` | `CardIdentity`, `EventAttendance`, `CardBalanceLog` models & migration 10 | Absensi debounce 60s, cek saldo & mutasi kartu read-only |
| **Pendidikan Dewasa & SHB/SHL** | `PusdiklatcabView.tsx` | `AdultEducationCourse`, `AuthorityDocument` models & migration 11 | KMD, KML, KPD, KPL, SHB, SHL tanpa tugas SKU pribadi |
| **Panel Pengelola (Admin/CMS)** | `AppSettingsConsole.tsx` & `VerificationQueue.tsx` | Filament v3 Resources: `MemberResource`, `OrganizationUnitResource`, `VerificationQueueResource`, `EventResource`, `AppSettingResource` | Hak akses bertingkat: Pembina, Admin Kwarran, Superadmin Kwarcab |
| **Migrasi Data Warisan** | File JSON di `/data/` | `php artisan simkwarcab:import-legacy` | Dukungan `--dry-run`, validasi skema, rollback transaksional |

---

## 3. Pemetaan Skema Database Relasional (MySQL / MariaDB)

```
[users] 
  id, email (UNIQUE), name, phone, email_verified_at, password (nullable for OTP), created_at, updated_at
    │ 1:1
    ▼
[member_profiles]
  id, user_id (FK), nta (UNIQUE, nullable), provisional_nta, golongan, tingkatan,
  birth_date, gender, blood_type, address, membership_status (unregistered/pending/verified/revision),
  is_garuda, garuda_year, parent_user_id (FK, nullable)
    │ 1:N
    ▼
[user_assignments]
  id, user_id (FK), organization_unit_id (FK), role_type, title, is_primary, approved_by, approved_at
    │ N:1
    ▼
[organization_units]
  id, parent_id (FK, self-referencing), type (kwarcab/kwarran/gudep/saka/pusdiklatcab),
  name, slug (UNIQUE), nomor_gudep_pa, nomor_gudep_pi, pangkalan, alamat, kontak_wa, akreditasi, status

[membership_applications]
  id, user_id (FK), target_organization_id (FK), applied_role, target_golongan, claim_nta,
  status (pending/approved/rejected/revision), reviewer_id (FK), reviewer_notes, applied_at

[events]
  id, organization_unit_id (FK), nama, slug (UNIQUE), tingkat, tanggal_mulai, tanggal_selesai,
  lokasi, total_kuota, sisa_kuota, deadline_pendaftaran, min_usia, max_usia, min_tingkatan, status

[event_registrations]
  id, event_id (FK), organization_unit_id (FK), registered_by_user_id (FK), jumlah_peserta, status,
  UNIQUE(event_id, organization_unit_id)

[sku_items] & [member_sku_progress]
  Pelacakan butir SKU per nomor, kategori, penguji, status kelulusan, dan catatan

[garuda_applications] & [garuda_reviews]
  Tahapan pengajuan: 1=Gudep, 2=Kwarran, 3=Kwarcab, 4=SK Terbit

[app_settings], [text_catalogs], [media_assets], [audit_logs]
  Konfigurasi dinamis, katalog teks UI, media terpusat, dan riwayat revisi
```

---

## 4. Evaluasi Lingkungan Runtime AI Studio
- Container environment berjalan pada Node.js/Linux container.
- Aplikasi web interaktif SIM-KWARCAB berjalan mulus pada **port 3000** menggunakan Express + Vite + React, menyajikan prototipe fungsional lengkap (termasuk fitur publik baru: halaman verifikasi KTA, direktori, pengumuman, dan portal).
- Kode sumber arsitektur Laravel yang lengkap dan terstruktur dibangun di direktori `/laravel-app/` agar dapat langsung di-*deploy* atau diuji di lingkungan server PHP 8.2+ / MariaDB / Apache / Nginx.
