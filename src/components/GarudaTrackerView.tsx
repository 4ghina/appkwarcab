import React, { useState } from 'react';
import { GarudaApplication, UserProfile } from '../types/scout';
import { CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GarudaStepTracker } from './garuda/GarudaStepTracker';
import { GarudaDocumentChecklist } from './garuda/GarudaDocumentChecklist';
import { GarudaSkModal } from './garuda/GarudaSkModal';
import { GarudaCandidateBanner } from './garuda/GarudaCandidateBanner';

interface GarudaTrackerViewProps {
  user: UserProfile;
  applications: GarudaApplication[];
  onClose?: () => void;
}

export const GarudaTrackerView: React.FC<GarudaTrackerViewProps> = ({ user, applications, onClose }) => {
  const currentApp = applications.find(a => a.nta === user.nta) || applications[0];
  const [showSKPreview, setShowSKPreview] = useState(false);
  const [checklist, setChecklist] = useState({
    skuLengkap: currentApp?.berkas.skuLengkap ?? true,
    skkMinimal: currentApp?.berkas.skkMinimal ?? true,
    portofolioBakti: currentApp?.berkas.portofolioBakti ?? true,
    suratRekomendasiGudep: currentApp?.berkas.suratRekomendasiGudep ?? true,
    suratRekomendasiKwarran: currentApp?.berkas.suratRekomendasiKwarran ?? true,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleDoc = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    setToastMessage(`Dokumen portofolio diperbarui.`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDownloadSK = () => {
    try { confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 }, colors: ['#F59E0B', '#FBBF24', '#D97706', '#2E7D32'] }); } catch (e) {}
    setShowSKPreview(true);
  };

  return (
    <div className="w-full pb-20 animate-in fade-in duration-150 space-y-4">
      <GarudaCandidateBanner currentApp={currentApp} onClose={onClose} />
      {toastMessage && (
        <div className="p-3 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" /><span>{toastMessage}</span>
        </div>
      )}
      <GarudaStepTracker currentTahap={currentApp.currentStep} />
      <GarudaDocumentChecklist
        checklist={checklist} onToggleDoc={handleToggleDoc}
        onDownloadSK={handleDownloadSK} canDownloadSK={currentApp.status === 'SK Terbit'}
      />
      {showSKPreview && <GarudaSkModal app={currentApp} onClose={() => setShowSKPreview(false)} />}
    </div>
  );
};
