import React from 'react';
import { Award, X } from 'lucide-react';
import { SKKBadge } from '../../types/scout';
import { TkkDetailBody } from './TkkDetailBody';

interface TkkDetailModalProps {
  badge: SKKBadge;
  onClose(): void;
}

export const TkkDetailModal: React.FC<TkkDetailModalProps> = ({ badge, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 text-stone-900 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: badge.color }}>
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Tanda Kecakapan Khusus</h4>
              <p className="text-[10px] text-stone-500">TKK {badge.nama}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <TkkDetailBody badge={badge} />

        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold cursor-pointer hover:bg-stone-200 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
