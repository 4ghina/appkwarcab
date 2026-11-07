import React from 'react';
import { BookOpen, X, AlertCircle } from 'lucide-react';
import { UserProfile, YouthGolongan } from '../../types/scout';
import { SkuCompletionNotice } from './SkuCompletionNotice';

interface SkuHeaderBannerProps {
  user: UserProfile;
  targetGolongan: YouthGolongan;
  targetTingkat: string;
  passedCount: number;
  totalCount: number;
  progressPercent: number;
  isAllPassed: boolean;
  onClose?(): void;
}

export const SkuHeaderBanner: React.FC<SkuHeaderBannerProps> = ({
  user,
  targetGolongan,
  targetTingkat,
  passedCount,
  totalCount,
  progressPercent,
  isAllPassed,
  onClose
}) => (
  <div className="space-y-4">
    <div className="p-4 rounded-3xl bg-gradient-to-br from-[#5D4037] via-[#4E342E] to-[#271612] text-white shadow-lg relative overflow-hidden">
      <div className="flex items-center justify-between pb-2 border-b border-white/15">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-400 text-stone-950 font-black"><BookOpen className="w-4 h-4" /></span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">Pencapaian Kecakapan Pramuka</h3>
            <p className="text-sm font-extrabold text-white">{user.youthTingkat || user.tingkatan} ({targetGolongan})</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
        )}
      </div>

      <div className="mt-3.5 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-white/90">Pencapaian Butir Syarat (SKU)</span>
          <span className="font-mono font-bold text-amber-300 text-sm">{passedCount} / {totalCount} Butir ({progressPercent}%)</span>
        </div>
        <div className="w-full h-3 bg-black/40 rounded-full p-0.5 border border-white/20 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 transition-all duration-700 shadow-sm" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="flex items-center justify-between text-[10px] text-white/70 pt-0.5">
          <span>Golongan {targetGolongan}</span>
          <span>{progressPercent >= 100 ? '🎉 Syarat SKU Lengkap!' : `Kurang ${totalCount - passedCount} butir lagi`}</span>
        </div>
      </div>
    </div>

    {user.ageAnomalyNotice && (
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-2.5 shadow-xs">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Peninjauan Kesesuaian Rentang Usia & Golongan</p>
          <p className="text-[11px] text-amber-900 leading-relaxed">{user.ageAnomalyNotice}</p>
        </div>
      </div>
    )}

    {isAllPassed && <SkuCompletionNotice targetGolongan={targetGolongan} targetTingkat={targetTingkat} />}
  </div>
);
