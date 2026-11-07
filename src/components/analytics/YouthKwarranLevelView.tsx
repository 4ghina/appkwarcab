import React from 'react';

interface YouthKwarranLevelViewProps {
  kwarranData: { name: string; studentsCount: number };
}

export const YouthKwarranLevelView: React.FC<YouthKwarranLevelViewProps> = ({ kwarranData }) => {
  const youthByGolongan = [
    { label: 'Siaga (7-10 Th)', count: Math.round(kwarranData.studentsCount * 0.38), pct: 38, color: 'bg-emerald-500' },
    { label: 'Penggalang (11-15 Th)', count: Math.round(kwarranData.studentsCount * 0.34), pct: 34, color: 'bg-rose-500' },
    { label: 'Penegak (16-20 Th)', count: Math.round(kwarranData.studentsCount * 0.22), pct: 22, color: 'bg-amber-500' },
    { label: 'Pandega (21-25 Th)', count: Math.round(kwarranData.studentsCount * 0.06), pct: 6, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-3">
      <div className="p-3.5 bg-stone-50/60 rounded-2xl border border-stone-200 space-y-2.5">
        <h4 className="text-xs font-black text-stone-900 flex items-center justify-between">
          <span>Distribusi Golongan Anggota Muda ({kwarranData.name})</span>
          <span className="text-[10px] text-stone-500 font-mono">
            Total {kwarranData.studentsCount.toLocaleString('id-ID')} Siswa
          </span>
        </h4>
        <div className="space-y-2">
          {youthByGolongan.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-stone-800">{item.label}</span>
                <span className="font-mono font-bold text-stone-700">
                  {item.count.toLocaleString('id-ID')} ({item.pct}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
