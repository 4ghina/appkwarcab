import React, { useState } from 'react';
import { SKUItem, SKKBadge, SKKRequirement, UserProfile } from '../types/scout';
import { CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SkuHeaderBanner } from './sku/SkuHeaderBanner';
import { SkuTabsNav } from './sku/SkuTabsNav';
import { SkuTabRouter } from './sku/SkuTabRouter';
import { SkuSubmissionModal } from './sku/SkuSubmissionModal';
import { useSkuProgressData } from './sku/useSkuProgressData';
import { useSkuViewState } from './sku/useSkuViewState';

export const SKUProgressView: React.FC<{
  user: UserProfile;
  skuList: SKUItem[];
  skkBadges: SKKBadge[];
  skkCatalog?: SKKRequirement[];
  onUpdateSKU(id: string, isPassed: boolean, testedBy?: string, notes?: string): void;
  onSubmitSKUForTesting?(skuId: string, submissionNote: string): void;
  onSubmitSKKForApproval?(skkId: string, submissionNote: string): void;
  onClose?(): void;
}> = (p) => {
  const d = useSkuProgressData(p.user, p.skuList);
  const s = useSkuViewState(p.user, p.onUpdateSKU, p.onSubmitSKUForTesting, p.onSubmitSKKForApproval);

  return (
    <div className="w-full pb-20 animate-in fade-in duration-150 space-y-4">
      <SkuHeaderBanner
        user={p.user} targetGolongan={d.targetGolongan} targetTingkat={d.targetTingkat}
        passedCount={d.passedCount} totalCount={d.totalCount} progressPercent={d.progressPercent}
        isAllPassed={d.passedCount >= d.totalCount && d.totalCount > 0} onClose={p.onClose}
      />
      {s.toast && (
        <div className="p-3 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" /><span>{s.toast}</span>
        </div>
      )}
      <SkuTabsNav activeTab={s.activeTab} setActiveTab={s.setActiveTab} earnedTkkCount={p.skkBadges.filter(b => b.earnedDate).length} />
      <SkuTabRouter
        activeTab={s.activeTab} user={p.user} progressData={d} skkBadges={p.skkBadges}
        skkCatalog={p.skkCatalog} selectedReligion={s.selectedReligion} onSelectReligion={s.setSelectedReligion}
        isExaminer={s.isExaminer} onExaminerDirectPass={s.handleExaminerDirectPass} onSubmittingItem={s.setSubmittingItem}
      />
      {s.submittingItem && <SkuSubmissionModal submittingItem={s.submittingItem} onSubmit={s.handleModalSubmit} onClose={() => s.setSubmittingItem(null)} />}
    </div>
  );
};
