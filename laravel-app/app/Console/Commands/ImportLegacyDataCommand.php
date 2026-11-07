<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\AppSetting;
use App\Models\Event;
use App\Models\OrganizationUnit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Exception;

class ImportLegacyDataCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'simkwarcab:import-legacy {--dry-run : Simulasi pemeriksaan data tanpa menulis ke database} {--path=../data : Path ke direktori data JSON}';

    /**
     * The console command description.
     */
    protected $description = 'Impor data warisan JSON SIM-KWARCAB (konfigurasi, identitas, kegiatan operasional) ke database MySQL dengan rollback transaksional';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $isDryRun = $this->option('dry-run');
        $baseDataPath = $this->resolveBaseDataPath();
        if (!$baseDataPath) {
            return Command::FAILURE;
        }

        $this->info("=== [SIM-KWARCAB] Pemindai & Impor Data Warisan ===");
        if ($isDryRun) {
            $this->warn("MODE DRY-RUN DIAKTIFKAN: Tidak ada perubahan yang akan disimpan ke database.");
        }

        try {
            DB::beginTransaction();
            $summary = [
                'settings_imported' => $this->importAppSettings("{$baseDataPath}/app-config.json", $isDryRun),
                'events_imported' => $this->importOperationalEvents("{$baseDataPath}/operational-events.json", $isDryRun),
            ];

            if ($isDryRun) {
                DB::rollBack();
            } else {
                DB::commit();
            }
            $this->reportImportSummary($summary, $isDryRun);
            return Command::SUCCESS;
        } catch (Exception $e) {
            DB::rollBack();
            $this->error("\nTerjadi kesalahan fatal selama proses migrasi: " . $e->getMessage());
            return Command::FAILURE;
        }
    }

    private function resolveBaseDataPath(): ?string
    {
        $path = base_path($this->option('path'));
        if (File::isDirectory($path)) return $path;
        $altPath = base_path('../data');
        if (File::isDirectory($altPath)) return $altPath;
        $this->error("Direktori data tidak ditemukan di: {$path}");
        return null;
    }

    private function importAppSettings(string $filePath, bool $isDryRun): int
    {
        if (!File::exists($filePath)) {
            $this->warn("Berkas app-config.json tidak ditemukan, melewati konfigurasi.");
            return 0;
        }
        $configData = json_decode(File::get($filePath), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Berkas app-config.json korup: " . json_last_error_msg());
        }

        $count = 0;
        foreach ($configData as $key => $val) {
            $type = is_array($val) ? 'json' : (is_bool($val) ? 'boolean' : 'string');
            $valStr = is_array($val) ? json_encode($val) : (is_bool($val) ? ($val ? '1' : '0') : (string) $val);
            if (!$isDryRun) {
                AppSetting::updateOrCreate(
                    ['key' => $key],
                    [
                        'value' => $valStr, 'type' => $type,
                        'group' => in_array($key, ['colors', 'logos']) ? 'theme' : (in_array($key, ['activeFeatures', 'isDemoMode']) ? 'features' : 'identity'),
                        'description' => "Pengaturan {$key} hasil migrasi sistem",
                    ]
                );
            }
            $count++;
        }
        return $count;
    }

    private function importOperationalEvents(string $filePath, bool $isDryRun): int
    {
        if (!File::exists($filePath)) {
            $this->warn("Berkas operational-events.json tidak ditemukan.");
            return 0;
        }
        $eventsData = json_decode(File::get($filePath), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Berkas operational-events.json korup: " . json_last_error_msg());
        }

        $defaultKwarcab = null;
        if (!$isDryRun) {
            $defaultKwarcab = OrganizationUnit::firstOrCreate(
                ['code' => '09.22'],
                ['type' => 'kwarcab', 'name' => 'Kwartir Cabang Gerakan Pramuka Kota Depok', 'slug' => 'kwarcab-kota-depok', 'pangkalan' => 'Gedung Pramuka Kwarcab Kota Depok', 'status' => 'Aktif']
            );
        }

        foreach ($eventsData as $item) {
            if (!$isDryRun) {
                $this->saveEventRecord($item, $defaultKwarcab?->id);
            }
        }
        return count($eventsData);
    }

    private function saveEventRecord(array $item, ?int $unitId): void
    {
        Event::updateOrCreate(
            ['slug' => \Illuminate\Support\Str::slug($item['nama'])],
            [
                'organization_unit_id' => $unitId,
                'nama' => $item['nama'],
                'tema' => $item['tema'] ?? $item['nama'],
                'tingkat' => $item['tingkat'] ?? 'Cabang',
                'tanggal_mulai' => $item['tanggal'] ?? now()->addDays(14)->toDateString(),
                'lokasi' => $item['lokasi'] ?? 'Bumi Perkemahan',
                'penyelenggara' => $item['penyelenggara'] ?? 'Kwarcab',
                'total_kuota' => (int) ($item['totalKuota'] ?? 100),
                'sisa_kuota' => (int) ($item['sisaKuota'] ?? 100),
                'deadline_pendaftaran' => $item['deadlinePendaftaran'] ?? now()->addDays(10)->toDateTimeString(),
                'status' => $item['status'] ?? 'Pendaftaran Dibuka',
                'golongan_peserta' => $item['golonganPeserta'] ?? ['Penegak', 'Pandega'],
                'syarat_minimal_tingkat' => $item['syaratMinimalTingkat'] ?? 'Calon Anggota',
                'syarat_usia_min' => (int) ($item['syaratUsiaMin'] ?? 16),
                'syarat_usia_max' => (int) ($item['syaratUsiaMax'] ?? 25),
                'approval_workflow' => $item['approvalWorkflow'] ?? 'rekomendasi_kwarran',
                'deskripsi' => $item['deskripsi'] ?? 'Kegiatan Pramuka Kwarcab',
            ]
        );
    }

    private function reportImportSummary(array $summary, bool $isDryRun): void
    {
        if ($isDryRun) {
            $this->info("\n=== HASIL PEMERIKSAAN DRY-RUN ===");
            $this->table(['Item', 'Jumlah Ditemukan'], [
                ['Pengaturan Aplikasi', $summary['settings_imported']],
                ['Kegiatan Operasional', $summary['events_imported']],
                ['Status Data', 'Valid & Siap Diimpor'],
            ]);
        } else {
            $this->info("\n=== RINGKASAN IMPOR BERHASIL ===");
            $this->table(['Entitas', 'Jumlah Terimpor'], [
                ['Pengaturan CMS (app_settings)', $summary['settings_imported']],
                ['Kegiatan & Kuota (events)', $summary['events_imported']],
            ]);
        }
    }
}
