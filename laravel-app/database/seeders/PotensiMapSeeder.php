<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PotensiMapSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('potensi_map_settings')->updateOrInsert(
            ['id' => 1],
            [
                'title' => 'Peta Potensi Pramuka Kwartir Cabang Kota Depok',
                'description' => 'Visualisasi sebaran peserta didik, capaian SKU/SKK, pembina mahir, dan pangkalan sekolah',
                'data_source' => 'Pelaporan Terverifikasi Semester 1 2026 Kwarcab Kota Depok',
                'boundary_source' => 'Badan Informasi Geospasial (BIG) & BPS Kota Depok',
                'color_scheme' => 'amber',
                'is_published' => true,
                'default_category' => 'peserta_didik',
                'default_metric' => 'total_peserta',
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );
    }
}
