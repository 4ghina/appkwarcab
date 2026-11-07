import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ScoutGolongan } from '../../types/scout';
import { AffiliationTypeSelector } from './AffiliationTypeSelector';
import { AffiliationGudepFields } from './AffiliationGudepFields';
import { AffiliationParentFields } from './AffiliationParentFields';

const AffiliationButtons: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="pt-2 flex items-center gap-2">
    <button type="button" onClick={onBack} className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1">
      <ArrowLeft className="w-3.5 h-3.5" />
      <span>Kembali</span>
    </button>
    <button type="submit" className="flex-1 py-3 px-4 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5">
      <CheckCircle2 className="w-4 h-4" />
      <span>Selesaikan & Buka SIM-KWARCAB</span>
    </button>
  </div>
);

export const OnboardingStepAffiliation: React.FC<{
  affiliationType: 'none' | 'gudep' | 'parent';
  setAffiliationType: (t: 'none' | 'gudep' | 'parent') => void;
  selectedGudepId: string;
  setSelectedGudepId: (id: string) => void;
  appliedRole: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf';
  setAppliedRole: (role: any) => void;
  appliedGolongan: ScoutGolongan;
  setAppliedGolongan: (gol: ScoutGolongan) => void;
  claimOldNta: string;
  setClaimOldNta: (nta: string) => void;
  childName: string;
  setChildName: (name: string) => void;
  childGolongan: 'Siaga' | 'Penggalang';
  setChildGolongan: (gol: 'Siaga' | 'Penggalang') => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}> = (p) => {
  return (
    <form onSubmit={p.onSubmit} className="space-y-3.5">
      <div className="space-y-1">
        <span className="text-xs font-bold text-[#5D4037] uppercase tracking-wider block">Keterkaitan Organisasi</span>
        <p className="text-[11px] text-stone-500">Pilih status keikutsertaan Anda saat ini:</p>
      </div>
      <AffiliationTypeSelector type={p.affiliationType} onChange={p.setAffiliationType} />
      {p.affiliationType === 'gudep' && (
        <AffiliationGudepFields {...p} />
      )}
      {p.affiliationType === 'parent' && (
        <AffiliationParentFields {...p} />
      )}
      <AffiliationButtons onBack={p.onBack} />
    </form>
  );
};
