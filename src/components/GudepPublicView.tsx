import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { GudepData, UserProfile } from '../types/scout';
import { GudepHeroCard } from './public/gudep/GudepHeroCard';
import { GudepInfoPanel, GudepActionSidePanel } from './public/gudep/GudepPanels';

interface GudepPublicViewProps {
  gudep: GudepData;
  currentUser: UserProfile | null;
  onBack: () => void;
  onApplyAffiliation?: () => void;
  onOpenAuth?: () => void;
}

export const GudepPublicView: React.FC<GudepPublicViewProps> = (p) => {
  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen text-[#2D2421] p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <button onClick={p.onBack} className="flex items-center gap-2 text-xs font-bold text-[#5D4037] hover:underline">
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Direktori</span>
      </button>
      <GudepHeroCard gudep={p.gudep} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GudepInfoPanel gudep={p.gudep} />
        <GudepActionSidePanel onApplyAffiliation={p.onApplyAffiliation} onOpenAuth={p.onOpenAuth} />
      </div>
    </div>
  );
};
