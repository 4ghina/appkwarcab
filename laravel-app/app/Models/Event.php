<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Event extends Model
{
    protected $fillable = [
        'organization_unit_id',
        'nama',
        'slug',
        'tema',
        'tingkat',
        'tanggal_mulai',
        'tanggal_selesai',
        'lokasi',
        'penyelenggara',
        'total_kuota',
        'sisa_kuota',
        'kuota_per_gudep',
        'biaya',
        'deadline_pendaftaran',
        'status',
        'golongan_peserta',
        'syarat_minimal_tingkat',
        'syarat_usia_min',
        'syarat_usia_max',
        'approval_workflow',
        'deskripsi',
        'banner_image',
        'is_sample',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
        'deadline_pendaftaran' => 'datetime',
        'golongan_peserta' => 'array',
        'total_kuota' => 'integer',
        'sisa_kuota' => 'integer',
        'kuota_per_gudep' => 'integer',
        'syarat_usia_min' => 'integer',
        'syarat_usia_max' => 'integer',
        'is_sample' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($event) {
            if (empty($event->slug)) {
                $event->slug = Str::slug($event->nama);
            }
        });
    }

    public function organizationUnit(): BelongsTo
    {
        return $this->belongsTo(OrganizationUnit::class);
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function scopeReal($query)
    {
        return $query->where('is_sample', false);
    }

    public function scopeSample($query)
    {
        return $query->where('is_sample', true);
    }

    public function scopePublicVisible($query)
    {
        $hidden = AppSetting::get('sample_data_hidden', false);
        return $hidden ? $query->where('is_sample', false) : $query;
    }

    public function isOpen(): bool
    {
        return $this->status === 'Pendaftaran Dibuka' && 
               $this->sisa_kuota > 0 && 
               now()->lessThanOrEqualTo($this->deadline_pendaftaran);
    }
}
