import React from 'react';
import { Check, Clock, Send } from 'lucide-react';

interface SkuItemActionButtonsProps {
  item: any;
  isAuthorizedExaminer: boolean;
  onSubmittingItem(item: any): void;
  onExaminerDirectPass(item: any): void;
}

export const SkuItemActionButtons: React.FC<SkuItemActionButtonsProps> = ({
  item,
  isAuthorizedExaminer,
  onSubmittingItem,
  onExaminerDirectPass,
}) => (
  <div className="shrink-0 flex flex-col items-end gap-1">
    {item.isPassed ? (
      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
        <Check className="w-3 h-3" /> Lulus
      </span>
    ) : item.status === 'diajukan' ? (
      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900 flex items-center gap-0.5">
        <Clock className="w-3 h-3" /> Menunggu Uji
      </span>
    ) : (
      <button
        onClick={() => onSubmittingItem(item)}
        className="px-2.5 py-1 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-[10px] font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
      >
        <Send className="w-3 h-3" />
        <span>Ajukan Uji</span>
      </button>
    )}
    {isAuthorizedExaminer && (
      <button
        onClick={() => onExaminerDirectPass(item)}
        className="text-[9px] text-[#5D4037] hover:underline font-semibold mt-1"
      >
        {item.isPassed ? 'Batalkan Kelulusan' : 'Pengesahan Pembina Langsung'}
      </button>
    )}
  </div>
);
