<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Form;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\ColorPicker;
use Filament\Notifications\Notification;
use App\Models\AppSetting;
use App\Models\OrganizationUnit;

class KwarcabOnboardingWizard extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-sparkles';
    protected static ?string $navigationLabel = 'Inisialisasi Wilayah Kwarcab';
    protected static ?string $navigationGroup = 'Sistem & CMS';
    protected static ?int $navigationSort = 1;
    protected static string $view = 'filament.pages.kwarcab-onboarding-wizard';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill($this->loadInitialData());
    }

    private function loadInitialData(): array
    {
        $kwarcab = OrganizationUnit::where('type', 'kwarcab')->first();
        return [
            'kwarcab_name' => AppSetting::where('key', 'kwarcab_name')->value('value') ?: ($kwarcab?->name ?? 'Kwartir Cabang Gerakan Pramuka'),
            'kwarcab_code' => AppSetting::where('key', 'kwarcab_code')->value('value') ?: ($kwarcab?->code ?? '09.22'),
            'kwarda_name' => AppSetting::where('key', 'kwarda_name')->value('value') ?: 'Kwartir Daerah Jawa Barat',
            'kabupaten_kota' => AppSetting::where('key', 'kabupaten_kota')->value('value') ?: 'Kota Depok',
            'app_timezone' => AppSetting::where('key', 'app_timezone')->value('value') ?: 'Asia/Jakarta',
            'theme_primary_color' => AppSetting::where('key', 'theme_primary_color')->value('value') ?: '#5D4037',
            'theme_accent_color' => AppSetting::where('key', 'theme_accent_color')->value('value') ?: '#2E7D32',
            'alamat' => $kwarcab?->alamat ?? '',
            'kontak_wa' => $kwarcab?->kontak_wa ?? '',
        ];
    }

    public function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('kwarcab_name')->label('Nama Kwartir Cabang')->required(),
            TextInput::make('kwarcab_code')->label('Kode Wilayah Cabang')->required(),
            TextInput::make('kwarda_name')->label('Kwartir Daerah Naungan')->required(),
            TextInput::make('kabupaten_kota')->label('Kabupaten / Kota')->required(),
            Select::make('app_timezone')->label('Zona Waktu')->options([
                'Asia/Jakarta' => 'WIB (Asia/Jakarta)',
                'Asia/Makassar' => 'WITA (Asia/Makassar)',
                'Asia/Jayapura' => 'WIT (Asia/Jayapura)',
            ])->required(),
            ColorPicker::make('theme_primary_color')->label('Warna Primer Tema'),
            ColorPicker::make('theme_accent_color')->label('Warna Aksen Tema'),
            Textarea::make('alamat')->label('Alamat Kantor Kwartir Cabang')->rows(2),
            TextInput::make('kontak_wa')->label('Nomor WhatsApp Resmi Pusinfo'),
        ])->statePath('data');
    }

    public function save(): void
    {
        $input = $this->form->getState();
        $this->persistSettings($input);
        $this->persistKwarcabUnit($input);

        Notification::make()
            ->title('Identitas Kwarcab Berhasil Disimpan!')
            ->body('Konfigurasi wilayah dan tema telah aktif di portal publik dan dashboard.')
            ->success()
            ->send();
    }

    private function persistSettings(array $input): void
    {
        $keys = ['kwarcab_name', 'kwarcab_code', 'kwarda_name', 'kabupaten_kota', 'app_timezone', 'theme_primary_color', 'theme_accent_color'];
        foreach ($keys as $k) {
            if (isset($input[$k])) {
                AppSetting::updateOrCreate(['key' => $k], ['value' => $input[$k], 'group' => 'identity']);
            }
        }
        AppSetting::updateOrCreate(['key' => 'setup_completed'], ['value' => '1', 'group' => 'onboarding']);
    }

    private function persistKwarcabUnit(array $input): void
    {
        OrganizationUnit::updateOrCreate(
            ['type' => 'kwarcab'],
            [
                'name' => $input['kwarcab_name'],
                'code' => $input['kwarcab_code'],
                'slug' => strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['kwarcab_name']))),
                'alamat' => $input['alamat'] ?? null,
                'kontak_wa' => $input['kontak_wa'] ?? null,
                'status' => 'Aktif',
            ]
        );
    }
}
