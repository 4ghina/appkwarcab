<x-filament::page>
    <div class="space-y-6">
        <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Status Data Contoh Instalasi SIM-KWARCAB</h2>
            <p class="text-sm text-gray-500 mt-1">
                Data contoh digunakan untuk demonstrasi awal dan pengujian fitur. Anda dapat melihat, menyembunyikan, atau menghapus data contoh secara aman tanpa mempengaruhi data riil atau konfigurasi dasar Kwarcab.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div class="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <span class="text-xs font-semibold uppercase text-amber-800">Unit Organisasi Contoh</span>
                    <div class="text-2xl font-black text-amber-900 mt-1">{{ $sampleUnitsCount }}</div>
                    <span class="text-xs text-amber-700">Kwarran & Gudep demo</span>
                </div>
                <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <span class="text-xs font-semibold uppercase text-blue-800">Pengguna & Anggota Contoh</span>
                    <div class="text-2xl font-black text-blue-900 mt-1">{{ $sampleUsersCount }}</div>
                    <span class="text-xs text-blue-700">Akun simulasi</span>
                </div>
                <div class="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <span class="text-xs font-semibold uppercase text-emerald-800">Kegiatan Contoh</span>
                    <div class="text-2xl font-black text-emerald-900 mt-1">{{ $sampleEventsCount }}</div>
                    <span class="text-xs text-emerald-700">Agenda demo</span>
                </div>
            </div>

            <div class="mt-6 flex flex-wrap items-center gap-3">
                <button wire:click="loadSampleData" type="button" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition">
                    Muat / Muat Ulang Data Contoh
                </button>
                <button wire:click="toggleVisibility" type="button" class="px-4 py-2 {{ $isSampleHidden ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-600 hover:bg-gray-700' }} text-white rounded-lg text-sm font-semibold transition">
                    {{ $isSampleHidden ? 'Tampilkan ke Publik & Statistik' : 'Sembunyikan dari Publik & Statistik' }}
                </button>
                <button wire:click="purgeSampleData" wire:confirm="Apakah Anda yakin ingin menghapus seluruh data contoh? Tindakan ini aman dan tidak akan menghapus data riil atau akun admin." type="button" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-semibold transition">
                    Hapus Massal Data Contoh
                </button>
            </div>
        </div>
    </div>
</x-filament::page>
