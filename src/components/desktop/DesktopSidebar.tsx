import React from 'react';
import { TabId } from '../BottomNavBar';

interface PrimaryNavProps {
  navItems: Array<{ id: string; label: string; icon: any }>;
  activeTab: TabId;
  onSelectTab: (t: TabId) => void;
}

const PrimaryNavList: React.FC<PrimaryNavProps> = ({ navItems, activeTab, onSelectTab }) => (
  <div className="bg-white rounded-3xl border border-stone-200/90 p-3 shadow-xs space-y-1">
    <p className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-stone-400">Menu Utama</p>
    {navItems.map((item) => {
      const Icon = item.icon;
      const isActive = activeTab === item.id;
      return (
        <button
          key={item.id}
          onClick={() => onSelectTab(item.id as TabId)}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
            isActive ? 'bg-[#5D4037] text-white shadow-xs' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
          }`}
        >
          <Icon className="w-4 h-4 shrink-0" />
          <span>{item.label}</span>
        </button>
      );
    })}
  </div>
);

interface SecondaryNavProps {
  secondaryNavItems: Array<{ id: string; label: string; icon: any; modal?: string; badge?: number }>;
  onOpenModal: (id: string) => void;
}

const SecondaryNavList: React.FC<SecondaryNavProps> = ({ secondaryNavItems, onOpenModal }) => (
  <div className="bg-white rounded-3xl border border-stone-200/90 p-3 shadow-xs space-y-1">
    <p className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-stone-400">Modul & Layanan</p>
    {secondaryNavItems.map((item) => {
      const Icon = item.icon;
      return (
        <button
          key={item.id}
          onClick={() => item.modal && onOpenModal(item.modal)}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-all text-left"
        >
          <div className="flex items-center gap-2.5">
            <Icon className="w-3.5 h-3.5 text-stone-400" />
            <span>{item.label}</span>
          </div>
          {item.badge !== undefined && item.badge > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold">{item.badge}</span>
          )}
        </button>
      );
    })}
  </div>
);

export const DesktopSidebar: React.FC<{
  navItems: Array<{ id: string; label: string; icon: any }>;
  secondaryNavItems: Array<{ id: string; label: string; icon: any; modal?: string; badge?: number }>;
  activeTab: TabId;
  onSelectTab: (t: TabId) => void;
  onOpenModal: (id: string) => void;
}> = ({ navItems, secondaryNavItems, activeTab, onSelectTab, onOpenModal }) => {
  return (
    <aside className="w-64 shrink-0 hidden md:block space-y-6">
      <PrimaryNavList navItems={navItems} activeTab={activeTab} onSelectTab={onSelectTab} />
      <SecondaryNavList secondaryNavItems={secondaryNavItems} onOpenModal={onOpenModal} />
    </aside>
  );
};
