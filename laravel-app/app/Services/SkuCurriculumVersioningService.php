<?php

namespace App\Services;

use App\Models\SkuItem;
use App\Models\MemberSkuProgress;
use App\Models\User;

class SkuCurriculumVersioningService
{
    /**
     * Record a new assessment progress, pinning the current SKU curriculum version
     */
    public function recordAssessment(
        User $scout,
        SkuItem $skuItem,
        User $tester,
        ?string $notes = null
    ): MemberSkuProgress {
        return MemberSkuProgress::create([
            'user_id' => $scout->id,
            'sku_item_id' => $skuItem->id,
            'is_passed' => true,
            'tested_by_user_id' => $tester->id,
            'tester_name' => $tester->name,
            'tested_date' => now()->toDateString(),
            'notes' => $notes,
            'sku_version' => $skuItem->version,
            'is_sample' => false,
        ]);
    }

    /**
     * Publish a new SKU curriculum version
     */
    public function publishNewVersion(string $newVersion, array $items): int
    {
        $created = 0;
        foreach ($items as $item) {
            SkuItem::create([
                'golongan' => $item['golongan'],
                'tingkat' => $item['tingkat'],
                'nomor' => $item['nomor'],
                'kategori' => $item['kategori'] ?? 'Karakter & Spiritual',
                'deskripsi' => $item['deskripsi'],
                'version' => $newVersion,
                'is_active' => true,
                'is_sample' => false,
            ]);
            $created++;
        }
        return $created;
    }

    /**
     * Retrieve an assessment record and inspect its pinned curriculum version
     */
    public function getAssessmentWithVersion(int $progressId): ?array
    {
        $progress = MemberSkuProgress::with(['skuItem', 'user', 'tester'])->find($progressId);
        if (!$progress) {
            return null;
        }

        return [
            'progress_id' => $progress->id,
            'scout_name' => $progress->user?->name,
            'is_passed' => $progress->is_passed,
            'sku_version_at_assessment' => $progress->sku_version,
            'item_nomor' => $progress->skuItem?->nomor,
            'item_tingkat' => $progress->skuItem?->tingkat,
            'item_deskripsi' => $progress->skuItem?->deskripsi,
            'tested_date' => $progress->tested_date,
        ];
    }
}
