import React from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { VerificationItem } from '../../types/scout';

interface VerificationCardActionsProps {
  item: VerificationItem;
  onApprove(item: VerificationItem): void;
  onOpenRevision(item: VerificationItem): void;
}

export const VerificationCardActions: React.FC<VerificationCardActionsProps> = ({
  item,
  onApprove,
  onOpenRevision,
}) => {
  return (
    <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
      <button
        onClick={() => onApprove(item)}
        className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs cursor-pointer"
      >
        <Check className="w-3.5 h-3.5" /> Setujui
      </button>
      <button
        onClick={() => onOpenRevision(item)}
        className="py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5 text-rose-600" /> Revisi
      </button>
    </div>
  );
};
