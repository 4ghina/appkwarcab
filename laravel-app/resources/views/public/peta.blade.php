@extends('layouts.app')

@section('title', 'Peta Potensi Pramuka - Kwartir Cabang')

@section('content')
<div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
    <!-- Header Peta Potensi -->
    <div class="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
                <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
                        Peta Tematik Beranotasi
                    </span>
                    <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        11 Kwarran Aktif
                    </span>
                </div>
                <h1 class="text-2xl font-black text-stone-900 mt-2">{{ $settings->title }}</h1>
                <p class="text-xs text-stone-600">{{ $settings->description }}</p>
            </div>
            <a href="{{ route('public.home') }}" class="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 self-start md:self-auto">
                &larr; Kembali ke Beranda
            </a>
        </div>

        <!-- Filter Kategori & Metrik -->
        <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="font-bold text-stone-700">Kategori:</span>
            <button class="px-3 py-1.5 rounded-xl bg-[#5D4037] text-white font-bold">Peserta Didik (TKU/Garuda/SKK)</button>
            <button class="px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700 font-bold hover:bg-stone-200">Pembina & Pelatih</button>
            <button class="px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700 font-bold hover:bg-stone-200">Gugus Depan & Pangkalan</button>
        </div>
    </div>

    <!-- Peta Tematik Beranotasi (3 Kolom Desktop) -->
    <div class="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div class="flex flex-col lg:flex-row gap-6 items-stretch">
            <!-- Sisi Kiri (5 Kecamatan Barat & Selatan) -->
            <div class="w-64 hidden lg:flex flex-col justify-between py-2 space-y-3 shrink-0">
                <div class="text-xs font-black uppercase tracking-wider text-stone-600">Wilayah Barat & Selatan</div>
                @foreach($districts->slice(0, 5) as $d)
                <div class="p-3 rounded-2xl border border-stone-200 bg-stone-50 hover:border-amber-400 cursor-pointer">
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-black text-stone-900">{{ $d->name }}</span>
                        <span class="text-xs font-bold text-amber-900">Aktif</span>
                    </div>
                    <span class="text-[10px] text-stone-600">Kwarran {{ $d->code ?? '09.22' }}</span>
                </div>
                @endforeach
            </div>

            <!-- Area Tengah: SVG Peta Tematik & Garis Penunjuk -->
            <div class="flex-1 flex flex-col justify-center min-w-0">
                <div class="relative w-full aspect-[940/680] rounded-2xl bg-amber-50/30 border border-stone-200 flex items-center justify-center p-4">
                    <svg viewBox="0 0 940 680" class="w-full h-full">
                        <!-- SVG Paths Interlocking 11 Kecamatan Kota Depok -->
                        <g fill="#F59E0B" fill-opacity="0.85" stroke="#78350F" stroke-width="2">
                            <path d="M 290,65 L 360,55 L 390,95 L 380,145 L 340,160 L 285,130 Z" id="cinere" />
                            <path d="M 340,160 L 380,145 L 420,185 L 405,250 L 345,245 L 315,195 Z" id="limo" />
                            <path d="M 255,270 L 325,255 L 350,305 L 335,385 L 265,395 L 235,325 Z" id="bojongsari" />
                            <path d="M 325,255 L 390,260 L 415,350 L 390,440 L 330,445 L 335,385 L 350,305 Z" id="sawangan" />
                            <path d="M 390,440 L 440,430 L 485,475 L 470,575 L 400,580 L 370,515 Z" id="cipayung" />
                            <path d="M 390,95 L 475,85 L 505,145 L 485,215 L 420,185 L 380,145 Z" id="beji" />
                            <path d="M 475,85 L 595,75 L 635,145 L 610,235 L 525,225 L 505,145 Z" id="cimanggis" />
                            <path d="M 420,185 L 485,215 L 505,290 L 470,360 L 405,345 L 390,260 Z" id="pancoran-mas" />
                            <path d="M 505,225 L 610,235 L 615,315 L 555,365 L 505,335 L 505,290 Z" id="sukmajaya" />
                            <path d="M 470,360 L 555,365 L 595,415 L 575,495 L 485,475 L 440,430 Z" id="cilodong" />
                            <path d="M 610,235 L 705,255 L 730,375 L 675,535 L 575,495 L 595,415 L 615,315 Z" id="tapos" />
                        </g>
                    </svg>
                </div>
            </div>

            <!-- Sisi Kanan (6 Kecamatan Pusat & Timur) -->
            <div class="w-64 hidden lg:flex flex-col justify-between py-2 space-y-3 shrink-0">
                <div class="text-xs font-black uppercase tracking-wider text-stone-600 text-right">Wilayah Pusat & Timur</div>
                @foreach($districts->slice(5, 6) as $d)
                <div class="p-3 rounded-2xl border border-stone-200 bg-stone-50 hover:border-amber-400 cursor-pointer text-right">
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-bold text-amber-900">Aktif</span>
                        <span class="text-xs font-black text-stone-900">{{ $d->name }}</span>
                    </div>
                    <span class="text-[10px] text-stone-600">Kwarran {{ $d->code ?? '09.22' }}</span>
                </div>
                @endforeach
            </div>
        </div>
    </div>

    <!-- Atribusi & Privasi -->
    <footer class="bg-stone-50 rounded-2xl border border-stone-200 p-4 text-xs text-stone-600 flex flex-col sm:flex-row justify-between gap-2">
        <div><strong>Sumber Data:</strong> {{ $settings->data_source }} &bull; <strong>Batas Wilayah:</strong> {{ $settings->boundary_source }}</div>
        <div class="text-emerald-800 font-bold">&check; Bebas NTA, NIK, dan Data Pribadi Peserta</div>
    </footer>
</div>
@endsection
