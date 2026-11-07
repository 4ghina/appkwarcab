import React, { useState } from 'react';
import { PUSDIKLAT_COURSES } from '../data/mockData';
import { UserProfile } from '../types/scout';
import { CheckCircle2 } from 'lucide-react';
import { PusdiklatHeaderBanner } from './pusdiklat/PusdiklatHeaderBanner';
import { PusdiklatQualificationCard } from './pusdiklat/PusdiklatQualificationCard';
import { PusdiklatCourseCard } from './pusdiklat/PusdiklatCourseCard';

interface PusdiklatcabViewProps {
  user: UserProfile;
  onClose?: () => void;
}

export const PusdiklatcabView: React.FC<PusdiklatcabViewProps> = ({ user, onClose }) => {
  const [registeredCourseId, setRegisteredCourseId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRegister = (courseName: string, id: string) => {
    setRegisteredCourseId(id);
    setToastMessage(`Pendaftaran ${courseName} berhasil! Berkas dikirim ke Sekretariat Pusdiklatcab.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="w-full pb-20 animate-in fade-in duration-150">
      <PusdiklatHeaderBanner onClose={onClose} />
      {toastMessage && (
        <div className="mb-3 p-3 rounded-2xl bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
      <PusdiklatQualificationCard user={user} />
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-stone-700 px-1">Agenda Kursus Pembina & Pelatih</h4>
        <div className="space-y-3">
          {PUSDIKLAT_COURSES.map(course => (
            <PusdiklatCourseCard key={course.id} course={course} isRegistered={registeredCourseId === course.id} onRegister={handleRegister} />
          ))}
        </div>
      </div>
    </div>
  );
};
