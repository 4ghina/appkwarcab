import React from 'react';

const STANDARDS = [
  { name: '1. Anggota', score: '100%' }, { name: '2. Pembina', score: '95%' },
  { name: '3. Kurikulum SKU', score: '92%' }, { name: '4. Sarpras', score: '90%' },
  { name: '5. Keuangan', score: '96%' }, { name: '6. Program Latihan', score: '94%' },
  { name: '7. Kemitraan Mabigus', score: '98%' }, { name: '8. Prestasi', score: '90%' },
];

export const GudepEightStandardsCard: React.FC = () => (
  <div className="p-3.5 bg-stone-50/60 rounded-2xl border border-stone-200 space-y-2">
    <h4 className="text-xs font-black text-stone-900 flex items-center justify-between">
      <span>Pemenuhan 8 Standar Akreditasi Gudep</span>
      <span className="text-[10px] text-emerald-800 font-bold">Skor: 94/100 (A Unggul)</span>
    </h4>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
      {STANDARDS.map((s) => (
        <div key={s.name} className="p-1.5 bg-white rounded-lg border border-stone-200 flex items-center justify-between">
          <span className="text-[10px] font-bold text-stone-800 truncate">{s.name}</span>
          <span className="font-mono font-bold text-[10px] text-emerald-700">{s.score}</span>
        </div>
      ))}
    </div>
  </div>
);
