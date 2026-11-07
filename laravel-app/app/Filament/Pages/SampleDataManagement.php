<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Notifications\Notification;
use App\Models\AppSetting;
use App\Models\OrganizationUnit;
use App\Models\User;
use App\Models\MemberProfile;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\AuditLog;
use Illuminate\Support\Facades\Artisan;

class SampleDataManagement extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-beaker';
    protected static ?string $navigationLabel = 'Data Contoh Instalasi';
    protected static ?string $navigationGroup = 'Sistem & CMS';
    protected static ?int $navigationSort = 3;
    protected static string $view = 'filament.pages.sample-data-management';

    public int $sampleUnitsCount = 0;
    public int $sampleUsersCount = 0;
    public int $sampleEventsCount = 0;
    public bool $isSampleHidden = false;
    public bool $isSampleLoaded = false;

    public function mount(): void
    {
        $this->refreshStats();
    }

    public function refreshStats(): void
    {
        $this->sampleUnitsCount = OrganizationUnit::where('is_sample', true)->count();
        $this->sampleUsersCount = User::where('is_sample', true)->count();
        $this->sampleEventsCount = Event::where('is_sample', true)->count();
        $this->isSampleHidden = (bool) AppSetting::get('sample_data_hidden', false);
        $this->isSampleLoaded = (bool) AppSetting::get('sample_data_loaded', false);
    }

    public function loadSampleData(): void
    {
        Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\DemoDataSeeder', '--force' => true]);
        AppSetting::set('sample_data_loaded', '1', 'sample_data', 'boolean');
        $this->recordAudit('load_sample_data', 'Memuat data contoh awal instalasi SIM-KWARCAB.');
        $this->refreshStats();

        Notification::make()
            ->title('Data Contoh Berhasil Dimuat!')
            ->body('Data contoh telah ditandai dengan flag is_sample dan siap diuji.')
            ->success()
            ->send();
    }

    public function toggleVisibility(): void
    {
        $newHiddenState = !$this->isSampleHidden;
        AppSetting::set('sample_data_hidden', $newHiddenState ? '1' : '0', 'sample_data', 'boolean');
        $desc = $newHiddenState ? 'Menyembunyikan data contoh dari publik & statistik' : 'Menampilkan data contoh';
        $this->recordAudit('toggle_sample_visibility', $desc);
        $this->refreshStats();

        Notification::make()
            ->title($newHiddenState ? 'Data Contoh Disembunyikan' : 'Data Contoh Ditampilkan')
            ->body($newHiddenState ? 'Data contoh kini dikecualikan dari website publik, infografik, dan ekspor resmi.' : 'Data contoh kini terlihat kembali untuk pengujian.')
            ->info()
            ->send();
    }

    public function purgeSampleData(): void
    {
        $conflicts = $this->checkRealDataConflicts();
        if (!empty($conflicts)) {
            $this->recordAudit('purge_sample_blocked', 'Penghapusan data contoh dicegah karena ada relasi ke data riil: ' . implode(', ', $conflicts));
            Notification::make()
                ->title('Penghapusan Dibatalkan: Ada Relasi Data Riil!')
                ->body('Data contoh tidak dapat dihapus karena telah terhubung dengan data riil: ' . implode('; ', $conflicts))
                ->danger()
                ->send();
            return;
        }

        $this->executePurge();
        $this->refreshStats();

        Notification::make()
            ->title('Pembersihan Selesai')
            ->body('Seluruh data contoh berhasil dihapus. Data dasar sistem, akun admin, dan identitas Kwarcab tetap utuh.')
            ->success()
            ->send();
    }

    private function checkRealDataConflicts(): array
    {
        $conflicts = [];
        $sampleUnitIds = OrganizationUnit::where('is_sample', true)->pluck('id');

        $realMembersInSampleUnits = MemberProfile::whereIn('organization_unit_id', $sampleUnitIds)
            ->where('is_sample', false)
            ->count();
        if ($realMembersInSampleUnits > 0) {
            $conflicts[] = "{$realMembersInSampleUnits} anggota riil terdaftar pada Gudep contoh";
        }

        $sampleEventIds = Event::where('is_sample', true)->pluck('id');
        $realRegistrations = EventRegistration::whereIn('event_id', $sampleEventIds)
            ->where('is_sample', false)
            ->count();
        if ($realRegistrations > 0) {
            $conflicts[] = "{$realRegistrations} pendaftaran riil terhubung ke Kegiatan contoh";
        }

        return $conflicts;
    }

    private function executePurge(): void
    {
        EventRegistration::where('is_sample', true)->delete();
        Event::where('is_sample', true)->delete();
        MemberProfile::where('is_sample', true)->delete();
        User::where('is_sample', true)->delete();
        OrganizationUnit::where('is_sample', true)->delete();

        AppSetting::set('sample_data_loaded', '0', 'sample_data', 'boolean');
        $this->recordAudit('purge_sample_data', 'Penghapusan massal data contoh selesai secara aman.');
    }

    private function recordAudit(string $action, string $summary): void
    {
        AuditLog::create([
            'action' => $action,
            'auditable_type' => 'SampleData',
            'summary' => $summary,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}
