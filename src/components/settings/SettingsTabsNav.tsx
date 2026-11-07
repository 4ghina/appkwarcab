import React from 'react';
import { Building, Image as ImageIcon, Type, Calendar, Palette, History, Database, CreditCard } from 'lucide-react';

export type TabType = 'identitas' | 'desain-kartu' | 'media' | 'teks' | 'aturan' | 'tema' | 'riwayat' | 'demo';

export const tabs = [
  { id: 'identitas', label: 'Identitas', icon: Building },
  { id: 'desain-kartu', label: 'Desain Kartu', icon: CreditCard },
  { id: 'media', label: 'Aset Media', icon: ImageIcon },
  { id: 'teks', label: 'Katalog Teks', icon: Type },
  { id: 'aturan', label: 'Aturan Kegiatan', icon: Calendar },
  { id: 'tema', label: 'Tema & Warna', icon: Palette },
  { id: 'riwayat', label: 'Riwayat Versi', icon: History },
  { id: 'demo', label: 'Data Contoh', icon: Database },
] as const;


export const SettingsTabsNav: React.FC<{
  activeTab: TabType;
  setActiveTab: (t: TabType) => void;
}> = ({ activeTab, setActiveTab }) => (
  <div className="flex bg-stone-100 p-1 rounded-2xl gap-1 overflow-x-auto no-scrollbar border border-stone-200">
    {tabs.map((tab) => {
      const Icon = tab.icon;
      const isActive = activeTab === tab.id;
      return (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as TabType)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            isActive ? 'bg-[#5D4037] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
          <span>{tab.label}</span>
        </button>
      );
    })}
  </div>
);
