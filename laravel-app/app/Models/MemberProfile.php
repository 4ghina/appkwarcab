<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MemberProfile extends Model
{
    protected $fillable = [
        'user_id',
        'organization_unit_id',
        'parent_user_id',
        'nta',
        'provisional_nta',
        'golongan',
        'tingkatan',
        'birth_date',
        'gender',
        'blood_type',
        'address',
        'avatar_path',
        'membership_status',
        'is_garuda',
        'garuda_year',
        'garuda_sk_number',
        'valid_until',
        'notes',
        'is_sample',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'valid_until' => 'date',
        'is_garuda' => 'boolean',
        'garuda_year' => 'integer',
        'is_sample' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function organizationUnit(): BelongsTo
    {
        return $this->belongsTo(OrganizationUnit::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_user_id');
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

    public function getGolonganColorAttribute(): string
    {
        return match ($this->golongan) {
            'Siaga' => '#16A34A',
            'Penggalang' => '#DC2626',
            'Penegak' => '#D97706',
            'Pandega' => '#78350F',
            'Pembina', 'Pelatih' => '#451A03',
            default => '#4B5563',
        };
    }

    public function toPublicVerificationArray(): array
    {
        return [
            'nta' => $this->nta ?? 'Belum Terbit',
            'name' => $this->user->name ?? 'Anggota Pramuka',
            'golongan' => $this->golongan,
            'tingkatan' => $this->tingkatan,
            'pangkalan' => $this->organizationUnit->name ?? 'Kwartir Cabang',
            'kwarran' => $this->organizationUnit->parent->name ?? 'Kwarcab',
            'status' => $this->membership_status === 'verified' ? 'Anggota Sah Terverifikasi' : 'Dalam Proses Verifikasi',
            'is_garuda' => $this->is_garuda,
            'valid_until' => $this->valid_until ? $this->valid_until->format('d M Y') : 'Aktif',
            'is_sample' => $this->is_sample,
        ];
    }
}
