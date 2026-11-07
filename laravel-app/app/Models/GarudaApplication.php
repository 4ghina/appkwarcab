<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GarudaApplication extends Model
{
    protected $fillable = [
        'user_id',
        'gudep_id',
        'kwarran_id',
        'golongan',
        'current_step',
        'status',
        'berkas_sku_lengkap',
        'berkas_skk_minimal',
        'berkas_portofolio_bakti',
        'berkas_rekomendasi_gudep',
        'berkas_rekomendasi_kwarran',
        'sk_nomor',
        'sk_tanggal',
        'catatan_penilai',
    ];

    protected $casts = [
        'current_step' => 'integer',
        'berkas_sku_lengkap' => 'boolean',
        'berkas_skk_minimal' => 'boolean',
        'berkas_portofolio_bakti' => 'boolean',
        'berkas_rekomendasi_gudep' => 'boolean',
        'berkas_rekomendasi_kwarran' => 'boolean',
        'sk_tanggal' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function gudep(): BelongsTo
    {
        return $this->belongsTo(OrganizationUnit::class, 'gudep_id');
    }

    public function kwarran(): BelongsTo
    {
        return $this->belongsTo(OrganizationUnit::class, 'kwarran_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(GarudaReview::class);
    }
}
