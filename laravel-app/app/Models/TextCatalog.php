<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class TextCatalog extends Model
{
    protected $fillable = [
        'key',
        'category',
        'content_id',
        'content_en',
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

    public static function get(string $key, ?string $default = null): string
    {
        $locale = app()->getLocale();
        return Cache::rememberForever("ui_text_{$locale}_{$key}", function () use ($key, $locale, $default) {
            $item = static::where('key', $key)->where('is_draft', false)->first();
            if (!$item) return $default ?? $key;
            return $locale === 'en' && !empty($item->content_en) ? $item->content_en : $item->content_id;
        });
    }

    public static function set(string $key, string $contentId, ?string $contentEn = null, string $category = 'ui'): void
    {
        static::updateOrCreate(
            ['key' => $key],
            [
                'content_id' => $contentId,
                'content_en' => $contentEn,
                'category' => $category,
                'is_draft' => false,
                'published_at' => now(),
            ]
        );
        Cache::forget("ui_text_id_{$key}");
        Cache::forget("ui_text_en_{$key}");
    }

    public static function publishAllDrafts(): int
    {
        $drafts = static::where('is_draft', true)->get();
        foreach ($drafts as $draft) {
            $draft->update([
                'is_draft' => false,
                'published_at' => now(),
            ]);
            Cache::forget("ui_text_id_{$draft->key}");
            Cache::forget("ui_text_en_{$draft->key}");
        }
        return $drafts->count();
    }
}
