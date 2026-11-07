import React from 'react';
import { UserProfile, CabangEvent, GudepData } from '../types/scout';
import { useApp } from '../context/AppContext';
import { PublicHeader } from './public/PublicHeader';
import { PublicWebsiteMainContent } from './public/PublicWebsiteMainContent';

interface PublicWebsiteViewProps {
  currentUser: UserProfile | null;
  events: CabangEvent[];
  gudepList: GudepData[];
  onOpenAuth: (redirectPath?: string) => void;
  onOpenPortal: () => void;
  onOpenVerifier: () => void;
  onSelectGudepDetail?: (gudep: GudepData) => void;
  onSelectKwarranDetail?: (kwarranName: string) => void;
}

export const PublicWebsiteView: React.FC<PublicWebsiteViewProps> = (p) => {
  const { config } = useApp();

  const handleSlideClick = (slide: { id: string }) => {
    if (slide.id.includes('garuda')) {
      if (p.currentUser) p.onOpenPortal();
      else p.onOpenAuth('/portal');
    } else if (slide.id.includes('gudep')) {
      document.getElementById('direktori')?.scrollIntoView({ behavior: 'smooth' });
    } else if (slide.id.includes('saka') || slide.id.includes('pusdiklat')) {
      document.getElementById('kegiatan')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#2D2421] min-h-screen flex flex-col font-sans">
      <PublicHeader
        currentUser={p.currentUser}
        config={config}
        onOpenVerifier={p.onOpenVerifier}
        onOpenPortal={p.onOpenPortal}
        onOpenAuth={() => p.onOpenAuth()}
      />
      <PublicWebsiteMainContent
        {...p}
        config={config}
        onSlideClick={handleSlideClick}
      />
    </div>
  );
};
