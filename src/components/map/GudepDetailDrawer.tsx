import React from 'react';
import { MapGudepEntity } from './mapTypes';
import { GudepDrawerHeader } from './drawer/GudepDrawerHeader';
import { GudepDrawerBody } from './drawer/GudepDrawerBody';
import { Edit3, Trash2 } from 'lucide-react';

interface GudepDetailDrawerProps {
  gudep: MapGudepEntity;
  canEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const GudepDetailDrawer: React.FC<GudepDetailDrawerProps> = ({
  gudep,
  canEdit,
  onEdit,
  onDelete,
  onClose,
}) => {
  return (
    <div className="p-4 sm:p-5 bg-white rounded-3xl border border-stone-200/90 shadow-lg space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <GudepDrawerHeader gudep={gudep} onClose={onClose} />
      <GudepDrawerBody gudep={gudep} />
      {canEdit && (
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
          <button
            onClick={onDelete}
            className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus</span>
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Koordinat & Data Gudep</span>
          </button>
        </div>
      )}
    </div>
  );
};
