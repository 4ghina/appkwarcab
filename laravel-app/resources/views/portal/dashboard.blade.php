@extends('layouts.app')

@section('title', 'Portal Anggota')

@section('content')
<div class="space-y-4">
    <!-- User Welcome & Multi-Assignment Context -->
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-sm font-bold text-stone-900 leading-tight">Salam Pramuka, {{ $user->name }}</h2>
            <p class="text-[11px] text-stone-500">{{ $activeAssignment->title ?? 'Anggota Terdaftar' }}</p>
        </div>
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit" class="px-2.5 py-1 text-[11px] font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition">
                Keluar
            </button>
        </form>
    </div>

    <!-- Three-Tier Status Badge (Pemisahan 3 Status) -->
    <div class="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
        <span class="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Status Akun Terpadu</span>
        <div class="grid grid-cols-3 gap-1.5 text-center">
            <!-- 1. Email Status -->
            <div class="p-2 rounded-xl bg-white border border-stone-200">
                <div class="text-[9px] text-stone-500 font-medium">1. Email</div>
                <div class="text-[10px] font-bold text-emerald-600 flex items-center justify-center gap-0.5 mt-0.5">
                    <i data-lucide="check-circle" class="w-3 h-3"></i>
                    Terverifikasi
                </div>
            </div>

            <!-- 2. Membership Status -->
            <div class="p-2 rounded-xl bg-white border border-stone-200">
                <div class="text-[9px] text-stone-500 font-medium">2. Gudep</div>
                <div class="text-[10px] font-bold {{ $profile->membership_status === 'verified' ? 'text-emerald-600' : ($profile->membership_status === 'pending_verification' ? 'text-amber-600' : 'text-stone-500') }} mt-0.5">
                    {{ match($profile->membership_status) {
                        'verified' => 'Anggota Resmi',
                        'pending_verification' => 'Verifikasi',
                        'revision_needed' => 'Revisi',
                        default => 'Belum Gudep'
                    } }}
                </div>
            </div>

            <!-- 3. Roles/Assignments Status -->
            <div class="p-2 rounded-xl bg-white border border-stone-200">
                <div class="text-[9px] text-stone-500 font-medium">3. Penugasan</div>
                <div class="text-[10px] font-bold text-amber-700 mt-0.5 truncate">
                    {{ $user->assignments->count() > 0 ? $user->assignments->count() . ' Tugas' : 'Dasar' }}
                </div>
            </div>
        </div>
    </div>

    <!-- Digital KTA Card (Dynamic Golongan Color) -->
    <div class="relative overflow-hidden rounded-2xl p-4 text-white shadow-lg" style="background: linear-gradient(135deg, {{ $profile->golongan_color }}, #2B1810);">
        <div class="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
            <div>
                <span class="text-[9px] uppercase tracking-wider opacity-80 block">KTA Pramuka Digital</span>
                <span class="text-xs font-black">{{ $profile->organizationUnit->parent->name ?? 'Kwartir Cabang' }}</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                {{ $profile->golongan }}
            </span>
        </div>

        <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm">
                {{ substr($user->name, 0, 1) }}
            </div>
            <div>
                <h3 class="text-sm font-black">{{ $user->name }}</h3>
                <div class="text-[11px] font-mono tracking-wider text-amber-200">
                    {{ $profile->nta ?? ($profile->provisional_nta ?? 'NTA Belum Terbit') }}
                </div>
                <div class="text-[10px] text-stone-200">{{ $profile->tingkatan }}</div>
            </div>
        </div>

        <div class="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-stone-200">
            <span>{{ $profile->organizationUnit->name ?? 'Belum terafiliasi Gudep' }}</span>
            <span>Berlaku: {{ $profile->valid_until ? $profile->valid_until->format('d M Y') : '31 Des 2028' }}</span>
        </div>
    </div>

    <!-- Affiliation CTA if not verified -->
    @if($profile->membership_status !== 'verified')
        <div class="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div class="space-y-0.5">
                <h4 class="text-xs font-bold text-stone-900">Ajukan Pengaitan ke Gugus Depan</h4>
                <p class="text-[10px] text-stone-500">Pilih pangkalan sekolah/madrasah untuk verifikasi NTA resmi.</p>
            </div>
            <button class="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 shrink-0">
                Ajukan
            </button>
        </div>
    @endif

    <!-- SKU Progress Overview -->
    <div class="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
        <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <i data-lucide="check-square" class="w-4 h-4 text-emerald-600"></i>
                Progres Syarat Kecakapan Umum (SKU)
            </h4>
            <span class="text-xs font-bold text-emerald-700">{{ $passedSku }} / {{ $totalSku ?: 22 }} Butir</span>
        </div>
        <div class="w-full bg-stone-100 rounded-full h-2">
            <div class="bg-emerald-600 h-2 rounded-full transition-all" style="width: {{ $totalSku > 0 ? ($passedSku / $totalSku) * 100 : 40 }}%"></div>
        </div>
        <div class="text-[10px] text-stone-500 flex justify-between">
            <span>Tingkat: {{ $profile->tingkatan }}</span>
            <span>Uji SKU dapat diverifikasi oleh Pembina Satuan</span>
        </div>
    </div>
</div>
@endsection
