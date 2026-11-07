import { useState } from 'react';
import { GudepData, ScoutGolongan } from '../../types/scout';
import { MOCK_GUDEP_LIST } from '../../data/mockData';
import confetti from 'canvas-confetti';

export function useAffiliationForm(
  onSubmitApplication: (appData: {
    targetGudepId: string;
    targetGudepName: string;
    targetKwarran: string;
    appliedRole: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf' | 'Orang Tua/Wali';
    targetGolongan?: ScoutGolongan;
    claimExistingNTA?: string;
  }) => void
) {
  const [step, setStep] = useState<'form' | 'summary' | 'success'>('form');
  const [selectedKwarran, setSelectedKwarran] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGudep, setSelectedGudep] = useState<GudepData | null>(null);
  const [appliedRole, setAppliedRole] = useState<'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf' | 'Orang Tua/Wali'>('Peserta Didik');
  const [targetGolongan, setTargetGolongan] = useState<ScoutGolongan>('Penegak');
  const [hasOldNTA, setHasOldNTA] = useState(false);
  const [oldNTANumber, setOldNTANumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const kwarranList = ['Semua', 'Pancoran Mas', 'Sukmajaya', 'Beji', 'Cimanggis', 'Sawangan', 'Tapos', 'Cilodong', 'Cinere', 'Cipayung', 'Bojongsari', 'Limo'];

  const filteredGudep = MOCK_GUDEP_LIST.filter(g => {
    const matchKwarran = selectedKwarran === 'Semua' || g.kwarran.toLowerCase().includes(selectedKwarran.toLowerCase());
    const matchSearch = g.pangkalan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        g.nomorPa.includes(searchQuery) ||
                        g.nomorPi.includes(searchQuery);
    return matchKwarran && matchSearch;
  });

  const handleFinalSubmit = () => {
    if (!selectedGudep || isSubmitting) return;
    setIsSubmitting(true);
    try {
      onSubmitApplication({
        targetGudepId: selectedGudep.id,
        targetGudepName: `${selectedGudep.pangkalan} (Gudep ${selectedGudep.nomorPa} - ${selectedGudep.nomorPi})`,
        targetKwarran: selectedGudep.kwarran,
        appliedRole,
        targetGolongan,
        claimExistingNTA: hasOldNTA && oldNTANumber ? oldNTANumber.trim() : undefined
      });
      try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 }, colors: ['#5D4037', '#2E7D32', '#F59E0B'] }); } catch (err) {}
      setStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step, setStep, selectedKwarran, setSelectedKwarran, searchQuery, setSearchQuery,
    selectedGudep, setSelectedGudep, appliedRole, setAppliedRole, targetGolongan, setTargetGolongan,
    hasOldNTA, setHasOldNTA, oldNTANumber, setOldNTANumber, isSubmitting, kwarranList, filteredGudep, handleFinalSubmit
  };
}
