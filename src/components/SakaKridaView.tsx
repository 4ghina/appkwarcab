import React, { useState } from 'react';
import { SAKA_LIST } from '../data/mockData';
import { UserProfile } from '../types/scout';
import { CheckCircle2 } from 'lucide-react';
import { SakaHeaderBanner } from './saka/SakaHeaderBanner';
import { ActiveSakaCard } from './saka/ActiveSakaCard';
import { SakaCatalogGrid } from './saka/SakaCatalogGrid';
import { SakaDetailModal } from './saka/SakaDetailModal';

interface SakaKridaViewProps {
  user: UserProfile;
  onClose?: () => void;
}

export const SakaKridaView: React.FC<SakaKridaViewProps> = ({ user, onClose }) => {
  const [selectedSaka, setSelectedSaka] = useState<typeof SAKA_LIST[0] | null>(null);
  const [joinedToast, setJoinedToast] = useState<string | null>(null);

  const handleJoinKrida = (kridaName: string) => {
    setJoinedToast(`Pendaftaran minat Krida "${kridaName}" berhasil diteruskan ke Pinsaka Cabang!`);
    setTimeout(() => setJoinedToast(null), 3500);
  };

  return (
    <div className="w-full pb-20 animate-in fade-in duration-150">
      <SakaHeaderBanner onClose={onClose} />
      {joinedToast && (
        <div className="mb-3 p-3 rounded-2xl bg-blue-800 text-white text-xs font-semibold flex items-center gap-2 shadow-md animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-blue-200 shrink-0" />
          <span>{joinedToast}</span>
        </div>
      )}
      <ActiveSakaCard user={user} />
      <SakaCatalogGrid onSelectSaka={setSelectedSaka} />
      <SakaDetailModal saka={selectedSaka} onClose={() => setSelectedSaka(null)} onJoinKrida={handleJoinKrida} />
    </div>
  );
};
