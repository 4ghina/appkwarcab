<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventRegistration extends Model
{
    protected $fillable = [
        'event_id',
        'organization_unit_id',
        'registered_by_user_id',
        'jumlah_peserta_pa',
        'jumlah_peserta_pi',
        'total_peserta',
        'status',
        'nomor_surat_tugas',
        'berkas_rekomendasi_path',
        'catatan_panitia',
    ];

    protected $casts = [
        'jumlah_peserta_pa' => 'integer',
        'jumlah_peserta_pi' => 'integer',
        'total_peserta' => 'integer',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function organizationUnit(): BelongsTo
    {
        return $this->belongsTo(OrganizationUnit::class);
    }

    public function registeredBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'registered_by_user_id');
    }
}
