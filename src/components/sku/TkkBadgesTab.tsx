import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { SKKBadge } from '../../types/scout';
import { TkkBadgeCard } from './TkkBadgeCard';
import { TkkDetailModal } from './TkkDetailModal';

interface TkkBadgesTabProps {
  skkBadges: SKKBadge[];
}

export const TkkBadgesTab: React.FC<TkkBadgesTabProps> = ({ skkBadges }) => {
  const [selectedTKK, setSelectedTKK] = useState<SKKBadge | null>(null);
  const earnedCount = skkBadges.filter(b => b.earnedDate).length;

  return (
    <div className="space-y-3">
      <div className="p-3 bg-white rounded-2xl border border-stone-200 text-xs flex items-center justify-between">
        <div>
          <h4 className="font-bold text-stone-900">Koleksi TKK yang Telah Disahkan</h4>
          <p className="text-[10px] text-stone-500">Lencana resmi setelah pemenuhan SKK</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs">
          {earnedCount} TKK Sah
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {skkBadges.map((badge) => (
          <TkkBadgeCard key={badge.id} badge={badge} onSelect={setSelectedTKK} />
        ))}
      </div>

      {selectedTKK && (
        <TkkDetailModal badge={selectedTKK} onClose={() => setSelectedTKK(null)} />
      )}
    </div>
  );
};
