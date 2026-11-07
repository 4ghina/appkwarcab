@extends('layouts.app')

@section('title', 'Masuk / Daftar dengan Email')

@section('content')
<div x-data="otpAuth()" class="space-y-4">
    <!-- Header -->
    <div class="text-center py-2">
        <div class="w-12 h-12 mx-auto rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shadow-md mb-2">
            <i data-lucide="mail-check" class="w-6 h-6"></i>
        </div>
        <h2 class="text-base font-black text-stone-900">Masuk / Daftar Anggota</h2>
        <p class="text-xs text-stone-500 max-w-xs mx-auto">
            Gunakan alamat email Anda untuk menerima kode OTP 6-digit. Terbuka untuk seluruh anggota Pramuka.
        </p>
    </div>

    <!-- Step 1: Input Email -->
    <div x-show="step === 1" class="space-y-3">
        <div>
            <label class="block text-xs font-semibold text-stone-700 mb-1">Alamat Email</label>
            <input 
                type="email" 
                x-model="email" 
                placeholder="nama@email.com"
                class="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
        </div>

        <button 
            type="button" 
            @click="sendOtp()"
            :disabled="loading || cooldown > 0"
            class="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
        >
            <span x-show="!loading" x-text="cooldown > 0 ? `Tunggu ${cooldown} detik` : 'Kirim Kode Verifikasi (OTP)'"></span>
            <span x-show="loading">Mengirimkan kode...</span>
        </button>
    </div>

    <!-- Step 2: Input OTP Code -->
    <div x-show="step === 2" x-cloak class="space-y-3">
        <div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-stone-700 flex items-center justify-between">
            <div>
                <span class="text-[10px] text-stone-500 block">Kode dikirim ke:</span>
                <strong x-text="email"></strong>
            </div>
            <button @click="step = 1" class="text-amber-700 font-bold hover:underline text-[11px]">Ubah</button>
        </div>

        <div>
            <label class="block text-xs font-semibold text-stone-700 mb-1">Masukkan 6-Digit Kode OTP</label>
            <input 
                type="text" 
                maxlength="6"
                x-model="code" 
                placeholder="123456"
                class="w-full px-3.5 py-2.5 text-center tracking-[0.5em] text-lg font-mono font-bold rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
        </div>

        <button 
            type="button" 
            @click="verifyOtp()"
            :disabled="loading || code.length !== 6"
            class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition"
        >
            <span x-show="!loading">Verifikasi & Lanjutkan Masuk</span>
            <span x-show="loading">Memverifikasi...</span>
        </button>

        <div class="text-center">
            <button 
                type="button" 
                @click="sendOtp()" 
                :disabled="cooldown > 0"
                class="text-xs text-amber-700 font-semibold hover:underline disabled:opacity-50"
            >
                Kirim Ulang Kode <span x-show="cooldown > 0" x-text="`(${cooldown}s)`"></span>
            </button>
        </div>
    </div>

    <!-- Error/Notice Display -->
    <div x-show="errorMessage" x-cloak class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
        <span x-text="errorMessage"></span>
    </div>
</div>

<script>
async function postJson(url, payload) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': '{{ csrf_token() }}'
        },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || data.error || 'Terjadi kesalahan');
    return data;
}

function otpAuth() {
    return {
        step: 1,
        email: '',
        code: '',
        loading: false,
        cooldown: 0,
        errorMessage: '',

        async sendOtp() {
            if (!this.email || !this.email.includes('@')) {
                this.errorMessage = 'Harap masukkan alamat email yang valid.';
                return;
            }
            this.loading = true;
            this.errorMessage = '';
            try {
                const data = await postJson("{{ route('otp.request') }}", { email: this.email });
                this.step = 2;
                this.startCooldown(60);
                if (data.dev_otp) console.log("[DEV OTP]:", data.dev_otp);
            } catch (err) {
                this.errorMessage = err.message;
            } finally {
                this.loading = false;
            }
        },

        async verifyOtp() {
            this.loading = true;
            this.errorMessage = '';
            try {
                const data = await postJson("{{ route('otp.verify') }}", { email: this.email, code: this.code });
                window.location.href = data.redirect || "{{ route('portal.dashboard') }}";
            } catch (err) {
                this.errorMessage = err.message;
            } finally {
                this.loading = false;
            }
        },

        startCooldown(seconds) {
            this.cooldown = seconds;
            const timer = setInterval(() => {
                this.cooldown--;
                if (this.cooldown <= 0) clearInterval(timer);
            }, 1000);
        }
    };
}
</script>
@endsection
