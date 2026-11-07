<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'password',
        'phone',
        'is_sample',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_sample' => 'boolean',
        ];
    }

    public function profile(): HasOne
    {
        return $this->hasOne(MemberProfile::class);
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(UserAssignment::class);
    }

    public function activeAssignment()
    {
        return $this->assignments()->where('status', 'active')->where('is_primary', true)->first()
            ?: $this->assignments()->where('status', 'active')->first();
    }

    public function wards(): HasMany
    {
        return $this->hasMany(MemberProfile::class, 'parent_user_id');
    }

    public function applications(): HasMany
    {
        return $this->hasMany(MembershipApplication::class);
    }

    public function scopeReal($query)
    {
        return $query->where('is_sample', false);
    }

    public function scopeSample($query)
    {
        return $query->where('is_sample', true);
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->assignments()
            ->where('status', 'active')
            ->whereIn('level', ['Gudep', 'Kwarran', 'Kwarcab', 'Pusdiklatcab'])
            ->where(function ($q) {
                $q->where('role_type', 'like', '%Admin%')
                  ->orWhere('role_type', 'like', '%Pembina%')
                  ->orWhere('role_type', 'like', '%Andalan%')
                  ->orWhere('role_type', 'like', '%Pengurus%');
            })
            ->exists();
    }
}
