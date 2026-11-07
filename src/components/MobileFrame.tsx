import React, { useState } from 'react';
import { Smartphone, Signal, Wifi, Battery, Layout } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DynamicAssetImage } from './DynamicAssetImage';

interface FrameHeaderProps {
  appName: string;
  logoSrc?: string;
  mode: 'framed' | 'clean';
  setMode: (m: 'framed' | 'clean') => void;
  onDesktop: () => void;
}

const MobileFrameHeader: React.FC<FrameHeaderProps> = ({ appName, logoSrc, mode, setMode, onDesktop }) => (
  <header className="hidden sm:flex items-center justify-between w-full max-w-[480px] mb-3 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-stone-300/80 shadow-xs text-xs">
    <div className="flex items-center gap-1.5 font-bold text-[#5D4037]">
      <div className="w-5 h-5 rounded-md bg-[#5D4037] flex items-center justify-center p-0.5">
        <DynamicAssetImage src={logoSrc} alt={appName} fallbackType="logo" className="w-full h-full text-white" />
      </div>
      <span className="font-extrabold tracking-tight truncate max-w-[140px]">{appName}</span>
      <span className="text-[10px] text-stone-500 font-normal">v2.6</span>
    </div>
    <div className="flex items-center gap-1 bg-stone-200/60 p-0.5 rounded-xl">
      <button onClick={() => setMode('framed')} className={`px-2 py-1 rounded-lg text-[11px] flex items-center gap-1 ${mode === 'framed' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600'}`}>
        <Smartphone className="w-3 h-3" />
        <span>Frame</span>
      </button>
      <button onClick={() => setMode('clean')} className={`px-2 py-1 rounded-lg text-[11px] flex items-center gap-1 ${mode === 'clean' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600'}`}>
        <span>Bersih</span>
      </button>
      <button onClick={onDesktop} className="px-2 py-1 rounded-lg font-bold text-[11px] text-[#5D4037] hover:bg-white flex items-center gap-1 border-l border-stone-300/80 pl-2 ml-0.5">
        <Layout className="w-3 h-3" />
        <span>Desktop</span>
      </button>
    </div>
  </header>
);

const MobileStatusBar: React.FC<{ mode: 'framed' | 'clean' }> = ({ mode }) => (
  <div className="w-full bg-[#FAF8F5] pt-2 px-6 pb-1 flex items-center justify-between text-stone-800 select-none z-30">
    <span className="text-[11px] font-bold tracking-tight">09:41</span>
    {mode === 'framed' && (
      <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-black rounded-full text-white text-[10px] shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-[9px] tracking-wide">SIM-KWARCAB</span>
      </div>
    )}
    <div className="flex items-center gap-1.5 text-stone-700">
      <Signal className="w-3.5 h-3.5" />
      <Wifi className="w-3.5 h-3.5" />
      <Battery className="w-4 h-4 fill-current" />
    </div>
  </div>
);

export const MobileFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config, setViewportMode } = useApp();
  const [deviceFrameMode, setDeviceFrameMode] = useState<'framed' | 'clean'>('framed');

  return (
    <div className="min-h-screen w-full bg-[#EFEBE4] text-[#2D2421] flex flex-col items-center justify-start sm:py-6 sm:px-4">
      <MobileFrameHeader appName={config.appName} logoSrc={config.logos?.primary} mode={deviceFrameMode} setMode={setDeviceFrameMode} onDesktop={() => setViewportMode('desktop')} />
      <main className={`w-full max-w-[480px] bg-[#FAF8F5] relative transition-all duration-300 ${deviceFrameMode === 'framed' ? 'sm:rounded-[44px] sm:shadow-2xl sm:border-[10px] sm:border-[#1E1A18] sm:ring-1 sm:ring-black/10 overflow-hidden min-h-[844px]' : 'rounded-none sm:rounded-3xl shadow-lg border border-stone-200 min-h-screen'}`}>
        <MobileStatusBar mode={deviceFrameMode} />
        <div className="w-full px-4 pt-1 overflow-x-hidden min-h-[calc(100vh-60px)] sm:min-h-[800px]">
          {children}
        </div>
        {deviceFrameMode === 'framed' && (
          <div className="hidden sm:block absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-300 rounded-full pointer-events-none z-50" />
        )}
      </main>
    </div>
  );
};
