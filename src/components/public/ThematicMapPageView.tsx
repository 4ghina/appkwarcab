import React from 'react';
import { UserProfile } from '../../types/scout';
import { useApp } from '../../context/AppContext';
import { PublicHeader } from './PublicHeader';
import { AnnotatedThematicMap } from '../map/thematic/AnnotatedThematicMap';
import { PublicFooter } from './PublicFooter';

interface ThematicMapPageViewProps {
  currentUser: UserProfile | null;
  onBackToBeranda: () => void;
  onOpenVerifier: () => void;
  onOpenPortal: () => void;
  onOpenAuth: () => void;
}

export const ThematicMapPageView: React.FC<ThematicMapPageViewProps> = ({
  currentUser,
  onBackToBeranda,
  onOpenVerifier,
  onOpenPortal,
  onOpenAuth,
}) => {
  const { config } = useApp();

  return (
    <div className="w-full bg-[#FAF8F5] text-[#2D2421] min-h-screen flex flex-col font-sans">
      <PublicHeader
        currentUser={currentUser}
        config={config}
        onOpenVerifier={onOpenVerifier}
        onOpenPortal={onOpenPortal}
        onOpenAuth={onOpenAuth}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        <AnnotatedThematicMap onBackToBeranda={onBackToBeranda} />
      </main>

      <PublicFooter config={config} />
    </div>
  );
};
