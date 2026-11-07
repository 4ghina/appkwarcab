import React from 'react';
import { VerificationItem } from '../../types/scout';
import { VerificationCardActions } from './VerificationCardActions';

interface VerificationCardProps {
  item: VerificationItem;
  onApprove(item: VerificationItem): void;
  onOpenRevision(item: VerificationItem): void;
}

const CardHeader: React.FC<{ item: VerificationItem; isSample: boolean }> = ({ item, isSample }) => (
  <div className="flex items-start justify-between gap-3">
    <div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 uppercase">
          {item.jenis}
        </span>
        {isSample && (
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
            Data Contoh
          </span>
        )}
      </div>
      <h4 className="text-xs font-bold text-stone-900 mt-1">{item.pengaju}</h4>
      <p className="text-[10px] text-stone-500">{item.gudepName} • Diajukan: {item.tanggal}</p>
    </div>
    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
      item.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' :
      item.status === 'Direvisi' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-900'
    }`}>
      {item.status}
    </span>
  </div>
);

export const VerificationCard: React.FC<VerificationCardProps> = ({
  item,
  onApprove,
  onOpenRevision
}) => {
  const isSample = (item as any).isSample ?? true;

  return (
    <div className={`p-4 bg-white rounded-3xl border transition-all space-y-3 shadow-xs ${
      item.status === 'Disetujui' ? 'border-emerald-300 bg-emerald-50/20' :
      item.status === 'Direvisi' ? 'border-rose-300 bg-rose-50/20' : 'border-stone-200'
    }`}>
      <CardHeader item={item} isSample={isSample} />

      {item.catatan && (
        <p className="text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
          {item.catatan}
        </p>
      )}

      {item.status === 'Pending' && (
        <VerificationCardActions
          item={item}
          onApprove={onApprove}
          onOpenRevision={onOpenRevision}
        />
      )}
    </div>
  );
};
