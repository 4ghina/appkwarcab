<x-filament-panels::page>
    <div class="mb-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-sm">
        <h3 class="font-bold text-base mb-1">Alat Impor Wilayah Bertingkat</h3>
        <p>Gunakan formulir ini untuk memuat seluruh Kwartir Ranting, kecamatan, Gugus Depan, dan pangkalan sekolah secara massal menggunakan format JSON hierarkis atau CSV.</p>
    </div>

    <form wire:submit="import" class="space-y-6">
        {{ $this->form }}

        <div class="flex justify-end gap-3 pt-4">
            <x-filament::button type="submit" size="lg" color="success">
                Mulai Proses Impor Wilayah
            </x-filament::button>
        </div>
    </form>
</x-filament-panels::page>
