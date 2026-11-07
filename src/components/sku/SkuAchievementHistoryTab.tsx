import React from 'react';
import { ShieldCheck, BookOpen, Info } from 'lucide-react';
import { UserProfile, YouthGolongan } from '../../types/scout';
import { SkuHistoryRecordCard } from './SkuHistoryRecordCard';
import { SkuHistoryEmptyState } from './SkuHistoryEmptyState';

interface SkuAchievementHistoryTabProps {
  user: UserProfile;
  targetGolongan: YouthGolongan;
  targetTingkat: string;
}

export const SkuAchievementHistoryTab: React.FC<SkuAchievementHistoryTabProps> = ({
  user,
  targetGolongan,
  targetTingkat
}) => {
  const history = user.achievementHistory || [];

  return (
    <div className="space-y-3">
      <div className="p-3.5 bg-gradient-to-r from-stone-900 to-[#5D4037] text-white rounded-2xl shadow-xs space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Riwayat Pencapaian Tingkat Resmi
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/15 text-white font-mono text-[9px] font-bold">
            {history.length} Tingkat Disahkan
          </span>
        </div>
        <p className="text-[11px] text-stone-200 leading-relaxed">
          Arsip resmi jenjang kecakapan kepramukaan yang telah disahkan dan dilantik melalui SK.
        </p>
      </div>

      {history.length > 0 ? (
        <div className="space-y-2.5">
          {history.map((rec) => <SkuHistoryRecordCard key={rec.id} rec={rec} />)}
        </div>
      ) : (
        <SkuHistoryEmptyState targetGolongan={targetGolongan} targetTingkat={targetTingkat} />
      )}

      <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 text-[10px] text-amber-950 space-y-1">
        <span className="font-bold flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          Aturan Perpindahan Jenjang:
        </span>
        <p className="leading-relaxed text-stone-700">
          Sesuai SK Kwarnas No. 198 Tahun 2011, peserta didik hanya dapat menempuh satu tingkatan pada satu waktu.
        </p>
      </div>
    </div>
  );
};
