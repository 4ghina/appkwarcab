import { useState } from 'react';
import confetti from 'canvas-confetti';
import { ReligionChoice } from './ReligiousBranchSelector';
import { UserProfile } from '../../types/scout';

export function useSkuViewState(
  user: UserProfile,
  onUpdateSKU: (id: string, isPassed: boolean, testedBy?: string, notes?: string) => void,
  onSubmitSKUForTesting?: (skuId: string, submissionNote: string) => void,
  onSubmitSKKForApproval?: (skkId: string, submissionNote: string) => void
) {
  const [activeTab, setActiveTab] = useState<'sku' | 'skk' | 'tkk' | 'riwayat'>('sku');
  const [submittingItem, setSubmittingItem] = useState<{ type: 'SKU' | 'SKK'; item: any } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedReligion, setSelectedReligion] = useState<ReligionChoice>('Islam');

  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3500); };
  const isExaminer = Boolean(user.memberCategory === 'anggota_dewasa' && user.assignments.some(a => a.canExamineSKU));

  const handleExaminerDirectPass = (item: any) => {
    if (!isExaminer) { notify('Hanya Pembina berwenang yang dapat mengesahkan kelulusan.'); return; }
    onUpdateSKU(item.id, !item.isPassed, user.name, 'Disahkan langsung oleh Pembina');
    if (!item.isPassed) {
      try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } }); } catch (e) {}
      notify(`Butir #${item.nomor} disahkan.`);
    }
  };

  const handleModalSubmit = (note: string) => {
    if (!submittingItem) return;
    if (submittingItem.type === 'SKU' && onSubmitSKUForTesting) onSubmitSKUForTesting(submittingItem.item.id, note);
    else if (submittingItem.type === 'SKK' && onSubmitSKKForApproval) onSubmitSKKForApproval(submittingItem.item.id, note);
    notify(`Pengajuan ${submittingItem.type} berhasil dikirim.`);
    setSubmittingItem(null);
  };

  return {
    activeTab, setActiveTab,
    submittingItem, setSubmittingItem,
    toast, selectedReligion, setSelectedReligion,
    isExaminer, handleExaminerDirectPass, handleModalSubmit
  };
}
