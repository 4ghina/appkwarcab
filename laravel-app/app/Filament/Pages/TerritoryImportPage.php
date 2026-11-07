<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Form;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Notifications\Notification;
use App\Models\OrganizationUnit;
use Illuminate\Support\Str;

class TerritoryImportPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-arrow-up-tray';
    protected static ?string $navigationLabel = 'Impor Wilayah & Gudep';
    protected static ?string $navigationGroup = 'Organisasi';
    protected static ?int $navigationSort = 2;
    protected static string $view = 'filament.pages.territory-import-page';

    public ?array $data = [];

    public function form(Form $form): Form
    {
        return $form->schema([
            Select::make('format')
                ->label('Format Masukan Data')
                ->options(['json' => 'Format JSON Terstruktur', 'csv' => 'Format CSV (Baris per Unit)'])
                ->default('json')
                ->required(),
            Textarea::make('payload')
                ->label('Data Wilayah & Gudep')
                ->helperText('Tempel daftar Kwarran dan Gudep dalam format JSON hierarkis atau teks CSV.')
                ->rows(12)
                ->required(),
        ])->statePath('data');
    }

    public function import(): void
    {
        $input = $this->form->getState();
        $payload = trim($input['payload']);
        $format = $input['format'];

        try {
            $count = $format === 'json' ? $this->importFromJson($payload) : $this->importFromCsv($payload);
            Notification::make()
                ->title("Impor Berhasil: {$count} Unit Organisasi Diproses")
                ->success()
                ->send();
        } catch (\Throwable $e) {
            Notification::make()
                ->title('Gagal Mengimpor Data Wilayah')
                ->body($e->getMessage())
                ->danger()
                ->send();
        }
    }

    private function importFromJson(string $raw): int
    {
        $items = json_decode($raw, true);
        if (!is_array($items)) {
            throw new \InvalidArgumentException('Format JSON tidak valid atau struktur bukan array.');
        }

        $kwarcab = OrganizationUnit::where('type', 'kwarcab')->first();
        $kwarcabId = $kwarcab?->id;
        $count = 0;

        foreach ($items as $entry) {
            $this->processJsonEntry($entry, $kwarcabId);
            $count++;
        }
        return $count;
    }

    private function processJsonEntry(array $entry, ?int $kwarcabId): void
    {
        $type = $entry['type'] ?? 'kwarran';
        $name = $entry['name'] ?? 'Unit Baru';
        $code = $entry['code'] ?? null;
        $slug = Str::slug($name);

        $unit = OrganizationUnit::updateOrCreate(
            ['slug' => $slug],
            [
                'parent_id' => $kwarcabId,
                'type' => $type,
                'name' => $name,
                'code' => $code,
                'pangkalan' => $entry['pangkalan'] ?? null,
                'status' => 'Aktif',
            ]
        );

        if (!empty($entry['gudep_list']) && is_array($entry['gudep_list'])) {
            foreach ($entry['gudep_list'] as $g) {
                $this->createSubGudep($unit->id, $g);
            }
        }
    }

    private function createSubGudep(int $parentId, array $g): void
    {
        $gName = $g['name'] ?? 'Gugus Depan';
        OrganizationUnit::updateOrCreate(
            ['slug' => Str::slug($gName . '-' . ($g['code'] ?? ''))],
            [
                'parent_id' => $parentId,
                'type' => 'gudep',
                'name' => $gName,
                'code' => $g['code'] ?? null,
                'nomor_gudep_pa' => $g['nomor_pa'] ?? null,
                'nomor_gudep_pi' => $g['nomor_pi'] ?? null,
                'pangkalan' => $g['pangkalan'] ?? null,
                'status' => 'Aktif',
            ]
        );
    }

    private function importFromCsv(string $raw): int
    {
        $lines = explode("\n", $raw);
        $kwarcab = OrganizationUnit::where('type', 'kwarcab')->first();
        $count = 0;

        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line) || str_starts_with($line, '#')) continue;
            $cols = str_getcsv($line);
            if (count($cols) >= 3) {
                OrganizationUnit::updateOrCreate(
                    ['slug' => Str::slug($cols[1])],
                    [
                        'parent_id' => $kwarcab?->id,
                        'type' => trim($cols[0]),
                        'name' => trim($cols[1]),
                        'code' => trim($cols[2]),
                        'pangkalan' => $cols[3] ?? null,
                        'status' => 'Aktif',
                    ]
                );
                $count++;
            }
        }
        return $count;
    }
}
