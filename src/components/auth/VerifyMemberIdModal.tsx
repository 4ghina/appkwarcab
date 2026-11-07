import React, { useState } from 'react';
import { UserProfile } from '../../types/scout';
import { ShieldCheck, ArrowRight, Loader2, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { PendingReviewModal } from './PendingReviewModal';

interface VerifyMemberIdModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLinkedSuccess: (updatedUser: UserProfile) => void;
}

function applyLinkedProfile(current: UserProfile, official: any): UserProfile {
  return {
    ...current,
    name: official.name || current.name,
    nta: official.ayoPramukaNta,
    ayoPramukaNta: official.ayoPramukaNta,
    ayoPramukaLinked: true,
    ayoPramukaLinkedAt: new Date().toISOString(),
    membershipStatus: 'verified',
    memberCategory: official.memberCategory || current.memberCategory,
    golongan: official.golongan || current.golongan,
    tingkatan: official.tingkatan || current.tingkatan,
    pangkalan: official.pangkalan || current.pangkalan,
    gudepName: official.gudepName || current.gudepName,
    gudepNomor: official.gudepNomor || current.gudepNomor,
    kwarran: official.kwarran || current.kwarran,
    isGaruda: Boolean(official.isGaruda),
    qrToken: official.qrToken || `TOK-AYO-${official.ayoPramukaNta}`,
    officialDocUrl: official.officialDocUrl || '/assets/kta-resmi-sample.pdf'
  };
}

function VerifyIdModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 bg-gradient-to-r from-[#5D4037] to-[#8D6E63] text-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-amber-300">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold">Verifikasi ID Anggota</h3>
          <p className="text-[10px] text-stone-200">Pengaitan Data Resmi Ayo Pramuka Kwarnas</p>
        </div>
      </div>
      <button onClick={onClose} className="text-xs text-stone-300 hover:text-white font-bold">Tutup</button>
    </div>
  );
}

function VerifyIdFormFields({ ntaInput, setNtaInput, errorMessage, loading, onSubmit }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      <div className="space-y-1">
        <label className="block text-xs font-bold text-stone-800">Nomor KTA Ayo Pramuka</label>
        <p className="text-[11px] text-stone-500">Masukkan nomor KTA lengkap (angka nol di awal tetap dipertahankan).</p>
        <input type="text" value={ntaInput} onChange={e => setNtaInput(e.target.value)} placeholder="Contoh: 09.22.01.00421 atau 0018902" className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none" required />
      </div>
      <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
        <span className="text-[10px] font-bold text-stone-500 flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-600" />Uji Cepat Nomor Terdaftar:</span>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => setNtaInput('09.22.01.00421')} className="px-2 py-0.5 rounded-md bg-stone-200/80 hover:bg-stone-300 text-[10px] font-mono text-stone-800">09.22.01.00421 (Dimas - Otomatis)</button>
          <button type="button" onClick={() => setNtaInput('09.22.02.01289')} className="px-2 py-0.5 rounded-md bg-stone-200/80 hover:bg-stone-300 text-[10px] font-mono text-stone-800">09.22.02.01289 (Nabila - Antrean Admin)</button>
          <button type="button" onClick={() => setNtaInput('0018902')} className="px-2 py-0.5 rounded-md bg-stone-200/80 hover:bg-stone-300 text-[10px] font-mono text-stone-800">0018902 (Awalan Nol)</button>
        </div>
      </div>
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" /><span>{errorMessage}</span>
        </div>
      )}
      <div className="pt-2">
        <button type="submit" disabled={loading || !ntaInput.trim()} className="w-full py-2.5 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] disabled:bg-stone-300 text-white font-bold flex items-center justify-center gap-1.5 transition-all shadow-md">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}<span>Verifikasi & Tautkan Sekarang</span>
        </button>
      </div>
    </form>
  );
}

function useVerifyMemberId(currentUser: UserProfile, onLinkedSuccess: (u: UserProfile) => void, onClose: () => void) {
  const [ntaInput, setNtaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<any>(null);
  const [pendingClaim, setPendingClaim] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ntaInput.trim()) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/membership/verify-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ayoPramukaNta: ntaInput.trim(), userId: currentUser.id, userEmail: currentUser.email, userName: currentUser.name })
      });
      const data = await res.json();
      if (!res.ok || !data.success) { setErrorMessage(data.error || 'Verifikasi ID gagal.'); return; }
      if (data.autoLinked) {
        const updated = applyLinkedProfile(currentUser, data.member);
        setSuccessInfo({ member: data.member, updatedUser: updated });
        setTimeout(() => { onLinkedSuccess(updated); onClose(); }, 1500);
      } else if (data.pendingReview) {
        setPendingClaim({ claimId: data.claimId, nta: ntaInput.trim(), pangkalan: data.maskedInfo?.pangkalan, kwarran: data.maskedInfo?.kwarran });
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Terjadi gangguan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return { ntaInput, setNtaInput, loading, errorMessage, successInfo, pendingClaim, setPendingClaim, handleSubmit };
}

export const VerifyMemberIdModal: React.FC<VerifyMemberIdModalProps> = (p) => {
  const s = useVerifyMemberId(p.currentUser, p.onLinkedSuccess, p.onClose);
  if (!p.isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col">
          <VerifyIdModalHeader onClose={p.onClose} />
          <div className="p-5 space-y-4 text-xs text-stone-700">
            {s.successInfo ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-emerald-950 text-sm">Verifikasi Berhasil!</h4>
                <p className="text-xs text-emerald-800">Akun Anda otomatis ditautkan ke data resmi <strong>{s.successInfo.member.name}</strong>. Mengalihkan...</p>
              </div>
            ) : (
              <VerifyIdFormFields ntaInput={s.ntaInput} setNtaInput={s.setNtaInput} errorMessage={s.errorMessage} loading={s.loading} onSubmit={s.handleSubmit} />
            )}
          </div>
        </div>
      </div>
      {s.pendingClaim && <PendingReviewModal isOpen={true} onClose={() => { s.setPendingClaim(null); p.onClose(); }} claimId={s.pendingClaim.claimId} nta={s.pendingClaim.nta} pangkalan={s.pendingClaim.pangkalan} kwarran={s.pendingClaim.kwarran} />}
    </>
  );
};
