<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * ATURAN 1: PISAHKAN STATUS KEANGGOTAAN, USIA, GOLONGAN, DAN PENUGASAN
     */
    public function up(): void
    {
        $this->createScoutMembersTable();
        $this->createScoutAssignmentsTable();
        $this->createAdultCredentialsTable();
    }

    private function createScoutMembersTable(): void
    {
        Schema::create('scout_members', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('email')->unique();
            $table->string('name');
            $table->string('phone')->nullable();
            $table->date('birth_date');
            $table->unsignedSmallInteger('calculated_age');
            $table->enum('gender', ['L', 'P']);
            $table->string('blood_type', 5)->default('O+');
            $table->string('avatar_url')->nullable();
            $table->boolean('email_verified')->default(false);
            $table->enum('membership_status', ['unregistered', 'pending_verification', 'verified', 'revision_needed', 'suspended'])->default('unregistered');
            $table->enum('member_category', ['peserta_didik', 'anggota_dewasa', 'orang_tua', 'umum']);
            $table->enum('youth_golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega'])->nullable();
            $table->string('youth_tingkat')->nullable();
            $table->boolean('is_garuda')->default(false);
            $table->unsignedSmallInteger('garuda_year')->nullable();
            $table->string('nta', 30)->nullable()->unique();
            $table->string('provisional_nta', 30)->nullable();
            $table->string('claimed_old_nta', 30)->nullable();
            $table->enum('nta_claim_status', ['none', 'pending_check', 'verified', 'conflict'])->default('none');
            $table->string('gudep_id')->nullable();
            $table->string('gudep_name')->nullable();
            $table->string('gudep_nomor')->nullable();
            $table->string('pangkalan')->nullable();
            $table->string('kwarran')->default('Pancoran Mas');
            $table->string('kwarcab')->default('Kota Depok');
            $table->string('kwarda')->default('Jawa Barat');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    private function createScoutAssignmentsTable(): void
    {
        Schema::create('scout_assignments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('member_id')->constrained('scout_members')->cascadeOnDelete();
            $table->string('role_type');
            $table->string('title');
            $table->string('organization_unit');
            $table->string('organization_unit_id')->nullable();
            $table->enum('level', ['Gudep', 'Kwarran', 'Kwarcab', 'Kwarda', 'Saka', 'Pusdiklat']);
            $table->string('approved_by');
            $table->date('approved_date');
            $table->boolean('is_primary')->default(false);
            $table->boolean('can_examine_sku')->default(false);
            $table->boolean('can_award_tkk')->default(false);
            $table->boolean('can_manage_members')->default(false);
            $table->string('scope_gudep_id')->nullable();
            $table->timestamps();
        });
    }

    private function createAdultCredentialsTable(): void
    {
        Schema::create('adult_credentials', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('member_id')->constrained('scout_members')->cascadeOnDelete();
            $table->enum('course_code', ['KMD', 'KML', 'KPD', 'KPL']);
            $table->enum('course_status', ['belum_tercatat', 'sedang_mengikuti', 'selesai'])->default('belum_tercatat');
            $table->unsignedSmallInteger('graduation_year')->nullable();
            $table->string('cert_number')->nullable();
            $table->string('organizer')->nullable();
            $table->string('document_code')->nullable();
            $table->enum('document_status', ['belum_memiliki', 'aktif', 'kadaluwarsa'])->default('belum_memiliki');
            $table->string('doc_number')->nullable();
            $table->date('issued_date')->nullable();
            $table->date('expiry_date')->nullable();
            $table->string('issued_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adult_credentials');
        Schema::dropIfExists('scout_assignments');
        Schema::dropIfExists('scout_members');
    }
};
