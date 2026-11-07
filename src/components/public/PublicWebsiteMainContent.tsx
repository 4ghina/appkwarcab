import React from 'react';
import { UserProfile, CabangEvent, GudepData } from '../../types/scout';
import { HeroCarousel } from '../HeroCarousel';
import { PublicQuickAccess } from './PublicQuickAccess';
import { PublicInfographicSection } from './infographic/PublicInfographicSection';
import { PublicVisionBenefits } from './PublicVisionBenefits';
import { PublicAgendaSection } from './PublicAgendaSection';
import { PublicGudepDirectory } from './PublicGudepDirectory';
import { PublicNewsSection } from './PublicNewsSection';
import { PublicJoinAndFaq } from './PublicJoinAndFaq';

interface PublicWebsiteMainContentProps {
  currentUser: UserProfile | null;
  events: CabangEvent[];
  gudepList: GudepData[];
  config: any;
  onOpenAuth: (redirectPath?: string) => void;
  onOpenPortal: () => void;
  onOpenVerifier: () => void;
  onSelectGudepDetail?: (gudep: GudepData) => void;
  onSelectKwarranDetail?: (kwarranName: string) => void;
  onSlideClick: (slide: { id: string }) => void;
}

export const PublicWebsiteMainContent: React.FC<PublicWebsiteMainContentProps> = (p) => (
  <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 space-y-10">
    <section id="beranda" className="pt-1">
      <HeroCarousel onSlideClick={p.onSlideClick} />
    </section>
    <PublicQuickAccess onOpenVerifier={p.onOpenVerifier} />
    <PublicInfographicSection />
    <PublicVisionBenefits />

    <PublicAgendaSection events={p.events} onOpenAuth={p.onOpenAuth} onOpenPortal={p.onOpenPortal} isLoggedIn={Boolean(p.currentUser)} />
    <PublicGudepDirectory gudepList={p.gudepList} onSelectGudepDetail={p.onSelectGudepDetail} onSelectKwarranDetail={p.onSelectKwarranDetail} />
    <PublicNewsSection />
    <PublicJoinAndFaq onOpenAuth={() => p.onOpenAuth()} config={p.config} />
  </main>
);
