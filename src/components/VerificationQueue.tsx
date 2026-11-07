import React from 'react';
import { VerificationItem, UserProfile } from '../types/scout';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { VerificationCard } from './verification/VerificationCard';
import { RevisionModal } from './verification/RevisionModal';
import { FILTERS, useVerificationQueueState } from './verification/useVerificationQueueState';

const QueueHeader: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div className="p-4 rounded-3xl bg-gradient-to-br from-[#5D4037] via-[#3E2723] to-[#271612] text-white shadow-lg relative overflow-hidden">
    <div className="flex items-center justify-between pb-2 border-b border-white/20">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-xl bg-amber-400 text-stone-950 font-black"><ShieldCheck className="w-4 h-4" /></span>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">Verifikasi Berjenjang & Otoritas</h3>
          <p className="text-sm font-extrabold text-white">Persetujuan Keanggotaan, Gudep & KTA</p>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
      )}
    </div>
  </div>
);

export const VerificationQueue: React.FC<{
  user: UserProfile;
  queue: VerificationItem[];
  onApprove: (id: string) => void;
  onRevise: (id: string, reason: string) => void;
  onClose?: () => void;
}> = (p) => {
  const s = useVerificationQueueState(p.queue, p.onApprove, p.onRevise);

  return (
    <div className="w-full pb-20 animate-in fade-in duration-150 space-y-4">
      <QueueHeader onClose={p.onClose} />
      {s.toastMessage && (
        <div className="p-3 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" /><span>{s.toastMessage}</span>
        </div>
      )}
      <div className="flex bg-stone-200/70 p-1 rounded-2xl text-[11px] font-bold text-stone-600 gap-1 overflow-x-auto no-scrollbar">
        {FILTERS.map(f => (
          <button key={f} onClick={() => s.setSelectedFilter(f)} className={`flex-1 py-1.5 px-3 rounded-xl transition-all ${s.selectedFilter === f ? 'bg-white text-[#5D4037] shadow-xs' : ''}`}>{f}</button>
        ))}
      </div>
      <div className="space-y-3">
        {s.filteredItems.map(item => <VerificationCard key={item.id} item={item} onApprove={s.handleApproveItem} onOpenRevision={s.setSelectedForRevision} />)}
      </div>
      {s.selectedForRevision && <RevisionModal item={s.selectedForRevision} revisionNote={s.revisionNote} onRevisionNoteChange={s.setRevisionNote} onConfirm={s.handleConfirmRevision} onClose={() => s.setSelectedForRevision(null)} />}
    </div>
  );
};
