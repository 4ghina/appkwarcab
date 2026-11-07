import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { VerificationItem } from '../../types/scout';

interface RevisionModalProps {
  item: VerificationItem;
  revisionNote: string;
  onRevisionNoteChange: (n: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export const RevisionModal: React.FC<RevisionModalProps> = ({
  item,
  revisionNote,
  onRevisionNoteChange,
  onConfirm,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 text-stone-900 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div>
            <h4 className="text-xs font-bold text-stone-900">Kirim Catatan Perbaikan</h4>
            <p className="text-[10px] text-stone-500">{item.pengaju}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <label className="block text-[11px] font-bold text-stone-700">
            Instruksi / Butir Perbaikan:
          </label>
          <textarea
            rows={3}
            value={revisionNote}
            onChange={(e) => onRevisionNoteChange(e.target.value)}
            placeholder="Tuliskan catatan perbaikan atau dokumen yang kurang..."
            className="w-full p-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#5D4037]"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button onClick={onClose} className="py-2.5 px-3 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold">
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kirim Catatan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
