<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MemberSkuProgress extends Model
{
    protected $table = 'member_sku_progress';

    protected $fillable = [
        'user_id',
        'sku_item_id',
        'is_passed',
        'tested_by_user_id',
        'tester_name',
        'tested_date',
        'notes',
        'sku_version',
        'is_sample',
    ];

    protected $casts = [
        'is_passed' => 'boolean',
        'tested_date' => 'date',
        'is_sample' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function skuItem(): BelongsTo
    {
        return $this->belongsTo(SkuItem::class);
    }

    public function tester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tested_by_user_id');
    }

    public function scopeVersion($query, string $version = '2026')
    {
        return $query->where('sku_version', $version);
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
