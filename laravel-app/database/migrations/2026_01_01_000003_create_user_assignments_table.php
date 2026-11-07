<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('organization_unit_id')->constrained('organization_units')->cascadeOnDelete();
            $table->string('role_type'); // 'Anggota Muda', 'Pembina Satuan', 'Andalan Kwarran', 'Admin Gudep', 'Super Admin Kwarcab'
            $table->string('title');     // e.g. 'Pembina Penegak Putra', 'Ketua Kwartir Ranting'
            $table->enum('level', ['Gudep', 'Kwarran', 'Kwarcab', 'Saka', 'Pusdiklatcab']);
            $table->boolean('is_primary')->default(false);
            $table->foreignId('approved_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('approved_at')->nullable();
            $table->enum('status', ['active', 'pending', 'expired', 'revoked'])->default('active');
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['organization_unit_id', 'role_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_assignments');
    }
};
