import React from 'react';
import { Home, MapPin, Award, Calendar, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export type TabId = 'beranda' | 'peta' | 'garuda' | 'kegiatan' | 'profil';

interface TabItem {
  id: TabId;
  label: string;
  icon: any;
  badge?: boolean;
}

const NavBarTabButton: React.FC<{
  tab: TabItem;
  isActive: boolean;
  onSelect: (id: TabId) => void;
}> = ({ tab, isActive, onSelect }) => {
  const Icon = tab.icon;
  return (
    <button
      onClick={() => onSelect(tab.id)}
      className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[46px] rounded-2xl transition-all active:scale-95 ${
        isActive ? 'text-[#5D4037] font-bold' : 'text-stone-400 hover:text-stone-600 font-medium'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="relative">
        <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
        {tab.badge && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
      </div>
      <span className={`text-[10px] tracking-tight mt-0.5 leading-none ${isActive ? 'text-[#5D4037]' : 'text-stone-500'}`}>
        {tab.label}
      </span>
      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#5D4037] mt-0.5" />}
    </button>
  );
};

export const BottomNavBar: React.FC<{
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  hasGarudaActive?: boolean;
}> = ({ activeTab, onTabChange, hasGarudaActive = false }) => {
  const { t } = useApp();
  const tabs: TabItem[] = [
    { id: 'beranda', label: t('nav.home', 'Beranda'), icon: Home },
    { id: 'peta', label: t('nav.map', 'Peta Gudep'), icon: MapPin },
    { id: 'garuda', label: t('nav.garuda', 'E-Garuda'), icon: Award, badge: hasGarudaActive },
    { id: 'kegiatan', label: t('nav.events', 'Kegiatan'), icon: Calendar },
    { id: 'profil', label: t('nav.profile', 'Profil/KTA'), icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-[480px] mx-auto px-3 pb-3 pt-1 pointer-events-none">
      <nav className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-3xl border border-stone-200/90 shadow-xl px-2 py-1.5 flex items-center justify-around" role="navigation" aria-label="Navigasi Utama">
        {tabs.map((tab) => (
          <NavBarTabButton key={tab.id} tab={tab} isActive={activeTab === tab.id} onSelect={onTabChange} />
        ))}
      </nav>
    </div>
  );
};
