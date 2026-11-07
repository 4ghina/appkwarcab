<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organization_units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('organization_units')->nullOnDelete();
            $table->enum('type', ['kwarcab', 'kwarran', 'gudep', 'saka', 'sako', 'pusdiklatcab', 'badan_usaha']);
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('code')->nullable(); // e.g., '11.23' or '01.045'
            $table->string('nomor_gudep_pa')->nullable();
            $table->string('nomor_gudep_pi')->nullable();
            $table->string('pangkalan')->nullable(); // Nama sekolah / instansi pangkalan
            $table->string('pembina_nama')->nullable();
            $table->text('alamat')->nullable();
            $table->string('kontak_wa')->nullable();
            $table->string('email')->nullable();
            $table->enum('akreditasi', ['A', 'B', 'C', 'Belum'])->default('Belum');
            $table->enum('status', ['Aktif', 'Kurang Aktif', 'Belum Her-Registrasi', 'Nonaktif'])->default('Aktif');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->date('terakhir_her_registrasi')->nullable();
            $table->json('metadata')->nullable(); // Statistik, sosial media dsb.
            $table->timestamps();

            $table->index(['type', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organization_units');
    }
};
