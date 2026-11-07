import React from 'react';

export const SkuHistoryRecordCard: React.FC<{ rec: any }> = ({ rec }) => (
  <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-950 flex items-center justify-center font-black text-sm">✓</div>
        <div>
          <h4 className="text-xs font-bold text-stone-900">{rec.golongan} {rec.tingkat}</h4>
          <p className="text-[10px] text-stone-500">{rec.gudepName} • Penguji: {rec.examinerName}</p>
        </div>
      </div>
      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold shrink-0">
        Disahkan & Dilantik
      </span>
    </div>
    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100 text-[10px]">
      <div>
        <span className="text-stone-400 block text-[9px]">Tanggal Pengesahan:</span>
        <span className="font-semibold text-stone-700">{rec.passedDate}</span>
      </div>
      <div>
        <span className="text-stone-400 block text-[9px]">Nomor SK Pelantikan:</span>
        <span className="font-mono font-semibold text-stone-800">{rec.decreeNumber || 'Tercatat di Buku Induk Gudep'}</span>
      </div>
    </div>
    {rec.notes && <p className="text-[10px] text-stone-600 bg-stone-50 p-2 rounded-xl italic">"{rec.notes}"</p>}
  </div>
);
