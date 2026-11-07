import React, { useState } from 'react';
import { UserProfile } from '../../types/scout';
import { calculateAge } from '../../data/mockData';

interface FormProps {
  user: UserProfile;
  onSave(updated: UserProfile): void;
  onClose(): void;
}

const BLOOD_TYPES = ['A', 'B', 'AB', 'O'];

export const ProfileEditForm: React.FC<FormProps> = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user.name);
  const [birthDate, setBirthDate] = useState(user.birthDate || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [bloodType, setBloodType] = useState(user.bloodType || 'O');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAge = birthDate ? calculateAge(birthDate) : (user.calculatedAge || 17);
    onSave({ ...user, name: name.trim() || user.name, birthDate, calculatedAge: newAge, phone: phone.trim(), bloodType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-xs">
      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Nama Lengkap Sesuai Dokumen:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-stone-800 font-semibold" />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Tanggal Lahir:</label>
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-stone-800" />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Nomor WhatsApp / Telepon:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-stone-800" />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Golongan Darah:</label>
        <div className="grid grid-cols-4 gap-2">
          {BLOOD_TYPES.map((bt) => (
            <button key={bt} type="button" onClick={() => setBloodType(bt)} className={`py-2 rounded-xl border font-bold text-xs ${bloodType === bt ? 'bg-rose-600 text-white border-rose-700' : 'bg-white text-stone-700 border-stone-200'}`}>
              {bt}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-2 flex items-center gap-2">
        <button type="submit" className="flex-1 py-3 px-4 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold shadow-md">Simpan Profil</button>
        <button type="button" onClick={onClose} className="py-3 px-3 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold">Batal</button>
      </div>
    </form>
  );
};
