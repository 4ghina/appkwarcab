import React, { useState } from 'react';
import { X, Search, ShieldCheck, QrCode } from 'lucide-react';
import { UserProfile } from '../types/scout';
import { PROFILES_BY_ROLE } from '../data/mockData';
import { VerifierResultView } from './verifier/VerifierResultView';

async function verifyQuery(code: string, currentUser?: UserProfile | null) {
  const query = code.trim();
  const isOfficer = Boolean(currentUser && ['superadmin_kwarcab', 'admin_kwarran', 'pembina', 'pembina_satuan'].includes(currentUser.role));

  try {
    const url = `/api/public/verify-qr/${encodeURIComponent(query)}${isOfficer ? '?access=authorized' : ''}`;
    const res = await fetch(url);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('Backend QR lookup fallback', e);
  }

  // Fallback to local profile database
  const qLower = query.toLowerCase();
  const profiles = Object.values(PROFILES_BY_ROLE);
  if (currentUser && !profiles.some(p => p.id === currentUser.id)) profiles.push(currentUser);

  const matched = profiles.find(p =>
    (p.nta && p.nta.toLowerCase() === qLower) ||
    (p.provisionalNta && p.provisionalNta.toLowerCase() === qLower) ||
    (p.ayoPramukaNta && p.ayoPramukaNta.toLowerCase() === qLower) ||
    p.name.toLowerCase().includes(qLower)
  );

  if (matched) {
    const ntaStr = matched.ayoPramukaNta || matched.nta || matched.provisionalNta;
    return {
      valid: true,
      fullAccess: isOfficer,
      nta: isOfficer ? ntaStr : `${ntaStr?.slice(0, 8)}****`,
      name: isOfficer ? matched.name : `${matched.name.split(' ')[0]} ${matched.name.split(' ')[1]?.[0] || ''}.`,
      golongan: matched.golongan,
      tingkatan: matched.tingkatan,
      pangkalan: matched.pangkalan || matched.gudepName || 'Gugus Depan Pangkalan',
      kwarran: matched.kwarran || 'Kwartir Ranting',
      status: matched.membershipStatus === 'verified' ? 'Anggota Sah Terverifikasi' : 'Dalam Proses Verifikasi Gudep',
      isGaruda: matched.isGaruda,
      validUntil: matched.masaBerlaku || '31 Des 2028',
      officialDocUrl: matched.officialDocUrl || '/assets/kta-resmi-sample.pdf'
    };
  }

  return { valid: false, message: `Nomor KTA / Token QR "${code}" tidak ditemukan pada pangkalan data Kwartir Cabang.` };
}

function VerifierModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 bg-gradient-to-r from-[#5D4037] to-[#8D6E63] text-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-amber-300">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold">Verifikasi Dokumen & QR KTA</h3>
          <p className="text-[10px] text-stone-200">Layanan Cek Keabsahan Publik Terbuka</p>
        </div>
      </div>
      <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function VerifierSearchForm({ searchCode, setSearchCode, onVerify, loading }: any) {
  return (
    <form onSubmit={onVerify} className="space-y-2">
      <label className="block text-xs font-semibold text-stone-700">
        Masukkan Nomor KTA Ayo Pramuka atau Tempel Token QR
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          placeholder="Contoh: 09.22.01.00421 atau TOK-AYO-..."
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold flex items-center gap-1 shadow-md"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{loading ? '...' : 'Periksa'}</span>
        </button>
      </div>
    </form>
  );
}

export const PublicDocumentVerifierModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
}> = ({ isOpen, onClose, currentUser }) => {
  const [searchCode, setSearchCode] = useState(currentUser?.nta || '09.22.01.00421');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyQuery(searchCode, currentUser);
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]">
        <VerifierModalHeader onClose={onClose} />
        <div className="p-4 overflow-y-auto space-y-4">
          <VerifierSearchForm searchCode={searchCode} setSearchCode={setSearchCode} onVerify={handleVerify} loading={loading} />
          {result && <VerifierResultView result={result} />}
        </div>
      </div>
    </div>
  );
};
