import React from 'react';
import { TrendingUp, Users, Building2, ShieldCheck, BookOpen, GraduationCap, School } from 'lucide-react';
import { AnalyticsLevel, AnalyticsDomain } from '../ScoutAnalyticsDashboard';

export const AnalyticsLevelHeader: React.FC<{
  activeLevel: AnalyticsLevel;
  setActiveLevel: (lvl: AnalyticsLevel) => void;
}> = ({ activeLevel, setActiveLevel }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-stone-100">
    <div>
      <h2 className="text-xs font-black text-stone-900 uppercase tracking-tight flex items-center gap-1.5">
        <TrendingUp className="w-4 h-4 text-[#5D4037]" />
        Data Statistik & Grafik Capaian
      </h2>
      <p className="text-[10px] text-stone-500">Analitik pencapaian peserta didik, pembina, dan profil gugus depan.</p>
    </div>
    <div className="inline-flex p-1 bg-stone-100 rounded-2xl border border-stone-200 text-xs self-start sm:self-auto">
      <button onClick={() => setActiveLevel('pembina')} className={`px-2.5 py-1 rounded-xl font-bold text-[10px] flex items-center gap-1 ${activeLevel === 'pembina' ? 'bg-white text-[#5D4037] shadow-xs' : 'text-stone-600'}`}>
        <Users className="w-3 h-3" /><span>Pembina</span>
      </button>
      <button onClick={() => setActiveLevel('kwarran')} className={`px-2.5 py-1 rounded-xl font-bold text-[10px] flex items-center gap-1 ${activeLevel === 'kwarran' ? 'bg-white text-purple-900 shadow-xs' : 'text-stone-600'}`}>
        <Building2 className="w-3 h-3" /><span>Kwarran</span>
      </button>
      <button onClick={() => setActiveLevel('kwarcab')} className={`px-2.5 py-1 rounded-xl font-bold text-[10px] flex items-center gap-1 ${activeLevel === 'kwarcab' ? 'bg-white text-amber-900 shadow-xs' : 'text-stone-600'}`}>
        <ShieldCheck className="w-3 h-3" /><span>Kwarcab</span>
      </button>
    </div>
  </div>
);

export const AnalyticsDomainTabs: React.FC<{
  activeDomain: AnalyticsDomain;
  setActiveDomain: (d: AnalyticsDomain) => void;
}> = ({ activeDomain, setActiveDomain }) => (
  <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100/80 rounded-2xl border border-stone-200 text-xs">
    <button onClick={() => setActiveDomain('peserta_didik')} className={`py-1.5 px-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all ${activeDomain === 'peserta_didik' ? 'bg-white text-[#5D4037] shadow-xs' : 'text-stone-600'}`}>
      <BookOpen className="w-3.5 h-3.5" /><span>Peserta Didik</span>
    </button>
    <button onClick={() => setActiveDomain('pembina')} className={`py-1.5 px-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all ${activeDomain === 'pembina' ? 'bg-white text-[#5D4037] shadow-xs' : 'text-stone-600'}`}>
      <GraduationCap className="w-3.5 h-3.5" /><span>Pembina</span>
    </button>
    <button onClick={() => setActiveDomain('gudep')} className={`py-1.5 px-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all ${activeDomain === 'gudep' ? 'bg-white text-[#5D4037] shadow-xs' : 'text-stone-600'}`}>
      <School className="w-3.5 h-3.5" /><span>Gugus Depan</span>
    </button>
  </div>
);
