<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('membership_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('target_organization_id')->constrained('organization_units')->cascadeOnDelete();
            $table->enum('applied_role', ['Peserta Didik', 'Pembina Satuan', 'Pengurus Gudep/Staf', 'Orang Tua/Wali']);
            $table->enum('target_golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega', 'Pembina', 'Pelatih', 'Umum'])->nullable();
            $table->string('claim_existing_nta')->nullable(); // Menghubungkan akun dengan arsip fisik/KTA lama
            $table->enum('status', ['pending', 'approved', 'rejected', 'revision'])->default('pending');
            $table->foreignId('reviewer_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('reviewer_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->index(['target_organization_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('membership_applications');
    }
};
