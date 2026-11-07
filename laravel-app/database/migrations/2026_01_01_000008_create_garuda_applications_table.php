<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('garuda_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('gudep_id')->constrained('organization_units')->cascadeOnDelete();
            $table->foreignId('kwarran_id')->nullable()->constrained('organization_units')->nullOnDelete();
            $table->enum('golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega']);
            $table->unsignedTinyInteger('current_step')->default(1); // 1: Gudep, 2: Kwarran, 3: Kwarcab, 4: SK Terbit
            $table->enum('status', [
                'Diajukan Gudep',
                'Verifikasi Kwarran',
                'Penilaian Kwarcab',
                'SK Terbit',
                'Perlu Revisi',
                'Ditolak'
            ])->default('Diajukan Gudep');

            // Portfolio & Documents Checklist
            $table->boolean('berkas_sku_lengkap')->default(false);
            $table->boolean('berkas_skk_minimal')->default(false); // 10 SKK
            $table->boolean('berkas_portofolio_bakti')->default(false);
            $table->boolean('berkas_rekomendasi_gudep')->default(false);
            $table->boolean('berkas_rekomendasi_kwarran')->default(false);

            $table->string('sk_nomor')->nullable();
            $table->date('sk_tanggal')->nullable();
            $table->text('catatan_penilai')->nullable();
            $table->timestamps();

            $table->index(['status', 'current_step']);
        });

        Schema::create('garuda_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('garuda_application_id')->constrained('garuda_applications')->cascadeOnDelete();
            $table->foreignId('reviewer_user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('tier', ['Gudep', 'Kwarran', 'Kwarcab']);
            $table->enum('decision', ['Direkomendasikan', 'Perlu Revisi', 'Ditolak']);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('garuda_reviews');
        Schema::dropIfExists('garuda_applications');
    }
};
