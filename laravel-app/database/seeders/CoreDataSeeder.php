<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AppSetting;
use App\Models\TextCatalog;
use App\Models\SkuItem;

class CoreDataSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSystemSettings();
        $this->seedTextCatalogs();
        $this->seedMasterCurriculum();
    }

    private function seedSystemSettings(): void
    {
        $settings = [
            ['key' => 'setup_completed', 'value' => '0', 'group' => 'onboarding', 'type' => 'boolean', 'description' => 'Status penyelesaian wizard inisialisasi awal'],
            ['key' => 'sample_data_loaded', 'value' => '0', 'group' => 'sample_data', 'type' => 'boolean', 'description' => 'Status pemuatan data contoh instalasi'],
            ['key' => 'sample_data_hidden', 'value' => '0', 'group' => 'sample_data', 'type' => 'boolean', 'description' => 'Sembunyikan data contoh dari publik, statistik, dan ekspor'],
            ['key' => 'kwarcab_name', 'value' => 'Kwartir Cabang Gerakan Pramuka', 'group' => 'identity', 'type' => 'string', 'description' => 'Nama resmi Kwartir Cabang'],
            ['key' => 'kwarcab_code', 'value' => '00.00', 'group' => 'identity', 'type' => 'string', 'description' => 'Kode resmi Kwartir Cabang'],
            ['key' => 'kwarda_name', 'value' => 'Kwartir Daerah Gerakan Pramuka', 'group' => 'identity', 'type' => 'string', 'description' => 'Kwarda penaung'],
            ['key' => 'kabupaten_kota', 'value' => 'Kabupaten / Kota', 'group' => 'identity', 'type' => 'string', 'description' => 'Kabupaten atau Kota yurisdiksi'],
            ['key' => 'app_timezone', 'value' => 'Asia/Jakarta', 'group' => 'localization', 'type' => 'string', 'description' => 'Zona waktu server dan pelaporan'],
            ['key' => 'theme_primary_color', 'value' => '#5D4037', 'group' => 'theme', 'type' => 'string', 'description' => 'Warna primer tema Pramuka'],
            ['key' => 'theme_accent_color', 'value' => '#2E7D32', 'group' => 'theme', 'type' => 'string', 'description' => 'Warna aksen tema'],
            ['key' => 'kta_card_template', 'value' => json_encode(['title' => 'Kartu Anggota Digital SIM-KWARCAB', 'show_qr' => true, 'show_gudep' => true, 'border_radius' => 16]), 'group' => 'card', 'type' => 'json', 'description' => 'Konfigurasi template KTA digital'],
        ];

        foreach ($settings as $item) {
            if (!AppSetting::where('key', $item['key'])->exists()) {
                AppSetting::updateOrCreate(['key' => $item['key']], $item);
            }
        }
    }

    private function seedTextCatalogs(): void
    {
        $catalogs = [
            ['key' => 'home_hero_title', 'category' => 'ui', 'content_id' => 'Sistem Informasi Manajemen Kwartir Cabang', 'content_en' => 'Branch Scout Management Information System'],
            ['key' => 'home_hero_subtitle', 'category' => 'ui', 'content_id' => 'Satu pintu data keanggotaan, capaian SKU/SKK, dan kegiatan Pramuka terpadu.', 'content_en' => 'Unified portal for scout membership, achievement, and events.'],
            ['key' => 'cta_login_label', 'category' => 'ui', 'content_id' => 'Masuk Portal', 'content_en' => 'Login to Portal'],
            ['key' => 'cta_register_label', 'category' => 'ui', 'content_id' => 'Daftar Anggota Baru', 'content_en' => 'Register Member'],
            ['key' => 'status_verified_label', 'category' => 'status', 'content_id' => 'Anggota Terverifikasi', 'content_en' => 'Verified Member'],
            ['key' => 'status_pending_label', 'category' => 'status', 'content_id' => 'Menunggu Verifikasi', 'content_en' => 'Pending Verification'],
            ['key' => 'privacy_notice', 'category' => 'legal', 'content_id' => 'Data pribadi anggota dilindungi sesuai UU Perlindungan Data Pribadi No. 27 Tahun 2022.', 'content_en' => 'Personal data is protected under Personal Data Protection regulations.'],
        ];

        foreach ($catalogs as $item) {
            if (!TextCatalog::where('key', $item['key'])->exists()) {
                TextCatalog::updateOrCreate(['key' => $item['key']], $item);
            }
        }
    }

    private function seedMasterCurriculum(): void
    {
        $levels = [
            ['golongan' => 'Siaga', 'tingkat' => 'Mula', 'nomor' => '1', 'deskripsi' => 'Dapat menyebutkan Rukun Iman dan Rukun Islam / Doa harian sesuai agamanya.'],
            ['golongan' => 'Siaga', 'tingkat' => 'Bantu', 'nomor' => '1', 'deskripsi' => 'Dapat menjalankan shalat secara tertib / ibadah menurut agama masing-masing.'],
            ['golongan' => 'Siaga', 'tingkat' => 'Tata', 'nomor' => '1', 'deskripsi' => 'Dapat mengajak teman berbuat kebaikan dan taat beribadah.'],
            ['golongan' => 'Penggalang', 'tingkat' => 'Ramu', 'nomor' => '1', 'deskripsi' => 'Selalu taat menjalankan ibadah agamanya secara pribadi dan berjamaah.'],
            ['golongan' => 'Penggalang', 'tingkat' => 'Rakit', 'nomor' => '1', 'deskripsi' => 'Dapat menjelaskan makna Trisatya dan Dasadarma Pramuka di depan regunya.'],
            ['golongan' => 'Penggalang', 'tingkat' => 'Terap', 'nomor' => '1', 'deskripsi' => 'Dapat memimpin pasukan dan mengamalkan nilai kepramukaan dalam masyarakat.'],
            ['golongan' => 'Penegak', 'tingkat' => 'Bantara', 'nomor' => '1', 'deskripsi' => 'Mampu menjelaskan rukun iman, rukun Islam, atau ajaran agamanya dengan baik.'],
            ['golongan' => 'Penegak', 'tingkat' => 'Laksana', 'nomor' => '1', 'deskripsi' => 'Dapat merencanakan dan memimpin proyek bakti masyarakat tingkat ranting.'],
            ['golongan' => 'Pandega', 'tingkat' => 'Pandega', 'nomor' => '1', 'deskripsi' => 'Dapat melakukan pengabdian masyarakat mandiri dan mengelola racana pramuka.'],
        ];

        foreach ($levels as $item) {
            if (!SkuItem::where('golongan', $item['golongan'])->where('tingkat', $item['tingkat'])->where('nomor', $item['nomor'])->where('version', '2026')->exists()) {
                SkuItem::updateOrCreate(
                    ['golongan' => $item['golongan'], 'tingkat' => $item['tingkat'], 'nomor' => $item['nomor'], 'version' => '2026'],
                    ['kategori' => 'Spiritual & Karakter', 'deskripsi' => $item['deskripsi'], 'is_active' => true, 'is_sample' => false]
                );
            }
        }
    }
}
