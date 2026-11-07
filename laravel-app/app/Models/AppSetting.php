<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class AppSetting extends Model
{
    protected $fillable = [
        'group',
        'key',
        'value',
        'type',
        'description',
        'is_draft',
        'published_at',
    ];

    protected $casts = [
        'is_draft' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_draft', false);
    }

    public static function get(string $key, $default = null)
    {
        return Cache::rememberForever("app_setting_{$key}", function () use ($key, $default) {
            $setting = static::where('key', $key)->where('is_draft', false)->first();
            if (!$setting) return $default;
            return static::castValue($setting->value, $setting->type);
        });
    }

    public static function set(string $key, $value, string $group = 'general', string $type = 'string'): void
    {
        $serialized = static::serializeValue($value, $type);

        static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $serialized,
                'group' => $group,
                'type' => $type,
                'is_draft' => false,
                'published_at' => now(),
            ]
        );

        Cache::forget("app_setting_{$key}");
    }

    public static function saveDraft(string $key, $value, string $group = 'general', string $type = 'string'): void
    {
        $serialized = static::serializeValue($value, $type);

        static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $serialized,
                'group' => $group,
                'type' => $type,
                'is_draft' => true,
            ]
        );
    }

    public static function publishAllDrafts(): int
    {
        $drafts = static::where('is_draft', true)->get();
        foreach ($drafts as $draft) {
            $draft->update([
                'is_draft' => false,
                'published_at' => now(),
            ]);
            Cache::forget("app_setting_{$draft->key}");
        }
        return $drafts->count();
    }

    private static function castValue(?string $val, string $type)
    {
        return match ($type) {
            'json' => json_decode($val, true),
            'boolean' => filter_var($val, FILTER_VALIDATE_BOOLEAN),
            'integer' => (int) $val,
            default => $val,
        };
    }

    private static function serializeValue($value, string $type): string
    {
        return match ($type) {
            'json' => is_array($value) ? json_encode($value) : (string) $value,
            'boolean' => $value ? '1' : '0',
            default => (string) $value,
        };
    }
}
