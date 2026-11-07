import React from 'react';
import { UserProfile } from '../../types/scout';
import { Edit3, X } from 'lucide-react';
import { ProfileEditForm } from './ProfileEditForm';

interface ProfileEditModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose(): void;
  onSave(updatedUser: UserProfile): void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ user, isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150 space-y-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-[#5D4037] flex items-center justify-center font-bold">
              <Edit3 className="w-4 h-4 text-amber-800" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-stone-900">Lengkapi & Perbaiki Data Profil</h3>
              <p className="text-[11px] text-stone-500">Data tersimpan permanen pada identitas KTA digital</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500">
            <X className="w-4 h-4" />
          </button>
        </div>
        <ProfileEditForm user={user} onSave={onSave} onClose={onClose} />
      </div>
    </div>
  );
};
