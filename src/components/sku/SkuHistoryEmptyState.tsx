import React from 'react';
import { BookOpen } from 'lucide-react';
import { YouthGolongan } from '../../types/scout';

interface SkuHistoryEmptyStateProps {
  targetGolongan: YouthGolongan;
  targetTingkat: string;
}

export const SkuHistoryEmptyState: React.FC<SkuHistoryEmptyStateProps> = ({ targetGolongan, targetTingkat }) => {
  return (
    <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-stone-200 space-y-2">
      <div className="w-10 h-10 mx-auto rounded-full bg-stone-100 text-stone-400 flex items-center justify-center">
        <BookOpen className="w-5 h-5" />
      </div>
      <p className="text-xs font-bold text-stone-800">Belum Ada Riwayat Tingkat Sebelumnya</p>
      <p className="text-[11px] text-stone-500 max-w-xs mx-auto">
        Anda saat ini sedang menempuh jenjang perdana pada golongan {targetGolongan}: <strong>{targetTingkat}</strong>.
      </p>
    </div>
  );
};
