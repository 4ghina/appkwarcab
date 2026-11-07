import React from 'react';
import { SKKBadge } from '../../types/scout';

interface TkkDetailBodyProps {
  badge: SKKBadge;
}

export const TkkDetailBody: React.FC<TkkDetailBodyProps> = ({ badge }) => {
  return (
    <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-stone-500">Tingkat Lencana:</span>
        <span className="font-bold text-stone-900">{badge.tingkat}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-stone-500">Bidang Kecakapan:</span>
        <span className="font-semibold text-stone-900">{badge.bidang}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-stone-500">Tanggal Pengesahan:</span>
        <span className="font-bold text-emerald-700">{badge.earnedDate || 'Belum'}</span>
      </div>
      {badge.authorizedBy && (
        <div className="flex items-center justify-between">
          <span className="text-stone-500">Disahkan Oleh:</span>
          <span className="font-semibold text-stone-900 truncate max-w-[180px]">{badge.authorizedBy}</span>
        </div>
      )}
      {badge.certificateNumber && (
        <div className="flex items-center justify-between">
          <span className="text-stone-500">Nomor SK/Piagam:</span>
          <span className="font-mono text-stone-700">{badge.certificateNumber}</span>
        </div>
      )}
    </div>
  );
};
