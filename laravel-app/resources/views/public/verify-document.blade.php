@extends('layouts.app')

@section('title', 'Cek & Verifikasi Dokumen Pramuka')

@section('content')
<div class="space-y-4">
    <!-- Header Notice -->
    <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200">
        <div class="flex items-center gap-2 mb-1">
            <i data-lucide="shield-check" class="w-5 h-5 text-amber-700"></i>
            <h2 class="text-sm font-bold text-stone-900">Verifikasi Keabsahan Dokumen & KTA</h2>
        </div>
        <p class="text-xs text-stone-600">
            Layanan resmi verifikasi Kartu Tanda Anggota (KTA) Digital dan Surat Rekomendasi Kwartir Cabang. Masukkan Nomor Tanda Anggota (NTA) untuk memeriksa status keaktifan.
        </p>
    </div>

    <!-- Search Form -->
    <form action="{{ route('public.verify') }}" method="GET" class="space-y-2">
        <label for="code" class="block text-xs font-semibold text-stone-700">Nomor Tanda Anggota (NTA) / Kode Registrasi</label>
        <div class="relative">
            <input 
                type="text" 
                name="code" 
                id="code" 
                value="{{ $code ?? '' }}" 
                placeholder="Contoh: 11.23.01.00421 atau PRA-2026-9042"
                class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
            >
        </div>
        <button type="submit" class="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5">
            <i data-lucide="search" class="w-3.5 h-3.5"></i>
            Periksa Keabsahan
        </button>
    </form>

    <!-- Verification Result Card -->
    @if($searched)
        @if($result && $result['valid'])
            <div class="p-4 rounded-2xl bg-white border border-emerald-300 shadow-md space-y-3">
                <div class="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i>
                        {{ $result['status'] }}
                    </span>
                    <span class="text-[10px] text-stone-400">Terverifikasi: {{ $result['verified_at'] }}</span>
                </div>

                <div class="space-y-2 text-xs">
                    <div>
                        <span class="text-[10px] text-stone-500 block">Nama Anggota</span>
                        <strong class="text-stone-900 text-sm">{{ $result['name'] }}</strong>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <span class="text-[10px] text-stone-500 block">NTA Resmi</span>
                            <span class="font-mono font-bold text-stone-800">{{ $result['nta'] }}</span>
                        </div>
                        <div>
                            <span class="text-[10px] text-stone-500 block">Golongan / Tingkat</span>
                            <span class="font-semibold text-stone-800">{{ $result['golongan'] }} - {{ $result['tingkatan'] }}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <span class="text-[10px] text-stone-500 block">Pangkalan / Gudep</span>
                            <span class="text-stone-800">{{ $result['pangkalan'] }}</span>
                        </div>
                        <div>
                            <span class="text-[10px] text-stone-500 block">Kwartir Ranting</span>
                            <span class="text-stone-800">{{ $result['kwarran'] }}</span>
                        </div>
                    </div>

                    <div class="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                        <span class="text-stone-500">Masa Berlaku KTA:</span>
                        <span class="font-semibold text-emerald-700">{{ $result['valid_until'] }}</span>
                    </div>
                </div>

                <div class="p-2.5 rounded-xl bg-stone-50 text-[10px] text-stone-500 flex items-start gap-1.5">
                    <i data-lucide="info" class="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5"></i>
                    <span>Informasi pribadi seperti NIK, nomor telepon, dan alamat tempat tinggal disamarkan demi privasi dan keamanan anggota.</span>
                </div>
            </div>
        @else
            <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1">
                <div class="flex items-center gap-1.5 font-bold">
                    <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                    Data Tidak Ditemukan
                </div>
                <p>{{ $result['message'] ?? 'Pastikan nomor yang Anda masukkan sudah sesuai.' }}</p>
            </div>
        @endif
    @endif
</div>
@endsection
