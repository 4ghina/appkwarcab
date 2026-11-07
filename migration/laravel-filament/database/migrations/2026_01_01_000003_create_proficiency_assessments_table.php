<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * ATURAN 3, 5, & 6: PENGAJUAN UJI, PEMERIKSAAN, PENCEGAHAN DUPLIKASI, DAN PEMISAHAN STATUS
     */
    public function up(): void
    {
        Schema::create('proficiency_assessments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('idempotency_key', 120)->unique();
            
            $this->addAssessmentIdentityColumns($table);
            $this->addAssessmentItemColumns($table);
            $this->addAssessmentGovernanceColumns($table);

            $table->timestamps();
            $table->index(['student_id', 'item_id', 'status'], 'idx_pending_assessment');
        });
    }

    private function addAssessmentIdentityColumns(Blueprint $table): void
    {
        $table->foreignUuid('student_id')->constrained('scout_members')->cascadeOnDelete();
        $table->string('student_name');
        $table->enum('student_golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega']);
        $table->string('student_tingkat');
        $table->string('gudep_id');
        $table->string('gudep_name');
    }

    private function addAssessmentItemColumns(Blueprint $table): void
    {
        $table->enum('item_type', ['SKU', 'SKK']);
        $table->string('item_id');
        $table->string('item_title');
        $table->string('category');
        $table->text('submission_note');
        $table->string('evidence_url')->nullable();
        $table->enum('status', ['diajukan', 'perlu_revisi', 'disahkan'])->default('diajukan');
    }

    private function addAssessmentGovernanceColumns(Blueprint $table): void
    {
        $table->foreignUuid('examiner_id')->nullable()->constrained('scout_members');
        $table->string('examiner_name')->nullable();
        $table->text('reviewer_feedback')->nullable();
        $table->timestamp('reviewed_at')->nullable();
        $table->boolean('item_passed')->default(false);
        $table->enum('completion_phase', ['butir_terpenuhi', 'seluruh_syarat_lengkap', 'pelantikan_ditetapkan', 'tanda_diterbitkan'])->default('butir_terpenuhi');
        $table->enum('certificate_status', ['konfigurasi_belum_ditetapkan', 'menunggu_sk', 'resmi_terbit'])->default('konfigurasi_belum_ditetapkan');
        $table->string('certificate_number')->nullable();
        $table->text('certificate_notice')->nullable();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proficiency_assessments');
    }
};
