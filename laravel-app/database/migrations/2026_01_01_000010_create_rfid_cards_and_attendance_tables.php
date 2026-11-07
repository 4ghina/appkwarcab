<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Skema Tabel KTA RFID / NFC & Absensi Kegiatan (Section 18)
     */
    public function up(): void
    {
        // 1. Pendaftaran Fisik Kartu Pintar (KTA Smart Card / Co-Branding)
        Schema::create('card_identities', function (Blueprint $table) {
            $table->id();
            $table->string('card_uid', 64)->unique()->comment('Nomor unik fisik chip NFC/RFID');
            $table->foreignId('member_profile_id')->nullable()->constrained('member_profiles')->nullOnDelete();
            $table->enum('card_type', ['mifare_classic', 'desfire', 'felica', 'emoney_cobrand'])->default('mifare_classic');
            $table->boolean('supports_balance')->default(false)->comment('Apakah chip memiliki sektor saldo/e-money');
            $table->boolean('supports_transactions')->default(false)->comment('Apakah chip mendukung log riwayat transaksi');
            $table->enum('status', ['active', 'blocked', 'unlinked'])->default('active');
            $table->timestamp('issued_at')->nullable();
            $table->timestamps();
        });

        // 2. Pencatatan Kehadiran Kegiatan (Absensi Real-Time dengan Debounce Index)
        Schema::create('event_attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->string('card_uid', 64)->index();
            $table->foreignId('member_profile_id')->nullable()->constrained('member_profiles')->nullOnDelete();
            $table->enum('mode', ['check_in', 'check_out'])->default('check_in');
            $table->foreignId('recorded_by_user_id')->nullable()->constrained('users')->nullOnDelete()->comment('Petugas absensi bertugas');
            $table->string('device_id', 64)->default('Terminal-01');
            $table->enum('status', ['tepat_waktu', 'terlambat'])->default('tepat_waktu');
            $table->timestamp('tapped_at')->useCurrent();
            $table->timestamps();

            // Indeks untuk mencegah tap ganda (anti-duplicate debounce query)
            $table->index(['card_uid', 'event_id', 'mode', 'tapped_at'], 'idx_attendance_debounce');
        });

        // 3. Log Pembacaan Saldo Read-Only (Hanya Sektor Terbaca Sah, Tanpa Mutasi Keuangan)
        Schema::create('card_balance_logs', function (Blueprint $table) {
            $table->id();
            $table->string('card_uid', 64)->index();
            $table->decimal('amount', 14, 2)->default(0);
            $table->string('currency', 3)->default('IDR');
            $table->string('source_description')->comment('Label sumber pembacaan chip co-branding');
            $table->timestamp('read_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('card_balance_logs');
        Schema::dropIfExists('event_attendances');
        Schema::dropIfExists('card_identities');
    }
};
