import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { SkuSubmissionFormBody } from './SkuSubmissionFormBody';

interface SkuSubmissionModalProps {
  submittingItem: { type: 'SKU' | 'SKK'; item: any };
  onClose(): void;
  onSubmit(note: string): void;
}

export const SkuSubmissionModal: React.FC<SkuSubmissionModalProps> = ({
  submittingItem,
  onClose,
  onSubmit
}) => {
  const [note, setNote] = useState('');

  const handleSend = () => {
    if (!note.trim()) return;
    onSubmit(note);
  };

  const title = submittingItem.type === 'SKU' ? `Butir #${submittingItem.item.nomor}` : submittingItem.item.nama;
  const description = submittingItem.type === 'SKU' ? submittingItem.item.deskripsi : submittingItem.item.nama;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 text-stone-900 space-y-3 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
              {submittingItem.type}
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Pengajuan Uji ke Pembina</h4>
              <p className="text-[10px] text-stone-500">{title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400"><X className="w-4 h-4" /></button>
        </div>

        <SkuSubmissionFormBody description={description} note={note} setNote={setNote} />

        <div className="pt-2 flex items-center gap-2">
          <button onClick={onClose} className="py-2.5 px-3 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold">
            Batal
          </button>
          <button
            onClick={handleSend}
            disabled={!note.trim()}
            className="flex-1 py-2.5 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Bukti Uji ke Pembina</span>
          </button>
        </div>
      </div>
    </div>
  );
};
