import React from 'react';
import { BookOpen, Compass, Award, FileText } from 'lucide-react';

export const SkuTabsNav: React.FC<{
  activeTab: 'sku' | 'skk' | 'tkk' | 'riwayat';
  setActiveTab: (t: 'sku' | 'skk' | 'tkk' | 'riwayat') => void;
  earnedTkkCount: number;
}> = ({ activeTab, setActiveTab, earnedTkkCount }) => (
  <div className="flex bg-stone-100 p-1 rounded-2xl gap-1 text-xs font-bold border border-stone-200">
    <button onClick={() => setActiveTab('sku')} className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${activeTab === 'sku' ? 'bg-[#5D4037] text-white shadow-xs' : 'text-stone-600'}`}>
      <BookOpen className="w-3.5 h-3.5" /><span>Butir SKU</span>
    </button>
    <button onClick={() => setActiveTab('skk')} className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${activeTab === 'skk' ? 'bg-[#5D4037] text-white shadow-xs' : 'text-stone-600'}`}>
      <Compass className="w-3.5 h-3.5" /><span>Katalog TKK</span>
    </button>
    <button onClick={() => setActiveTab('tkk')} className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${activeTab === 'tkk' ? 'bg-[#5D4037] text-white shadow-xs' : 'text-stone-600'}`}>
      <Award className="w-3.5 h-3.5" /><span>Lencana ({earnedTkkCount})</span>
    </button>
    <button onClick={() => setActiveTab('riwayat')} className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${activeTab === 'riwayat' ? 'bg-[#5D4037] text-white shadow-xs' : 'text-stone-600'}`}>
      <FileText className="w-3.5 h-3.5" /><span>Riwayat</span>
    </button>
  </div>
);
