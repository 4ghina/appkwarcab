import React from 'react';
import { GudepData, ScoutGolongan } from '../../types/scout';
import { AffiliationGudepSelector } from './AffiliationGudepSelector';
import { AffiliationRoleGolongan } from './AffiliationRoleGolongan';
import { AffiliationOldNtaField } from './AffiliationOldNtaField';

interface AffiliationFormStepProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedKwarran: string;
  onSelectKwarran: (k: string) => void;
  kwarranList: string[];
  filteredGudep: GudepData[];
  selectedGudep: GudepData | null;
  onSelectGudep: (g: GudepData) => void;
  appliedRole: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf' | 'Orang Tua/Wali';
  onRoleChange: (r: any) => void;
  targetGolongan: ScoutGolongan;
  onGolonganChange: (g: ScoutGolongan) => void;
  hasOldNTA: boolean;
  onHasOldNTAChange: (has: boolean) => void;
  oldNTANumber: string;
  onOldNTANumberChange: (n: string) => void;
  onProceed: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const AffiliationFormStep: React.FC<AffiliationFormStepProps> = (p) => (
  <form onSubmit={p.onProceed} className="space-y-4 text-xs">
    <AffiliationGudepSelector
      searchQuery={p.searchQuery}
      onSearchChange={p.onSearchChange}
      filteredGudep={p.filteredGudep}
      selectedGudep={p.selectedGudep}
      onSelectGudep={p.onSelectGudep}
    />
    <AffiliationRoleGolongan
      appliedRole={p.appliedRole}
      onRoleChange={p.onRoleChange}
      targetGolongan={p.targetGolongan}
      onGolonganChange={p.onGolonganChange}
    />
    <AffiliationOldNtaField
      hasOldNTA={p.hasOldNTA}
      onHasOldNTAChange={p.onHasOldNTAChange}
      oldNTANumber={p.oldNTANumber}
      onOldNTANumberChange={p.onOldNTANumberChange}
    />
    <div className="flex items-center gap-2 pt-2">
      <button
        type="submit"
        disabled={!p.selectedGudep}
        className="flex-1 py-2.5 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] disabled:opacity-50 text-white font-bold"
      >
        Lanjutkan ke Konfirmasi
      </button>
      <button type="button" onClick={p.onClose} className="py-2.5 px-4 rounded-xl bg-stone-100 text-stone-700 font-bold">
        Batal
      </button>
    </div>
  </form>
);
