import { useState } from 'react';
import { VerificationItem } from '../../types/scout';
import confetti from 'canvas-confetti';

export const FILTERS = ['Semua', 'Pengaitan Gudep', 'Garuda', 'KTA'] as const;

export function useVerificationQueueState(
  initialQueue: VerificationItem[],
  onApprove: (id: string) => void,
  onRevise: (id: string, reason: string) => void
) {
  const [items, setItems] = useState<VerificationItem[]>(initialQueue);
  const [selectedForRevision, setSelectedForRevision] = useState<VerificationItem | null>(null);
  const [revisionNote, setRevisionNote] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<typeof FILTERS[number]>('Semua');

  const filteredItems = items.filter(i => {
    if (selectedFilter === 'Pengaitan Gudep') return i.jenis.includes('Gudep');
    if (selectedFilter === 'Garuda') return i.jenis.includes('Garuda');
    if (selectedFilter === 'KTA') return i.jenis.includes('KTA');
    return true;
  });

  const handleApproveItem = (item: VerificationItem) => {
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'Disetujui' } : i));
    onApprove(item.id);
    try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.65 }, colors: ['#2E7D32', '#F59E0B', '#5D4037'] }); } catch (e) {}
    setToastMessage(`Pengajuan ${item.pengaju} disetujui.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleConfirmRevision = () => {
    if (!selectedForRevision) return;
    setItems(prev => prev.map(i => i.id === selectedForRevision.id ? { ...i, status: 'Direvisi', catatan: revisionNote || 'Perlu perbaikan.' } : i));
    onRevise(selectedForRevision.id, revisionNote);
    setSelectedForRevision(null);
    setRevisionNote('');
    setToastMessage('Catatan revisi telah dikirimkan.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return {
    items, selectedForRevision, setSelectedForRevision, revisionNote, setRevisionNote,
    toastMessage, selectedFilter, setSelectedFilter, filteredItems, handleApproveItem, handleConfirmRevision
  };
}
