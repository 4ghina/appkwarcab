import React from 'react';
import { Award } from 'lucide-react';
import { SKKBadge } from '../../types/scout';

interface TkkBadgeCardProps {
  badge: SKKBadge;
  onSelect(badge: SKKBadge): void;
}

export const TkkBadgeCard: React.FC<TkkBadgeCardProps> = ({ badge, onSelect }) => {
  const isEarned = Boolean(badge.earnedDate);

  return (
    <div
      onClick={() => onSelect(badge)}
      className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between transition-all cursor-pointer ${
        isEarned
          ? 'bg-white border-amber-300 shadow-xs hover:border-[#5D4037]'
          : 'bg-stone-50 border-stone-200 opacity-60'
      }`}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-2 shadow-sm"
        style={{ backgroundColor: badge.color }}
      >
        <Award className="w-6 h-6" />
      </div>

      <div>
        <h5 className="text-xs font-bold text-stone-900 leading-tight">
          TKK {badge.nama}
        </h5>
        <span className="text-[9px] font-semibold text-stone-500 block mt-0.5">
          Tingkat {badge.tingkat}
        </span>
        <span className="text-[8px] font-bold text-emerald-700 block mt-1">
          {isEarned ? `Disahkan: ${badge.earnedDate}` : 'Belum Diperoleh'}
        </span>
      </div>
    </div>
  );
};
