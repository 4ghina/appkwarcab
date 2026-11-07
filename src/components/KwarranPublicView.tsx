import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { GudepData } from '../types/scout';
import { KwarranBanner } from './public/kwarran/KwarranBanner';
import { KwarranGudepList } from './public/kwarran/KwarranGudepList';

interface KwarranPublicViewProps {
  kwarranName: string;
  gudepList: GudepData[];
  onBack: () => void;
  onSelectGudep: (gudep: GudepData) => void;
}

export const KwarranPublicView: React.FC<KwarranPublicViewProps> = (p) => {
  const matchingGudep = p.gudepList.filter(g => g.kwarran.toLowerCase().includes(p.kwarranName.toLowerCase()));
  const totalStudents = matchingGudep.reduce((sum, g) => sum + Object.values(g.jumlahAnggota || {}).reduce((a, b) => a + b, 0), 0);

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen text-[#2D2421] p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <button onClick={p.onBack} className="flex items-center gap-2 text-xs font-bold text-[#5D4037] hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Website Utama</span>
      </button>
      <KwarranBanner kwarranName={p.kwarranName} totalGudep={matchingGudep.length} totalStudents={totalStudents} />
      <KwarranGudepList kwarranName={p.kwarranName} matchingGudep={matchingGudep} onSelectGudep={p.onSelectGudep} />
    </div>
  );
};
