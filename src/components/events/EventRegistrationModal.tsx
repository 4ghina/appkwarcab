import React from 'react';
import { CabangEvent, UserProfile } from '../../types/scout';
import { ShieldCheck, CheckCircle2, AlertCircle, X, ChevronRight } from 'lucide-react';

export interface EligibilityResult {
  isQualified: boolean;
  isGolonganEligible: boolean;
  hasActiveKTA: boolean;
  hasSKUKualifikasi: boolean;
  notes: string;
}

const EligibilityCheckList: React.FC<{ el: EligibilityResult; user: UserProfile }> = ({ el, user }) => (
  <div className="space-y-2 p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Status Pemeriksaan Persyaratan:</span>
    <div className="flex items-center justify-between">
      <span className="text-stone-600">1. Golongan Pramuka:</span>
      <span className={`font-bold flex items-center gap-1 ${el.isGolonganEligible ? 'text-emerald-700' : 'text-rose-600'}`}>
        {el.isGolonganEligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
        <span>{user.golongan}</span>
      </span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-stone-600">2. Keaktifan KTA Digital:</span>
      <span className="font-bold text-emerald-700 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Aktif</span></span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-stone-600">3. Kualifikasi Tingkat SKU:</span>
      <span className="font-bold text-emerald-700 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>{user.tingkatan}</span></span>
    </div>
  </div>
);

export const EventRegistrationModal: React.FC<{
  isOpen: boolean;
  evt: CabangEvent | null;
  user: UserProfile;
  eligibility: EligibilityResult;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, evt, user, eligibility, onClose, onConfirm }) => {
  if (!isOpen || !evt) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150 space-y-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-bold"><ShieldCheck className="w-5 h-5 text-blue-700" /></div>
            <div>
              <h3 className="text-sm font-extrabold text-stone-900">Validasi Otomatis Berkas Kontingen</h3>
              <p className="text-[11px] text-stone-500">{evt.nama}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500"><X className="w-4 h-4" /></button>
        </div>
        <EligibilityCheckList el={eligibility} user={user} />
        <div className={`p-3 rounded-2xl border text-xs leading-relaxed ${eligibility.isQualified ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
          {eligibility.notes}
        </div>
        <div className="pt-2 flex items-center gap-2">
          <button onClick={onConfirm} disabled={!eligibility.isQualified} className="flex-1 py-3 px-4 rounded-xl bg-[#1E3A8A] hover:bg-[#1E40AF] disabled:bg-stone-300 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5">
            <span>Konfirmasi Pendaftaran</span><ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="py-3 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold">Batal</button>
        </div>
      </div>
    </div>
  );
};
