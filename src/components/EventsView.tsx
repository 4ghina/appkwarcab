import React, { useState } from 'react';
import { CabangEvent, UserProfile } from '../types/scout';
import { CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventsHeaderBanner } from './events/EventsHeaderBanner';
import { EventItemCard } from './events/EventItemCard';
import { EventRegistrationModal, EligibilityResult } from './events/EventRegistrationModal';

interface EventsViewProps {
  user: UserProfile;
  events: CabangEvent[];
  onClose?: () => void;
}

function checkEligibility(evt: CabangEvent, user: UserProfile): EligibilityResult {
  const isGolonganEligible = evt.kategoriGolongan.includes(user.golongan);
  const hasActiveKTA = true;
  const hasSKUKualifikasi = user.tingkatan.toLowerCase().includes('bantara') ||
    user.tingkatan.toLowerCase().includes('laksana') ||
    user.tingkatan.toLowerCase().includes('terap') ||
    user.tingkatan.toLowerCase().includes('garuda') ||
    user.tingkatan.toLowerCase().includes('tata');
  return {
    isQualified: isGolonganEligible && hasActiveKTA,
    isGolonganEligible,
    hasActiveKTA,
    hasSKUKualifikasi,
    notes: isGolonganEligible
      ? 'Memenuhi syarat golongan dan nomor KTA terdaftar aktif.'
      : `Kegiatan ini khusus untuk golongan ${evt.kategoriGolongan.join(' / ')}. Golongan Anda: ${user.golongan}.`
  };
}

const EventsSourceFilter: React.FC<{
  sourceFilter: 'all' | 'real' | 'sample';
  setSourceFilter: (f: 'all' | 'real' | 'sample') => void;
}> = ({ sourceFilter, setSourceFilter }) => (
  <div className="flex items-center justify-between px-1 flex-wrap gap-2">
    <h4 className="text-xs font-black uppercase tracking-wider text-stone-700">Daftar Kegiatan Resmi Kwarcab</h4>
    <div className="flex bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-[10px] font-bold">
      <button onClick={() => setSourceFilter('all')} className={`px-2 py-1 rounded-lg transition ${sourceFilter === 'all' ? 'bg-[#5D4037] text-white shadow-xs' : 'text-stone-600'}`}>Semua</button>
      <button onClick={() => setSourceFilter('real')} className={`px-2 py-1 rounded-lg transition ${sourceFilter === 'real' ? 'bg-[#5D4037] text-white shadow-xs' : 'text-stone-600'}`}>Data Riil</button>
      <button onClick={() => setSourceFilter('sample')} className={`px-2 py-1 rounded-lg transition ${sourceFilter === 'sample' ? 'bg-[#5D4037] text-white shadow-xs' : 'text-stone-600'}`}>Data Contoh</button>
    </div>
  </div>
);

const EventCardsList: React.FC<{ events: CabangEvent[]; onSelect: (evt: CabangEvent) => void }> = ({ events, onSelect }) => {
  if (events.length === 0) {
    return <div className="p-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">Tidak ada kegiatan pada filter sumber data yang dipilih.</div>;
  }
  return <>{events.map(evt => <EventItemCard key={evt.id} evt={evt} onRegister={onSelect} />)}</>;
};

export const EventsView: React.FC<EventsViewProps> = ({ user, events, onClose }) => {
  const [eventList, setEventList] = useState<CabangEvent[]>(events);
  const [selectedEvent, setSelectedEvent] = useState<CabangEvent | null>(null);
  const [showAutoCheckModal, setShowAutoCheckModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<'all' | 'real' | 'sample'>('all');

  const confirmRegistration = () => {
    if (!selectedEvent) return;
    setEventList(prev => prev.map(e => e.id === selectedEvent.id ? { ...e, isRegistered: true, terdaftar: e.terdaftar + 1 } : e));
    setShowAutoCheckModal(false);
    try { confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: ['#F59E0B', '#2E7D32', '#1E3A8A'] }); } catch (e) {}
    setSuccessToast(`Pendaftaran ${selectedEvent.nama} Berhasil! E-Tiket Kontingen Tersedia.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const filteredEvents = eventList.filter(e => {
    const isSample = (e as any).isSample ?? true;
    return sourceFilter === 'real' ? !isSample : sourceFilter === 'sample' ? isSample : true;
  });

  const eligibility = selectedEvent ? checkEligibility(selectedEvent, user) : { isQualified: false, isGolonganEligible: false, hasActiveKTA: false, hasSKUKualifikasi: false, notes: '' };

  return (
    <div className="w-full pb-20 animate-in fade-in duration-150">
      <EventsHeaderBanner onClose={onClose} />
      {successToast && (
        <div className="mb-3 p-3 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" /><span>{successToast}</span>
        </div>
      )}
      <div className="space-y-3">
        <EventsSourceFilter sourceFilter={sourceFilter} setSourceFilter={setSourceFilter} />
        <EventCardsList events={filteredEvents} onSelect={(e) => { setSelectedEvent(e); setShowAutoCheckModal(true); }} />
      </div>
      <EventRegistrationModal
        isOpen={showAutoCheckModal} evt={selectedEvent} user={user} eligibility={eligibility}
        onClose={() => setShowAutoCheckModal(false)} onConfirm={confirmRegistration}
      />
    </div>
  );
};
