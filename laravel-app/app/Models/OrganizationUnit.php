<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class OrganizationUnit extends Model
{
    protected $fillable = [
        'parent_id',
        'type',
        'name',
        'slug',
        'code',
        'nomor_gudep_pa',
        'nomor_gudep_pi',
        'pangkalan',
        'pembina_nama',
        'alamat',
        'kontak_wa',
        'email',
        'akreditasi',
        'status',
        'latitude',
        'longitude',
        'terakhir_her_registrasi',
        'metadata',
        'is_sample',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'terakhir_her_registrasi' => 'date',
        'metadata' => 'array',
        'is_sample' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($unit) {
            if (empty($unit->slug)) {
                $unit->slug = Str::slug($unit->name);
            }
        });
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(OrganizationUnit::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(OrganizationUnit::class, 'parent_id');
    }

    public function members(): HasMany
    {
        return $this->hasMany(MemberProfile::class);
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(UserAssignment::class);
    }

    public function eventRegistrations(): HasMany
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function scopeKwarran($query)
    {
        return $query->where('type', 'kwarran');
    }

    public function scopeGudep($query)
    {
        return $query->where('type', 'gudep');
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
}
