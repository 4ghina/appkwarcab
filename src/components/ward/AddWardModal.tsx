import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { MOCK_GUDEP_LIST } from '../../data/mockData';
import { ChildWardProfile } from '../../types/scout';

interface AddWardModalProps {
  onAdd: (ward: ChildWardProfile) => void;
  onClose: () => void;
}

function buildChildWard(name: string, birthDate: string, gender: 'L' | 'P', golongan: 'Siaga' | 'Penggalang', gudepId: string): ChildWardProfile {
  const gudep = MOCK_GUDEP_LIST.find(g => g.id === gudepId) || MOCK_GUDEP_LIST[0];
  return {
    id: `ward-${Date.now()}`, name: name.trim(), birthDate, gender, golongan,
    gudepName: gudep.pangkalan, gudepNomor: gudep.nomorPa, kwarran: gudep.kwarran,
    nta: null, provisionalNta: `PRA-ANAK-${Math.floor(1000 + Math.random() * 9000)}`,
    membershipStatus: 'pending_verification',
    avatar: gender === 'L' ? 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    relation: 'Anak Kandung', skuProgress: { passed: 0, total: 8 }
  };
}

const AddWardForm: React.FC<AddWardModalProps> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('2015-08-20');
  const [golongan, setGolongan] = useState<'Siaga' | 'Penggalang'>('Siaga');
  const [gudepId, setGudepId] = useState(MOCK_GUDEP_LIST[0].id);

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (name.trim()) onAdd(buildChildWard(name, birthDate, 'L', golongan, gudepId)); }} className="my-3 space-y-3 text-xs">
      <div>
        <label className="text-stone-700 font-bold block mb-1">Nama Lengkap Anak:</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Muhammad Farhan" className="w-full p-2 bg-stone-50 rounded-xl border border-stone-300 text-stone-900" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-stone-700 font-bold block mb-1">Tanggal Lahir:</label>
          <input type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full p-2 bg-stone-50 rounded-xl border border-stone-300 text-stone-900" />
        </div>
        <div>
          <label className="text-stone-700 font-bold block mb-1">Golongan:</label>
          <select value={golongan} onChange={(e) => setGolongan(e.target.value as any)} className="w-full p-2 bg-stone-50 rounded-xl border border-stone-300 text-stone-900">
            <option value="Siaga">Siaga (SD)</option>
            <option value="Penggalang">Penggalang (SMP)</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-stone-700 font-bold block mb-1">Pangkalan Sekolah / Gudep:</label>
        <select value={gudepId} onChange={(e) => setGudepId(e.target.value)} className="w-full p-2 bg-stone-50 rounded-xl border border-stone-300 text-stone-900">
          {MOCK_GUDEP_LIST.map((g) => <option key={g.id} value={g.id}>{g.pangkalan}</option>)}
        </select>
      </div>
      <div className="pt-2 flex items-center gap-2">
        <button type="submit" className="flex-1 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold">Simpan Data Anak</button>
        <button type="button" onClick={onClose} className="py-2.5 px-3 rounded-xl bg-stone-100 text-stone-800 font-bold">Batal</button>
      </div>
    </form>
  );
};

export const AddWardModal: React.FC<AddWardModalProps> = (props) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
    <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200">
      <div className="flex items-start justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-rose-600" />
          <h4 className="text-xs font-bold text-stone-900 uppercase">Daftarkan Anggota Anak Binaan</h4>
        </div>
        <button onClick={props.onClose} className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500"><X className="w-4 h-4" /></button>
      </div>
      <AddWardForm {...props} />
    </div>
  </div>
);
