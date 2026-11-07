import React from 'react';
import { Sparkles, User, Heart } from 'lucide-react';

interface DemoAccount {
  label: string;
  email: string;
  desc: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  { label: 'Penegak (Terverifikasi)', email: 'dimas@pramuka.id', desc: 'Dimas Arya - SMA N 1 Depok' },
  { label: 'Pembina Gudep (KML)', email: 'suryono@pramuka.id', desc: 'Kak Suryono, S.Pd.' },
  { label: 'Admin Kwarran', email: 'fauzi@pramuka.id', desc: 'Kak Ahmad Fauzi - Pancoran Mas' },
  { label: 'Super Admin Kwarcab', email: 'bambang@pramuka.id', desc: 'Kak Drs. Bambang H. - Depok' },
  { label: 'Orang Tua / Wali Murid', email: 'bunda.ratna@gmail.com', desc: 'Bunda Ratna (Anak Siaga)' },
  { label: 'Pengguna Baru (Belum Gudep)', email: 'ananda.pratama@gmail.com', desc: 'Ananda Bagas (Pra-Reg)' },
];

export const DemoAccountsGrid: React.FC<{ onSelect: (email: string) => void }> = ({ onSelect }) => {
  return (
    <div className="pt-2 border-t border-stone-100 space-y-2">
      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-amber-600" />
        Akun Uji Coba Cepat (8 Peran & Wali)
      </span>
      <div className="grid grid-cols-2 gap-1.5">
        {DEMO_ACCOUNTS.map((demo) => (
          <button
            key={demo.email}
            type="button"
            onClick={() => onSelect(demo.email)}
            className="p-2 text-left rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 transition-all text-[11px] group"
          >
            <div className="flex items-center gap-1 text-stone-800 font-bold group-hover:text-amber-900">
              {demo.email.includes('bunda') ? (
                <Heart className="w-3 h-3 text-rose-500 shrink-0" />
              ) : (
                <User className="w-3 h-3 text-[#5D4037] shrink-0" />
              )}
              <span className="truncate">{demo.label}</span>
            </div>
            <span className="text-[9px] text-stone-600 block truncate mt-0.5">{demo.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
