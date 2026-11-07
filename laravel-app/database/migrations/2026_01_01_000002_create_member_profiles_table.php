<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('member_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('organization_unit_id')->nullable()->constrained('organization_units')->nullOnDelete();
            $table->foreignId('parent_user_id')->nullable()->constrained('users')->nullOnDelete();
            
            $this->addScoutIdentityColumns($table);
            $this->addBiodataAndQualificationColumns($table);
            $this->addMembershipStatusColumns($table);

            $table->timestamps();
            $table->index(['membership_status', 'member_category', 'student_golongan']);
        });
    }

    private function addScoutIdentityColumns(Blueprint $table): void
    {
        $table->string('nta')->unique()->nullable();
        $table->string('provisional_nta')->nullable();
        $table->enum('member_category', ['peserta_didik', 'anggota_dewasa', 'orang_tua', 'umum'])->default('peserta_didik');
        $table->enum('student_golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega'])->nullable();
        $table->string('student_tingkat')->nullable();
        $table->enum('golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega', 'Pembina', 'Pelatih', 'Umum'])->default('Umum');
        $table->string('tingkatan')->default('Calon Anggota');
    }

    private function addBiodataAndQualificationColumns(Blueprint $table): void
    {
        $table->date('birth_date')->nullable();
        $table->unsignedSmallInteger('calculated_age')->nullable();
        $table->enum('gender', ['L', 'P'])->nullable();
        $table->string('blood_type', 5)->default('-');
        $table->text('address')->nullable();
        $table->string('avatar_path')->nullable();
        $table->json('adult_education')->nullable();
        $table->json('adult_authority_docs')->nullable();
        $table->json('youth_archive')->nullable();
    }

    private function addMembershipStatusColumns(Blueprint $table): void
    {
        $table->enum('membership_status', ['unregistered', 'pending_verification', 'verified', 'revision_needed'])->default('unregistered');
        $table->boolean('is_garuda')->default(false);
        $table->year('garuda_year')->nullable();
        $table->string('garuda_sk_number')->nullable();
        $table->date('valid_until')->nullable();
        $table->text('notes')->nullable();
    }

    public function down(): void
    {
        Schema::dropIfExists('member_profiles');
    }
};
