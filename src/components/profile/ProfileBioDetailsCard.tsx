import React from 'react';
import { UserProfile } from '../../types/scout';
import { User, Edit3 } from 'lucide-react';

interface ProfileBioDetailsCardProps {
  user: UserProfile;
  onEdit(): void;
}

function getBioRows(user: UserProfile) {
  return [
    { label: 'Kategori Keanggotaan:', val: user.memberCategory === 'peserta_didik' ? 'Peserta Didik' : 'Anggota Dewasa', bold: true },
    { label: 'Tanggal Lahir / Usia:', val: `${user.birthDate || '-'} (${user.calculatedAge} Tahun)` },
    { label: 'Nomor Tanda Anggota (NTA):', val: user.membershipStatus === 'verified' ? user.nta : `${user.provisionalNta} (Sementara)`, mono: true },
    { label: 'Pangkalan Gudep:', val: user.pangkalan },
    { label: 'Nomor Gugus Depan:', val: user.gudepNomor },
    { label: 'Kwartir Ranting:', val: user.kwarran },
    { label: 'Kwartir Cabang:', val: user.kwarcab },
    { label: 'Golongan Darah:', val: user.bloodType, isBlood: true },
  ];
}

export const ProfileBioDetailsCard: React.FC<ProfileBioDetailsCardProps> = ({ user, onEdit }) => (
  <div className="p-4 bg-white rounded-3xl border border-stone-200/90 shadow-sm space-y-3">
    <div className="flex items-center justify-between pb-2 border-b border-stone-100">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#5D4037] flex items-center gap-1.5">
        <User className="w-4 h-4 text-stone-600" />
        Rincian Data Anggota
      </h3>
      <button onClick={onEdit} className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#5D4037] text-[10px] font-bold border border-amber-300 transition-colors">
        <Edit3 className="w-3 h-3 text-amber-800" /><span>Ubah Profil</span>
      </button>
    </div>

    <div className="space-y-2 text-xs">
      {getBioRows(user).map((d) => (
        <div key={d.label} className="flex items-center justify-between">
          <span className="text-stone-500">{d.label}</span>
          {d.isBlood ? (
            <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">{d.val}</span>
          ) : (
            <span className={`text-stone-900 ${d.bold ? 'font-bold' : 'font-semibold'} ${d.mono ? 'font-mono' : ''}`}>{d.val}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);
