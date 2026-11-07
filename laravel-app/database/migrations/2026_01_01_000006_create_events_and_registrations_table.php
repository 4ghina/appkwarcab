<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->createEventsTable();
        $this->createEventRegistrationsTable();
    }

    private function createEventsTable(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_unit_id')->nullable()->constrained('organization_units')->nullOnDelete();
            $table->string('nama');
            $table->string('slug')->unique();
            $table->string('tema')->nullable();
            $table->enum('tingkat', ['Gudep', 'Ranting', 'Cabang', 'Daerah', 'Nasional', 'Internasional'])->default('Cabang');
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai')->nullable();
            $table->string('lokasi');
            $table->string('penyelenggara')->default('Kwartir Cabang Gerakan Pramuka');
            $table->unsignedInteger('total_kuota');
            $table->unsignedInteger('sisa_kuota');
            $table->unsignedInteger('kuota_per_gudep')->default(16);
            $table->string('biaya')->default('Gratis / Swadaya');
            $table->dateTime('deadline_pendaftaran');
            $table->enum('status', ['Segera Hadir', 'Pendaftaran Dibuka', 'Ditutup', 'Selesai'])->default('Pendaftaran Dibuka');
            $table->json('golongan_peserta');
            $table->string('syarat_minimal_tingkat')->default('Calon Anggota');
            $table->unsignedTinyInteger('syarat_usia_min')->default(7);
            $table->unsignedTinyInteger('syarat_usia_max')->default(25);
            $table->enum('approval_workflow', ['langsung_gudep', 'rekomendasi_kwarran', 'seleksi_kwarcab'])->default('rekomendasi_kwarran');
            $table->text('deskripsi')->nullable();
            $table->string('banner_image')->nullable();
            $table->timestamps();
            $table->index(['status', 'deadline_pendaftaran']);
        });
    }

    private function createEventRegistrationsTable(): void
    {
        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->foreignId('organization_unit_id')->constrained('organization_units')->cascadeOnDelete();
            $table->foreignId('registered_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedInteger('jumlah_peserta_pa')->default(0);
            $table->unsignedInteger('jumlah_peserta_pi')->default(0);
            $table->unsignedInteger('total_peserta')->default(0);
            $table->enum('status', ['Draft', 'Menunggu Persetujuan', 'Disetujui', 'Ditolak', 'Dibatalkan'])->default('Disetujui');
            $table->string('nomor_surat_tugas')->nullable();
            $table->string('berkas_rekomendasi_path')->nullable();
            $table->text('catatan_panitia')->nullable();
            $table->timestamps();
            $table->unique(['event_id', 'organization_unit_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_registrations');
        Schema::dropIfExists('events');
    }
};
