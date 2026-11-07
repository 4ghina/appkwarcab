import React, { useState } from 'react';
import { UserProfile, ChildWardProfile } from '../types/scout';
import { Heart, UserPlus, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WardItemCard } from './ward/WardItemCard';
import { AddWardModal } from './ward/AddWardModal';

const ParentWardHeader: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div className="p-4 rounded-3xl bg-gradient-to-br from-[#881337] via-[#9F1239] to-[#4C0519] text-white shadow-lg relative overflow-hidden">
    <div className="flex items-center justify-between pb-2 border-b border-white/20">
      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-xl bg-rose-400 text-stone-950 font-black"><Heart className="w-4 h-4 fill-current" /></span>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-200">Pendampingan Orang Tua / Wali</h3>
          <p className="text-sm font-extrabold text-white">Kelola Data & Pantau Progres Anak</p>
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
      )}
    </div>
  </div>
);

export const ParentWardManager: React.FC<{
  user: UserProfile;
  activeWardId?: string | null;
  onSelectWard?: (ward: ChildWardProfile | null) => void;
  onAddWard?: (ward: ChildWardProfile) => void;
  onUpdateUser?: (updatedUser: UserProfile) => void;
  onSelectWardToView?: (ward: ChildWardProfile) => void;
  onClose?: () => void;
}> = (p) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const wards = p.user.managedWards || [];

  const handleAddChild = (newWard: ChildWardProfile) => {
    if (p.onAddWard) p.onAddWard(newWard);
    else if (p.onUpdateUser) p.onUpdateUser({ ...p.user, managedWards: [...wards, newWard] });
    try { confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 }, colors: ['#E11D48', '#F59E0B', '#2E7D32'] }); } catch (err) {}
    setShowAddModal(false);
  };

  return (
    <div className="w-full pb-20 animate-in fade-in duration-150 space-y-4">
      <ParentWardHeader onClose={p.onClose} />
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">Daftar Anak Binaan ({wards.length})</h4>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-xs">
          <UserPlus className="w-3.5 h-3.5" /><span>Tambah Anak</span>
        </button>
      </div>
      <div className="space-y-3">
        {wards.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-stone-200 space-y-2">
            <p className="text-xs font-bold text-stone-800">Belum ada anak binaan terhubung</p>
            <p className="text-[11px] text-stone-500">Klik Tambah Anak untuk mendaftarkan anak Anda ke sistem.</p>
          </div>
        ) : (
          wards.map(w => (
            <WardItemCard key={w.id} ward={w} isActive={w.id === p.activeWardId} onSelect={() => p.onSelectWardToView ? p.onSelectWardToView(w) : p.onSelectWard?.(w)} />
          ))
        )}
      </div>
      {showAddModal && <AddWardModal onAdd={handleAddChild} onClose={() => setShowAddModal(false)} />}
    </div>
  );
};
