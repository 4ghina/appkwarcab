<?php

namespace App\Services;

use App\Models\Event;
use App\Models\EventRegistration;
use App\Models\OrganizationUnit;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class EventQuotaService
{
    /**
     * Register a Gudep contingent with atomic lock to prevent race condition overbooking
     */
    public function registerContingent(
        int $eventId,
        int $gudepId,
        User $registeredBy,
        int $pesertaPa,
        int $pesertaPi,
        ?string $nomorSuratTugas = null,
        ?string $berkasPath = null
    ): EventRegistration {
        $totalRequested = $pesertaPa + $pesertaPi;
        if ($totalRequested <= 0) {
            throw ValidationException::withMessages(['jumlah_peserta' => 'Total peserta minimal 1 orang.']);
        }

        return DB::transaction(function () use (
            $eventId, $gudepId, $registeredBy, $pesertaPa, $pesertaPi, $totalRequested, $nomorSuratTugas, $berkasPath
        ) {
            $event = Event::where('id', $eventId)->lockForUpdate()->firstOrFail();
            $this->validateEventEligibility($event, $totalRequested, $gudepId);
            $registration = $this->createRegistrationRecord(
                $event, $gudepId, $registeredBy, $pesertaPa, $pesertaPi, $totalRequested, $nomorSuratTugas, $berkasPath
            );
            $event->decrement('sisa_kuota', $totalRequested);
            return $registration;
        });
    }

    private function validateEventEligibility(Event $event, int $totalRequested, int $gudepId): void
    {
        if (!$event->isOpen()) {
            throw ValidationException::withMessages(['event' => 'Pendaftaran untuk kegiatan ini sudah ditutup atau kuota habis.']);
        }
        if ($event->sisa_kuota < $totalRequested) {
            throw ValidationException::withMessages(['kuota' => "Sisa kuota tidak mencukupi. Kuota tersisa hanya {$event->sisa_kuota} orang."]);
        }
        if ($totalRequested > $event->kuota_per_gudep) {
            throw ValidationException::withMessages(['kuota_per_gudep' => "Maksimal kuota per Gudep untuk kegiatan ini adalah {$event->kuota_per_gudep} orang."]);
        }
        $existing = EventRegistration::where('event_id', $event->id)->where('organization_unit_id', $gudepId)->first();
        if ($existing) {
            throw ValidationException::withMessages(['gudep' => 'Pangkalan / Gudep ini sudah terdaftar pada kegiatan tersebut.']);
        }
    }

    private function createRegistrationRecord(
        Event $event,
        int $gudepId,
        User $registeredBy,
        int $pesertaPa,
        int $pesertaPi,
        int $totalRequested,
        ?string $nomorSuratTugas,
        ?string $berkasPath
    ): EventRegistration {
        return EventRegistration::create([
            'event_id' => $event->id,
            'organization_unit_id' => $gudepId,
            'registered_by_user_id' => $registeredBy->id,
            'jumlah_peserta_pa' => $pesertaPa,
            'jumlah_peserta_pi' => $pesertaPi,
            'total_peserta' => $totalRequested,
            'status' => 'Disetujui',
            'nomor_surat_tugas' => $nomorSuratTugas,
            'berkas_rekomendasi_path' => $berkasPath,
        ]);
    }

    /**
     * Cancel registration and safely return quota atomically
     */
    public function cancelRegistration(int $registrationId, string $reason = ''): void
    {
        DB::transaction(function () use ($registrationId, $reason) {
            $registration = EventRegistration::where('id', $registrationId)->firstOrFail();
            $event = Event::where('id', $registration->event_id)->lockForUpdate()->firstOrFail();

            if ($registration->status !== 'Dibatalkan') {
                $countToReturn = $registration->total_peserta;
                $registration->update([
                    'status' => 'Dibatalkan',
                    'catatan_panitia' => $reason ? "Dibatalkan: {$reason}" : 'Pendaftaran dibatalkan.',
                ]);

                $event->increment('sisa_kuota', $countToReturn);
            }
        });
    }
}
