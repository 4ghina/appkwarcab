-- ==============================================================================
-- SIM-KWARCAB: SQL DUMP INSTALASI AWAL phpMyAdmin (MySQL 8.0+ / MariaDB 10.5+)
-- Termasuk catatan tabel migrations Laravel agar pembaruan berikutnya kompatibel
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+07:00";

-- --------------------------------------------------------
-- Tabel Migrasi Laravel
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2026_01_01_000000_create_users_table', 1),
('2026_01_01_000001_create_organization_units_table', 1),
('2026_01_01_000002_create_member_profiles_table', 1),
('2026_01_01_000003_create_user_assignments_table', 1),
('2026_01_01_000004_create_membership_applications_table', 1),
('2026_01_01_000005_create_otp_challenges_table', 1),
('2026_01_01_000006_create_events_and_registrations_table', 1),
('2026_01_01_000007_create_sku_skk_tables', 1),
('2026_01_01_000008_create_garuda_applications_table', 1),
('2026_01_01_000009_create_cms_and_audit_tables', 1),
('2026_01_01_000010_create_rfid_cards_and_attendance_tables', 1),
('2026_01_01_000011_create_adult_education_and_licenses_tables', 1),
('2026_01_01_000012_add_sample_data_flags_and_sku_versioning', 1);

-- --------------------------------------------------------
-- Tabel Pengguna & Sesi (000000)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `users_is_sample_idx` (`is_sample`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel Unit Organisasi: Kwarcab, Kwarran, Gudep, Saka (000001)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `organization_units` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) unsigned DEFAULT NULL,
  `type` enum('kwarcab','kwarran','gudep','saka','sako','pusdiklatcab','badan_usaha') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomor_gudep_pa` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomor_gudep_pi` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pangkalan` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pembina_nama` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `kontak_wa` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `akreditasi` enum('A','B','C','Belum') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Belum',
  `status` enum('Aktif','Kurang Aktif','Belum Her-Registrasi','Nonaktif') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Aktif',
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `terakhir_her_registrasi` date DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `org_parent_fk` (`parent_id`),
  KEY `org_type_status_idx` (`type`, `status`),
  KEY `org_is_sample_idx` (`is_sample`),
  CONSTRAINT `fk_org_parent` FOREIGN KEY (`parent_id`) REFERENCES `organization_units` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel Profil Anggota & NTA (000002)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `member_profiles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `organization_unit_id` bigint(20) unsigned DEFAULT NULL,
  `parent_user_id` bigint(20) unsigned DEFAULT NULL,
  `nta` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL UNIQUE,
  `provisional_nta` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `member_category` enum('peserta_didik','anggota_dewasa','orang_tua','umum') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'peserta_didik',
  `student_golongan` enum('Siaga','Penggalang','Penegak','Pandega') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `student_tingkat` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `golongan` enum('Siaga','Penggalang','Penegak','Pandega','Pembina','Pelatih','Umum') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Umum',
  `tingkatan` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Calon Anggota',
  `birth_date` date DEFAULT NULL,
  `calculated_age` smallint(5) unsigned DEFAULT NULL,
  `gender` enum('L','P') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `blood_type` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '-',
  `address` text COLLATE utf8mb4_unicode_ci,
  `avatar_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adult_education` json DEFAULT NULL,
  `adult_authority_docs` json DEFAULT NULL,
  `youth_archive` json DEFAULT NULL,
  `membership_status` enum('unregistered','pending_verification','verified','revision_needed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unregistered',
  `is_garuda` tinyint(1) NOT NULL DEFAULT 0,
  `garuda_year` year DEFAULT NULL,
  `garuda_sk_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `valid_until` date DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_member_user` (`user_id`),
  KEY `fk_member_org` (`organization_unit_id`),
  KEY `fk_member_parent_user` (`parent_user_id`),
  KEY `member_status_idx` (`membership_status`, `member_category`, `student_golongan`),
  KEY `member_is_sample_idx` (`is_sample`),
  CONSTRAINT `fk_member_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_member_org` FOREIGN KEY (`organization_unit_id`) REFERENCES `organization_units` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_member_parent_user` FOREIGN KEY (`parent_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel Penugasan & Multi-Peran (000003)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_assignments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `organization_unit_id` bigint(20) unsigned NOT NULL,
  `role_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` enum('Gudep','Kwarran','Kwarcab','Pusdiklatcab','Saka') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sk_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('active','inactive','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `approved_by` bigint(20) unsigned DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_assign_user` (`user_id`),
  KEY `fk_assign_org` (`organization_unit_id`),
  KEY `fk_assign_approver` (`approved_by`),
  KEY `assign_is_sample_idx` (`is_sample`),
  CONSTRAINT `fk_assign_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_assign_org` FOREIGN KEY (`organization_unit_id`) REFERENCES `organization_units` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_assign_approver` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel Permohonan Keanggotaan & Klaim NTA (000004)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `membership_applications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `organization_unit_id` bigint(20) unsigned NOT NULL,
  `target_golongan` enum('Siaga','Penggalang','Penegak','Pandega','Pembina','Pelatih','Umum') COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_tingkat` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `claim_nta` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','approved','rejected','revision_requested') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `reviewed_by` bigint(20) unsigned DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `review_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_app_user` (`user_id`),
  KEY `fk_app_org` (`organization_unit_id`),
  CONSTRAINT `fk_app_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_app_org` FOREIGN KEY (`organization_unit_id`) REFERENCES `organization_units` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel Tantangan OTP Email (000005)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `otp_challenges` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otp_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purpose` enum('login','register','verify_email','claim_nta','admin_invite') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'login',
  `attempts` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `max_attempts` tinyint(3) unsigned NOT NULL DEFAULT 5,
  `is_used` tinyint(1) NOT NULL DEFAULT 0,
  `expires_at` timestamp NOT NULL,
  `cooldown_until` timestamp NULL DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `otp_email_purpose_idx` (`email`, `purpose`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel Kegiatan & Pendaftaran Kuota Kontingen (000006)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `organization_unit_id` bigint(20) unsigned NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `tema` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tingkat` enum('Gudep','Ranting','Cabang','Daerah','Nasional') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Cabang',
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `lokasi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `penyelenggara` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_kuota` int(10) unsigned NOT NULL,
  `sisa_kuota` int(10) unsigned NOT NULL,
  `kuota_per_gudep` smallint(5) unsigned DEFAULT NULL,
  `biaya` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Gratis',
  `deadline_pendaftaran` datetime NOT NULL,
  `status` enum('Draf','Pendaftaran Dibuka','Pendaftaran Ditutup','Sedang Berjalan','Selesai','Dibatalkan') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Draf',
  `golongan_peserta` json DEFAULT NULL,
  `syarat_minimal_tingkat` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `syarat_usia_min` tinyint(3) unsigned DEFAULT NULL,
  `syarat_usia_max` tinyint(3) unsigned DEFAULT NULL,
  `approval_workflow` enum('langsung','rekomendasi_kwarran') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'langsung',
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_events_org` (`organization_unit_id`),
  KEY `events_is_sample_idx` (`is_sample`),
  CONSTRAINT `fk_events_org` FOREIGN KEY (`organization_unit_id`) REFERENCES `organization_units` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `event_registrations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` bigint(20) unsigned NOT NULL,
  `organization_unit_id` bigint(20) unsigned NOT NULL,
  `registered_by_user_id` bigint(20) unsigned NOT NULL,
  `jumlah_peserta_putra` smallint(5) unsigned NOT NULL DEFAULT 0,
  `jumlah_peserta_putri` smallint(5) unsigned NOT NULL DEFAULT 0,
  `jumlah_pembina_pendamping` smallint(5) unsigned NOT NULL DEFAULT 0,
  `total_kontingen` smallint(5) unsigned NOT NULL,
  `status` enum('draft','submitted','kwarran_approved','confirmed','rejected','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'submitted',
  `surat_tugas_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `catatan` text COLLATE utf8mb4_unicode_ci,
  `reviewed_by` bigint(20) unsigned DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `event_org_unique` (`event_id`, `organization_unit_id`),
  KEY `fk_reg_user` (`registered_by_user_id`),
  KEY `event_reg_is_sample_idx` (`is_sample`),
  CONSTRAINT `fk_reg_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reg_org` FOREIGN KEY (`organization_unit_id`) REFERENCES `organization_units` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reg_user` FOREIGN KEY (`registered_by_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel E-SKU dan E-SKK (000007)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sku_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `golongan` enum('Siaga','Penggalang','Penegak','Pandega') COLLATE utf8mb4_unicode_ci NOT NULL,
  `tingkat` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomor` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2026',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku_item_unique` (`golongan`, `tingkat`, `nomor`),
  KEY `sku_version_sample_idx` (`version`, `is_sample`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `member_sku_progress` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `sku_item_id` bigint(20) unsigned NOT NULL,
  `tester_user_id` bigint(20) unsigned DEFAULT NULL,
  `tester_external_name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('in_progress','passed','verified') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'passed',
  `tested_at` date NOT NULL,
  `evidence_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `sku_version` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2026',
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `member_sku_unique` (`user_id`, `sku_item_id`),
  KEY `fk_sku_progress_item` (`sku_item_id`),
  KEY `sku_progress_ver_sample_idx` (`sku_version`, `is_sample`),
  CONSTRAINT `fk_sku_prog_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_sku_prog_item` FOREIGN KEY (`sku_item_id`) REFERENCES `sku_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel E-Garuda Berjenjang 4 Tahapan (000008)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `garuda_applications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `golongan` enum('Siaga','Penggalang','Penegak','Pandega') COLLATE utf8mb4_unicode_ci NOT NULL,
  `current_step` tinyint(3) unsigned NOT NULL DEFAULT 1 COMMENT '1=Gudep, 2=Kwarran, 3=Kwarcab, 4=SK Terbit',
  `status` enum('draft','submitted','gudep_verified','kwarran_verified','kwarcab_tested','awarded','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'submitted',
  `portfolio_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sk_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `awarded_at` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_garuda_user` (`user_id`),
  KEY `garuda_is_sample_idx` (`is_sample`),
  CONSTRAINT `fk_garuda_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel Pengaturan Dinamis, Teks & Audit Log (000009)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `app_settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `group` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `value` text COLLATE utf8mb4_unicode_ci,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'string',
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_draft` tinyint(1) NOT NULL DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_settings_group_idx` (`group`),
  KEY `app_settings_draft_idx` (`is_draft`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `text_catalogs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ui',
  `content_id` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_en` text COLLATE utf8mb4_unicode_ci,
  `is_draft` tinyint(1) NOT NULL DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `text_catalogs_cat_idx` (`category`),
  KEY `text_catalogs_draft_idx` (`is_draft`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `media_assets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `original_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disk` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'public',
  `mime_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size_bytes` bigint(20) unsigned NOT NULL,
  `category` enum('logo','stamp','signature','banner','avatar','document','other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'other',
  `label` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploaded_by_user_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_media_uploader` (`uploaded_by_user_id`),
  CONSTRAINT `fk_media_uploader` FOREIGN KEY (`uploaded_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `action` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditable_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auditable_id` bigint(20) unsigned DEFAULT NULL,
  `old_values` json DEFAULT NULL,
  `new_values` json DEFAULT NULL,
  `summary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `audit_auditable_idx` (`auditable_type`, `auditable_id`),
  KEY `audit_user_idx` (`user_id`, `created_at`),
  CONSTRAINT `fk_audit_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel Kartu RFID/NFC & Absensi (000010)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `rfid_cards` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `card_uid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
  `printed_nta` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','blocked','lost','expired') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `saldo_balance` decimal(12,2) NOT NULL DEFAULT 0.00,
  `pin_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issued_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_sample` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_rfid_user` (`user_id`),
  KEY `rfid_is_sample_idx` (`is_sample`),
  CONSTRAINT `fk_rfid_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `event_attendances` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `session_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `check_in_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `attendance_method` enum('rfid_nfc','qr_code','manual_pembina') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'rfid_nfc',
  `recorded_by_user_id` bigint(20) unsigned DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_att_event` (`event_id`),
  KEY `fk_att_user` (`user_id`),
  CONSTRAINT `fk_att_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_att_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Tabel Pendidikan Dewasa & Lisensi Pelatih (000011)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `adult_education_courses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nama_kursus` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tingkat_kursus` enum('KMD','KML','KPD','KPL','KPPD','Lainnya') COLLATE utf8mb4_unicode_ci NOT NULL,
  `golongan_spesialisasi` enum('Siaga','Penggalang','Penegak','Pandega','Umum') COLLATE utf8mb4_unicode_ci NOT NULL,
  `penyelenggara` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tahun` year NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Data Dasar Awal (Core Reference Data)
-- --------------------------------------------------------
INSERT INTO `app_settings` (`group`, `key`, `value`, `type`, `description`, `created_at`, `updated_at`) VALUES
('onboarding', 'setup_completed', '0', 'boolean', 'Status wizard inisialisasi awal Kwarcab', NOW(), NOW()),
('identity', 'kwarcab_name', 'Kwartir Cabang Gerakan Pramuka', 'string', 'Nama resmi Kwartir Cabang', NOW(), NOW()),
('identity', 'kwarcab_code', '00.00', 'string', 'Kode resmi Kwartir Cabang', NOW(), NOW()),
('identity', 'kwarda_name', 'Kwartir Daerah Gerakan Pramuka', 'string', 'Kwarda penaung', NOW(), NOW()),
('identity', 'kabupaten_kota', 'Kabupaten / Kota', 'string', 'Kabupaten atau Kota yurisdiksi', NOW(), NOW()),
('localization', 'app_timezone', 'Asia/Jakarta', 'string', 'Zona waktu server dan pelaporan', NOW(), NOW()),
('theme', 'theme_primary_color', '#5D4037', 'string', 'Warna primer tema Pramuka', NOW(), NOW()),
('theme', 'theme_accent_color', '#2E7D32', 'string', 'Warna aksen tema', NOW(), NOW()),
('card', 'kta_card_template', '{\"title\":\"Kartu Anggota Digital SIM-KWARCAB\",\"show_qr\":true,\"show_gudep\":true}', 'json', 'Konfigurasi template KTA digital', NOW(), NOW());

INSERT INTO `text_catalogs` (`key`, `category`, `content_id`, `content_en`, `created_at`, `updated_at`) VALUES
('home_hero_title', 'ui', 'Sistem Informasi Manajemen Kwartir Cabang', 'Branch Scout Management Information System', NOW(), NOW()),
('home_hero_subtitle', 'ui', 'Satu pintu data keanggotaan, capaian SKU/SKK, dan kegiatan Pramuka terpadu.', 'Unified portal for scout membership, achievement, and events.', NOW(), NOW()),
('privacy_notice', 'legal', 'Data pribadi anggota dilindungi sesuai UU Perlindungan Data Pribadi No. 27 Tahun 2022.', 'Personal data is protected under Personal Data Protection regulations.', NOW(), NOW());

SET FOREIGN_KEY_CHECKS = 1;
