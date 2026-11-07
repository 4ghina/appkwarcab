<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Skema Pendidikan Dewasa & Dokumen Kewenangan (Section 11 & 16: KMD, KML, KPD, KPL; SHB, SHL)
     */
    public function up(): void
    {
        // 1. Riwayat Kursus Pendidikan Anggota Dewasa (Pusdiklatcab / Pusdiklatda)
        Schema::create('adult_education_courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('course_level', ['KMD', 'KML', 'KPD', 'KPL']);
            $table->foreignId('organizer_unit_id')->nullable()->constrained('organization_units')->nullOnDelete();
            $table->string('issuing_pusdiklat')->default('Pusdiklatcab Chandrabratha');
            $table->year('year_completed')->nullable();
            $table->string('certificate_number', 100)->nullable();
            $table->enum('narakarya_status', ['belum', 'sedang_berjalan', 'lulus'])->default('belum');
            $table->enum('status', ['lulus', 'sedang_mengikuti', 'rencana'])->default('lulus');
            $table->timestamps();

            $table->unique(['user_id', 'course_level'], 'uniq_user_course');
        });

        // 2. Dokumen Kewenangan Membina & Melatih (SHB & SHL)
        Schema::create('authority_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('document_type', ['SHB', 'SHL']);
            $table->string('decree_number', 120)->comment('Nomor Surat Keputusan / Surat Hak Bina');
            $table->enum('target_golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega', 'Semua'])->default('Penegak');
            $table->foreignId('issued_by_unit_id')->nullable()->constrained('organization_units')->nullOnDelete();
            $table->date('issued_at')->nullable();
            $table->date('valid_until')->nullable();
            $table->enum('status', ['aktif', 'kedaluwarsa', 'dicabut'])->default('aktif');
            $table->string('scanned_document_url')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'document_type', 'status'], 'idx_auth_doc_user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authority_documents');
        Schema::dropIfExists('adult_education_courses');
    }
};
