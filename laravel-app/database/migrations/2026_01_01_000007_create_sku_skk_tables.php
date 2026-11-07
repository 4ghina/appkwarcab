<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->createSkuTables();
        $this->createSkkTables();
    }

    private function createSkuTables(): void
    {
        Schema::create('sku_categories', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->enum('golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega']);
            $table->string('tingkat')->nullable();
            $table->timestamps();
        });

        Schema::create('sku_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sku_category_id')->nullable()->constrained('sku_categories')->nullOnDelete();
            $table->unsignedSmallInteger('nomor');
            $table->enum('golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega']);
            $table->string('tingkat');
            $table->string('kategori');
            $table->text('deskripsi');
            $table->timestamps();
            $table->unique(['golongan', 'tingkat', 'nomor']);
        });

        Schema::create('member_sku_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('sku_item_id')->constrained('sku_items')->cascadeOnDelete();
            $table->boolean('is_passed')->default(false);
            $table->foreignId('tested_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('tester_name')->nullable();
            $table->date('tested_date')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'sku_item_id']);
        });
    }

    private function createSkkTables(): void
    {
        Schema::create('skk_badges', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->enum('tingkat', ['Purwa', 'Madya', 'Utama']);
            $table->enum('bidang', ['Agama/Sosial', 'Patriotisme', 'Keterampilan/Pembangunan', 'Ketangkasan/Kesehatan', 'Sosial/Kemanusiaan']);
            $table->string('color')->default('#E53935');
            $table->string('icon')->default('award');
            $table->timestamps();
        });

        Schema::create('member_skk_badges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('skk_badge_id')->constrained('skk_badges')->cascadeOnDelete();
            $table->date('earned_date');
            $table->foreignId('approved_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('certificate_number')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'skk_badge_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('member_skk_badges');
        Schema::dropIfExists('skk_badges');
        Schema::dropIfExists('member_sku_progress');
        Schema::dropIfExists('sku_items');
        Schema::dropIfExists('sku_categories');
    }
};
