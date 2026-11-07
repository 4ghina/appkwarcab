<x-filament-panels::page>
    <div class="mb-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm">
        <h3 class="font-bold text-base mb-1">Inisialisasi Identitas Kwartir Cabang</h3>
        <p>Lengkapi data nama cabang, Kwarda penaung, kabupaten/kota, zona waktu, dan warna tema resmi untuk menyesuaikan tampilan publik dan kartu digital anggota.</p>
    </div>

    <form wire:submit="save" class="space-y-6">
        {{ $this->form }}

        <div class="flex justify-end gap-3 pt-4">
            <x-filament::button type="submit" size="lg" color="primary">
                Simpan & Aktifkan Identitas Cabang
            </x-filament::button>
        </div>
    </form>
</x-filament-panels::page>
