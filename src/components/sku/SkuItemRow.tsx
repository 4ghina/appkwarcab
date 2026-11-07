import React from 'react';
import { ReligiousBranchSelector, ReligionChoice } from './ReligiousBranchSelector';
import { SkuItemActionButtons } from './SkuItemActionButtons';

interface SkuItemRowProps {
  item: any;
  selectedReligion: ReligionChoice;
  onSelectReligion(rel: ReligionChoice): void;
  isAuthorizedExaminer: boolean;
  onSubmittingItem(item: any): void;
  onExaminerDirectPass(item: any): void;
}

export const SkuItemRow: React.FC<SkuItemRowProps> = ({
  item,
  selectedReligion,
  onSelectReligion,
  isAuthorizedExaminer,
  onSubmittingItem,
  onExaminerDirectPass
}) => {
  const badgeClass = item.isPassed ? 'bg-emerald-600 text-white' : item.status === 'diajukan' ? 'bg-amber-500 text-white' : item.status === 'perlu_revisi' ? 'bg-rose-500 text-white' : 'bg-stone-100 text-stone-600 border border-stone-300';
  const containerClass = item.isPassed ? 'bg-emerald-50/50 border-emerald-300' : item.status === 'diajukan' ? 'bg-amber-50/50 border-amber-300' : item.status === 'perlu_revisi' ? 'bg-rose-50/50 border-rose-300' : 'bg-white border-stone-200/90';

  return (
    <div className={`p-3.5 rounded-2xl border transition-all ${containerClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${badgeClass}`}>
            {item.nomor}
          </span>
          <div className="space-y-1 min-w-0">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-stone-500 block">{item.kategori}</span>
            <p className="text-xs font-bold text-stone-900 leading-relaxed">{item.deskripsi}</p>
            {item.nomor === 1 && (
              <ReligiousBranchSelector selectedReligion={selectedReligion} onSelectReligion={onSelectReligion} />
            )}
            {item.catatan && (
              <p className="text-[10px] text-stone-600 italic bg-white/70 p-1.5 rounded-lg border border-stone-200/60">
                Catatan: {item.catatan}
              </p>
            )}
            {item.testedBy && item.isPassed && (
              <p className="text-[9px] font-semibold text-emerald-800">
                ✓ Diuji oleh: {item.testedBy} ({item.testedDate || 'Terverifikasi'})
              </p>
            )}
          </div>
        </div>
        <SkuItemActionButtons
          item={item}
          isAuthorizedExaminer={isAuthorizedExaminer}
          onSubmittingItem={onSubmittingItem}
          onExaminerDirectPass={onExaminerDirectPass}
        />
      </div>
    </div>
  );
};
