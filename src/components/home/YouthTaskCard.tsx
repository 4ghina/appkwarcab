import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

interface YouthTaskCardProps {
  youthGolongan: string;
  tingkat: string;
  passedCount: number;
  totalCount: number;
  percent: number;
  onOpenSKU(): void;
}

export const YouthTaskCard: React.FC<YouthTaskCardProps> = ({
  youthGolongan,
  tingkat,
  passedCount,
  totalCount,
  percent,
  onOpenSKU,
}) => {
  return (
    <div
      onClick={onOpenSKU}
      className="p-4 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 cursor-pointer transition-all space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-stone-900">
              Pemenuhan Syarat SKU ({youthGolongan})
            </h3>
            <p className="text-[10px] text-stone-500">Tingkat: {tingkat}</p>
          </div>
        </div>
        <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
          {passedCount} / {totalCount} ({percent}%)
        </span>
      </div>

      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-stone-500 pt-0.5">
        <span>{percent >= 100 ? '🎉 Syarat terpenuhi, siap dilantik!' : `Tersisa ${totalCount - passedCount} butir`}</span>
        <span className="text-[#5D4037] font-bold flex items-center gap-0.5">
          Lanjutkan <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
