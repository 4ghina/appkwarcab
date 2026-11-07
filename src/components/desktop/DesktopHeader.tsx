import React from 'react';
import { Smartphone, Monitor, Globe } from 'lucide-react';
import { ScoutRole, UserProfile } from '../../types/scout';
import { DynamicAssetImage } from '../DynamicAssetImage';

import { ViewportMode } from '../../context/appContextTypes';

const DesktopBrand: React.FC<{ config: any }> = ({ config }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-[#5D4037] flex items-center justify-center p-1.5 shadow-xs">
      <DynamicAssetImage src={config?.logos?.primary} alt="Logo" fallbackType="logo" className="w-full h-full object-contain" />
    </div>
    <div>
      <h1 className="text-sm font-extrabold text-stone-900 leading-tight">{config?.appName || 'SIM-KWARCAB'}</h1>
      <p className="text-[10px] text-stone-500 font-medium">{config?.kwarcabName || 'Kwartir Cabang Gerakan Pramuka Kota Depok'}</p>
    </div>
  </div>
);

const DesktopViewportSwitch: React.FC<{
  mode: ViewportMode;
  setMode: (m: ViewportMode) => void;
}> = ({ mode, setMode }) => (
  <div className="flex bg-stone-100 p-0.5 rounded-xl border border-stone-200">
    <button onClick={() => setMode('desktop')} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${mode === 'desktop' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'}`}>
      <Monitor className="w-3.5 h-3.5" /><span className="hidden sm:inline">Desktop</span>
    </button>
    <button onClick={() => setMode('mobile-framed')} className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${mode !== 'desktop' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'}`}>
      <Smartphone className="w-3.5 h-3.5" /><span className="hidden sm:inline">Mobile</span>
    </button>
  </div>
);

const DesktopUserAvatar: React.FC<{ user: UserProfile | null; onOpenAuth: () => void }> = ({ user, onOpenAuth }) => {
  if (!user) {
    return <button onClick={onOpenAuth} className="px-3.5 py-1.5 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold shadow-xs">Masuk / Daftar</button>;
  }
  return (
    <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover border border-stone-200" />
      <div className="hidden lg:block text-left">
        <p className="text-xs font-bold text-stone-900 leading-tight truncate max-w-[120px]">{user.name}</p>
        <span className="text-[9px] font-mono text-stone-400">NTA: {user.nta || 'Belum Terbit'}</span>
      </div>
    </div>
  );
};

export const DesktopHeader: React.FC<{
  currentUser: UserProfile | null;
  currentRole: ScoutRole;
  onRoleChange: (r: ScoutRole) => void;
  config: any;
  viewportMode: ViewportMode;
  setViewportMode: (m: ViewportMode) => void;
  onOpenPublicWebsite?: () => void;
  onOpenAuth: () => void;
  onOpenModal: (id: string) => void;
}> = (p) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <DesktopBrand config={p.config} />
        <div className="flex items-center gap-3">
          {p.onOpenPublicWebsite && (
            <button onClick={p.onOpenPublicWebsite} className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5 text-amber-700" /><span>Website Publik</span>
            </button>
          )}
          <DesktopViewportSwitch mode={p.viewportMode} setMode={p.setViewportMode} />
          <DesktopUserAvatar user={p.currentUser} onOpenAuth={p.onOpenAuth} />
        </div>
      </div>
    </header>
  );
};
