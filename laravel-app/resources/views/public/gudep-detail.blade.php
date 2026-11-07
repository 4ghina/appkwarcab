@extends('layouts.app')

@section('title', 'Gugus Depan ' . $gudep->pangkalan . ' - SIM-KWARCAB')

@section('content')
<div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
    {{-- Breadcrumb Navigation --}}
    <div class="flex items-center gap-2 text-xs font-semibold text-stone-500">
        <a href="{{ route('public.home') }}" class="hover:text-[#5D4037]">Beranda</a>
        <span>/</span>
        <span class="text-stone-800">{{ $gudep->pangkalan }}</span>
    </div>

    {{-- Gudep Banner Card --}}
    <div class="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#2E7D32] via-[#1B5E20] to-[#0D3813] text-white shadow-xl relative overflow-hidden space-y-3">
        <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-stone-950">
                Pangkalan Gugus Depan Resmi
            </span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20">
                Akreditasi {{ $gudep->akreditasi ?? 'A' }}
            </span>
        </div>

        <h1 class="text-2xl md:text-3xl font-black">
            {{ $gudep->pangkalan }}
        </h1>
        <p class="text-xs md:text-sm text-emerald-100 font-mono">
            Nomor Gudep: Putra {{ $gudep->nomor_gudep_pa }} • Putri {{ $gudep->nomor_gudep_pi }}
        </p>

        <div class="pt-3 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
                <span class="text-white/60 block text-[10px]">Induk Ranting</span>
                <strong class="text-base text-amber-300">Kwarran Terkait</strong>
            </div>
            <div>
                <span class="text-white/60 block text-[10px]">Status Gudep</span>
                <strong class="text-base text-emerald-300">{{ $gudep->status ?? 'Aktif' }}</strong>
            </div>
            <div>
                <span class="text-white/60 block text-[10px]">Her-Registrasi</span>
                <strong class="text-base text-white">2026 Terverifikasi</strong>
            </div>
            <div>
                <span class="text-white/60 block text-[10px]">Basis Data</span>
                <strong class="text-base text-white">Tervalidasi Kwarcab</strong>
            </div>
        </div>
    </div>

    {{-- Gudep Profile Info --}}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
            <h2 class="text-sm font-black text-stone-900 uppercase tracking-wider">
                Profil & Kepengurusan Gugus Depan
            </h2>

            <div class="space-y-3 text-xs text-stone-700">
                <div>
                    <span class="text-stone-400 block text-[11px]">Nama Pangkalan</span>
                    <strong class="text-sm text-stone-900">{{ $gudep->name }}</strong>
                </div>
                <div>
                    <span class="text-stone-400 block text-[11px]">Alamat Lengkap</span>
                    <p class="text-stone-800 leading-relaxed">{{ $gudep->alamat }}</p>
                </div>
                <div>
                    <span class="text-stone-400 block text-[11px]">Kontak WhatsApp Resmi</span>
                    <strong class="text-stone-800">{{ $gudep->kontak_wa ?? '-' }}</strong>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between space-y-4">
            <div>
                <h3 class="text-xs font-black text-stone-900 uppercase tracking-wider mb-2">
                    Gabung ke Pangkalan Ini
                </h3>
                <p class="text-xs text-stone-600 leading-relaxed">
                    Peserta didik dan Pembina pangkalan ini dapat melakukan pendaftaran akun dan pengaitan keanggotaan secara daring.
                </p>
            </div>

            <a href="{{ route('login') }}" class="w-full py-2.5 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold text-center block transition-all shadow-sm">
                Masuk / Ajukan Pengaitan
            </a>
        </div>
    </div>
</div>
@endsection
