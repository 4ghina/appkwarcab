<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * BANK MASTER SKU NASIONAL (SK KWARNAS 198/2011) - 259 BUTIR
     */
    public function up(): void
    {
        Schema::create('sku_master_requirements', function (Blueprint $table) {
            $table->string('id')->primary(); // e.g. 'sku-bantara-1'
            $table->enum('golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega']);
            $table->string('tingkat'); // 'Mula', 'Bantu', 'Tata', 'Ramu', 'Rakit', 'Terap', 'Bantara', 'Laksana', 'Pandega'
            $table->unsignedSmallInteger('nomor');
            $table->enum('kategori', [
                'Spiritual & Agama',
                'Patriotisme & Wawasan',
                'Keterampilan & Sandi',
                'Fisik & Kesehatan',
                'Sosial & Alam'
            ]);
            $table->text('deskripsi');
            $table->json('religious_branches')->nullable(); // 5 cabang agama untuk butir 1
            $table->json('sub_items')->nullable();
            $table->enum('verification_method', ['praktek', 'pengamatan', 'wawancara', 'tertulis']);
            
            // Metadata Sumber Resmi dari 4 Berkas PDF
            $table->string('source_document')->default('SK Kwarnas No. 198 Tahun 2011');
            $table->string('pdf_source_file'); // 'SKU-Siaga.pdf', 'SKU-Penggalang.pdf', 'SKU-Penegak.pdf', 'SKU-Pandega.pdf'
            $table->unsignedSmallInteger('pdf_page');
            $table->boolean('flagged_for_review')->default(false);
            $table->text('review_notes')->nullable();

            $table->timestamps();

            // Indexing & Unique check
            $table->unique(['golongan', 'tingkat', 'nomor'], 'unique_sku_point');
        });

        // Tabel Rekam Progres SKU Peserta Didik
        Schema::create('sku_member_progress', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('member_id')->constrained('scout_members')->cascadeOnDelete();
            $table->string('sku_requirement_id')->constrained('sku_master_requirements')->cascadeOnDelete();
            $table->boolean('is_passed')->default(false);
            $table->timestamp('passed_at')->nullable();
            $table->foreignUuid('examiner_id')->nullable()->constrained('scout_members');
            $table->string('examiner_name')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();
            $table->unique(['member_id', 'sku_requirement_id'], 'unique_member_sku_progress');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sku_member_progress');
        Schema::dropIfExists('sku_master_requirements');
    }
};
