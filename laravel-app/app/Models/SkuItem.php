<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SkuItem extends Model
{
    protected $fillable = [
        'sku_category_id',
        'nomor',
        'golongan',
        'tingkat',
        'kategori',
        'deskripsi',
        'version',
        'is_active',
        'is_sample',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_sample' => 'boolean',
    ];

    public function progress(): HasMany
    {
        return $this->hasMany(MemberSkuProgress::class);
    }

    public function scopeVersion($query, string $version = '2026')
    {
        return $query->where('version', $version);
    }

    public function scopeReal($query)
    {
        return $query->where('is_sample', false);
    }

    public function scopeSample($query)
    {
        return $query->where('is_sample', true);
    }
}
