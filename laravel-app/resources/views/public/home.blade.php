@extends('layouts.app')

@section('title', 'Beranda')

@section('content')
<div class="space-y-5">
    <!-- Hero Banner Kwarcab -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5D4037] to-[#3E2723] p-5 text-white shadow-md">
        <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none"></div>
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-medium tracking-wide mb-3">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Kwarcab No. {{ $identity['kwarcabNomor'] }}
        </div>
        <h2 class="text-xl font-black leading-tight mb-1">{{ $identity['kwarcabName'] }}</h2>
        <p class="text-xs text-stone-200 italic mb-4">"{{ $identity['motto'] }}"</p>

        <div class="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div class="bg-white/5 rounded-xl p-2">
                <div class="text-lg font-black text-amber-300">{{ $stats['total_kwarran'] }}</div>
                <div class="text-[10px] text-stone-300 font-medium">Kwarran</div>
            </div>
            <div class="bg-white/5 rounded-xl p-2">
                <div class="text-lg font-black text-emerald-300">{{ $stats['total_gudep'] }}</div>
                <div class="text-[10px] text-stone-300 font-medium">Gudep</div>
            </div>
            <div class="bg-white/5 rounded-xl p-2">
                <div class="text-lg font-black text-amber-300">{{ $stats['total_kegiatan'] }}</div>
                <div class="text-[10px] text-stone-300 font-medium">Agenda</div>
            </div>
        </div>
    </div>

    <!-- Quick Services Grid (Anti-SaaS Bento Style) -->
    <div class="grid grid-cols-2 gap-3">
        <a href="{{ route('public.verify') }}" class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/70 hover:bg-amber-100/60 transition flex flex-col justify-between">
            <div class="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-2">
                <i data-lucide="shield-check" class="w-4 h-4"></i>
            </div>
            <div>
                <h3 class="text-xs font-bold text-stone-900">Verifikasi Dokumen</h3>
                <p class="text-[10px] text-stone-500">Cek keabsahan KTA digital & piagam</p>
            </div>
        </a>

        <a href="{{ route('login') }}" class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/70 hover:bg-emerald-100/60 transition flex flex-col justify-between">
            <div class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2">
                <i data-lucide="id-card" class="w-4 h-4"></i>
            </div>
            <div>
                <h3 class="text-xs font-bold text-stone-900">Portal & KTA</h3>
                <p class="text-[10px] text-stone-500">Masuk via OTP email anggota</p>
            </div>
        </a>
    </div>

    <!-- Agenda & Kegiatan Cabang Terkini -->
    <div id="kegiatan" class="space-y-3">
        <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <i data-lucide="flame" class="w-4 h-4 text-amber-600"></i>
                Kegiatan Cabang Terbuka
            </h3>
        </div>

        <div class="space-y-2.5">
            @forelse($activeEvents as $event)
                <div class="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-amber-400 transition space-y-2">
                    <div class="flex items-start justify-between gap-2">
                        <div>
                            <span class="inline-block px-2 py-0.5 rounded-md bg-stone-100 text-[10px] font-semibold text-stone-600 mb-1">
                                Tingkat {{ $event->tingkat }}
                            </span>
                            <h4 class="text-xs font-bold text-stone-900">{{ $event->nama }}</h4>
                        </div>
                        <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                            Sisa {{ $event->sisa_kuota }} Kuota
                        </span>
                    </div>

                    <div class="flex items-center gap-3 text-[11px] text-stone-500">
                        <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5 text-stone-400"></i> {{ $event->tanggal_mulai->format('d M Y') }}</span>
                        <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-stone-400"></i> {{ $event->lokasi }}</span>
                    </div>
                </div>
            @empty
                <p class="text-xs text-stone-500 text-center py-4">Belum ada agenda kegiatan yang dibuka saat ini.</p>
            @endforelse
        </div>
    </div>

    <!-- Direktori Kwarran / Ranting -->
    <div class="space-y-3">
        <h3 class="text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <i data-lucide="compass" class="w-4 h-4 text-emerald-700"></i>
            Direktori Kwartir Ranting
        </h3>
        <div class="grid grid-cols-1 gap-2">
            @foreach($kwarranList as $kwarran)
                <a href="{{ route('public.ranting', $kwarran->slug) }}" class="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 flex items-center justify-between transition">
                    <div>
                        <h4 class="text-xs font-bold text-stone-900">{{ $kwarran->name }}</h4>
                        <p class="text-[10px] text-stone-500">{{ $kwarran->total_gudep }} Gugus Depan Terdata</p>
                    </div>
                    <i data-lucide="chevron-right" class="w-4 h-4 text-stone-400"></i>
                </a>
            @endforeach
        </div>
    </div>
</div>
@endsection
