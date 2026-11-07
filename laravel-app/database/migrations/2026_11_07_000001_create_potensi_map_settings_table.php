<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('potensi_map_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('Peta Potensi Pramuka Kwartir Cabang');
            $table->text('description')->nullable();
            $table->string('data_source')->default('Pelaporan Terverifikasi Kwartir Cabang Kota Depok');
            $table->string('boundary_source')->default('Badan Informasi Geospasial (BIG) & BPS Kota Depok');
            $table->string('color_scheme')->default('amber');
            $table->boolean('is_published')->default(true);
            $table->string('default_category')->default('peserta_didik');
            $table->string('default_metric')->default('total_peserta');
            $table->longText('geojson_data')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('potensi_map_settings');
    }
};
