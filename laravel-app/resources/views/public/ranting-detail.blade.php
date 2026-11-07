@extends('layouts.app')

@section('title', 'Kwartir Ranting ' . $kwarran->name . ' - SIM-KWARCAB')

@section('content')
<div class="max-w-5xl mx-auto px-4 py-8 space-y-6">
    {{-- Breadcrumb Navigation --}}
    <div class="flex items-center gap-2 text-xs font-semibold text-stone-500">
        <a href="{{ route('public.home') }}" class="hover:text-[#5D4037]">Beranda</a>
        <span>/</span>
        <span class="text-stone-800">Kwartir Ranting {{ $kwarran->name }}</span>
    </div>

    {{-- Kwarran Banner --}}
    <div class="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#5D4037] via-[#4E342E] to-[#271612] text-white shadow-xl relative overflow-hidden space-y-4">
        <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-stone-950 inline-block">
            Kwartir Ranting Wilayah
        </span>
        <h1 class="text-2xl md:text-3xl font-black">
            Kwartir Ranting {{ $kwarran->name }}
        </h1>
        <p class="text-xs md:text-sm text-amber-100 max-w-2xl leading-relaxed">
            Koordinasi dan tata kelola kelembagaan Gugus Depan pangkalan sekolah serta satuan karya di wilayah {{ $kwarran->name }}.
        </p>

        <div class="pt-4 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
                <span class="text-white/60 block text-[10px]">Pangkalan Terdaftar</span>
                <strong class="text-base text-amber-300">{{ $gudepList->count() }} Gudep</strong>
            </div>
            <div>
                <span class="text-white/60 block text-[10px]">Induk Wilayah</span>
                <strong class="text-base text-white">Kwartir Cabang</strong>
            </div>
            <div>
                <span class="text-white/60 block text-[10px]">Status Operasional</span>
                <strong class="text-base text-emerald-400">Aktif</strong>
            </div>
            <div>
                <span class="text-white/60 block text-[10px]">Her-Registrasi 2026</span>
                <strong class="text-base text-white">Terdata</strong>
            </div>
        </div>
    </div>

    {{-- Gudep Directory Table under Kwarran --}}
    <div class="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-stone-100">
            <h2 class="text-sm font-black text-stone-900 uppercase tracking-wider">
                Daftar Gugus Depan Terdaftar di Wilayah {{ $kwarran->name }}
            </h2>
            <span class="text-xs font-bold text-stone-500">{{ $gudepList->count() }} Pangkalan</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            @forelse($gudepList as $gudep)
                <div class="p-4 rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-sm transition-all space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                            Akreditasi {{ $gudep->akreditasi ?? 'A' }}
                        </span>
                        <span class="text-xs font-mono text-stone-500">
                            {{ $gudep->nomor_gudep_pa }} / {{ $gudep->nomor_gudep_pi }}
                        </span>
                    </div>
                    <h3 class="text-sm font-black text-stone-900">{{ $gudep->pangkalan }}</h3>
                    <p class="text-xs text-stone-600">Alamat: {{ $gudep->alamat }}</p>
                    <div class="pt-2 flex items-center justify-between text-xs">
                        <a href="{{ route('public.gudep', $gudep->slug) }}" class="text-[#5D4037] font-bold hover:underline">
                            Lihat Profil Gudep →
                        </a>
                    </div>
                </div>
            @empty
                <p class="text-xs text-stone-500 col-span-2">Belum ada data Gudep yang terdaftar pada Kwartir Ranting ini.</p>
            @endforelse
        </div>
    </div>
</div>
@endsection
