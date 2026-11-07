<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PotensiMapController extends Controller
{
    /**
     * Tampilkan halaman Peta Potensi Pramuka Kwarcab Tematik Beranotasi
     */
    public function index(Request $request)
    {
        // Pengaturan Peta Potensi dari database
        $settings = DB::table('potensi_map_settings')->where('id', 1)->first() ?? (object) [
            'title' => 'Peta Potensi Pramuka Kwartir Cabang',
            'description' => 'Visualisasi sebaran anggota, kecakapan, dan pangkalan sekolah',
            'boundary_source' => 'Badan Informasi Geospasial (BIG) & BPS',
            'data_source' => 'Pelaporan Terverifikasi Kwartir Cabang',
            'color_scheme' => 'amber',
            'is_published' => true,
            'default_category' => 'peserta_didik',
            'default_metric' => 'total_peserta',
        ];

        // 11 Kwarran resmi se-Kwarcab Kota Depok
        $districts = DB::table('organization_units')
            ->where('type', 'kwarran')
            ->orderBy('code', 'asc')
            ->get();

        return view('public.peta', [
            'settings' => $settings,
            'districts' => $districts,
            'lastUpdated' => now()->translatedFormat('d F Y H:i'),
        ]);
    }
}
