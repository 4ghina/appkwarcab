import React from 'react';

interface PembinaKwarranViewProps {
  kwarranData: { name: string; pembinaCount: number };
}

export const PembinaKwarranView: React.FC<PembinaKwarranViewProps> = ({ kwarranData }) => {
  const pembinaQualifications = [
    { label: 'Kursus Mahir Dasar (KMD)', count: Math.round(kwarranData.pembinaCount * 0.58), pct: 58, color: 'bg-emerald-600' },
    { label: 'Kursus Mahir Lanjutan (KML)', count: Math.round(kwarranData.pembinaCount * 0.28), pct: 28, color: 'bg-amber-600' },
    { label: 'Pelatih Pembina (KPD / KPL)', count: Math.round(kwarranData.pembinaCount * 0.05), pct: 5, color: 'bg-purple-600' },
    { label: 'Belum Mengikuti Kursus', count: Math.round(kwarranData.pembinaCount * 0.09), pct: 9, color: 'bg-stone-400' },
  ];

  return (
    <div className="p-3.5 bg-stone-50/60 rounded-2xl border border-stone-200 space-y-2.5">
      <h4 className="text-xs font-black text-stone-900 flex items-center justify-between">
        <span>Kualifikasi Pembina di Kwarran {kwarranData.name}</span>
        <span className="text-[10px] text-stone-500 font-mono">Total {kwarranData.pembinaCount} Pembina</span>
      </h4>
      <div className="space-y-2">
        {pembinaQualifications.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-stone-800">{item.label}</span>
              <span className="font-mono font-bold text-stone-700">
                {item.count} Orang ({item.pct}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
