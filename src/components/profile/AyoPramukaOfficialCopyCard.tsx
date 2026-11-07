import React, { useState } from 'react';
import { UserProfile } from '../../types/scout';
import { FileText, Download, Printer, Eye, QrCode, ShieldCheck, X } from 'lucide-react';

interface AyoPramukaOfficialCopyCardProps {
  user: UserProfile;
}

function OfficialDocViewerModal({ user, onClose, onPrint, onDownload }: any) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 space-y-3 p-5">
        <div className="flex items-center justify-between border-b pb-2">
          <h4 className="text-xs font-bold text-stone-900 uppercase">Salinan Dokumen KTA Ayo Pramuka</h4>
          <button onClick={onClose} className="p-1 hover:bg-stone-100 rounded-full"><X className="w-4 h-4 text-stone-600" /></button>
        </div>
        <div className="p-6 bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl border border-amber-300/80 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-200 flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-amber-900" /></div>
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">Kwartir Nasional Gerakan Pramuka</span>
            <h3 className="text-base font-black text-stone-900">{user.name}</h3>
            <p className="text-xs font-mono font-bold text-amber-900">NTA: {user.nta}</p>
            <p className="text-xs text-stone-600 mt-1">{user.pangkalan} • {user.kwarran}</p>
          </div>
          <div className="w-24 h-24 mx-auto p-1.5 bg-white rounded-xl shadow-xs flex items-center justify-center"><QrCode className="w-20 h-20 text-stone-900" /></div>
          <p className="text-[9px] text-stone-500">Tercatat pada Sistem Informasi Keanggotaan Terpadu Ayo Pramuka</p>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onPrint} className="px-3 py-1.5 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs flex items-center gap-1"><Printer className="w-3.5 h-3.5" /> Cetak</button>
          <button onClick={onDownload} className="px-4 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-black text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Unduh Dokumen Asli</button>
        </div>
      </div>
    </div>
  );
}

function CopyCardLinkedBody({ user, onShowModal, onDownload, onPrint }: any) {
  return (
    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>KTA Nasional Ayo Pramuka ({user.nta})</span>
        </div>
        <p className="text-[11px] text-stone-500">Format PDF Resmi • Tanda Tangan Digital Kwarnas • Status Aktif s.d {user.masaBerlaku || 'Seumur Hidup'}</p>
      </div>
      <div className="flex items-center gap-1.5 w-full sm:w-auto">
        <button onClick={onShowModal} className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-1 transition-all">
          <Eye className="w-3.5 h-3.5" /><span>Lihat</span>
        </button>
        <button onClick={onDownload} className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black flex items-center justify-center gap-1 transition-all">
          <Download className="w-3.5 h-3.5" /><span>Unduh PDF</span>
        </button>
        <button onClick={onPrint} className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-all">
          <Printer className="w-3.5 h-3.5" /><span>Cetak</span>
        </button>
      </div>
    </div>
  );
}

export const AyoPramukaOfficialCopyCard: React.FC<AyoPramukaOfficialCopyCardProps> = ({ user }) => {
  const [showDocModal, setShowDocModal] = useState(false);
  const isLinked = Boolean(user.nta && (user.membershipStatus === 'verified' || user.ayoPramukaLinked));

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = user.officialDocUrl || '/assets/kta-resmi-sample.pdf';
    link.download = `KTA-AyoPramuka-${user.nta || 'Resmi'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs space-y-3.5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold"><FileText className="w-4 h-4" /></div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-900">Salinan KTA Resmi Ayo Pramuka</h3>
              <p className="text-[10px] text-stone-500">Dokumen Arsip Terverifikasi Kwartir Nasional</p>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${isLinked ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}>
            {isLinked ? 'Dokumen Sah Tersedia' : 'Belum Ditautkan'}
          </span>
        </div>
        {isLinked ? (
          <CopyCardLinkedBody user={user} onShowModal={() => setShowDocModal(true)} onDownload={handleDownload} onPrint={() => window.print()} />
        ) : (
          <div className="p-4 bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-center text-xs text-stone-500 space-y-1">
            <p className="font-semibold">Salinan KTA Resmi belum tersedia</p>
            <p className="text-[11px] text-stone-400">Lakukan Verifikasi ID Anggota Ayo Pramuka terlebih dahulu untuk membuka akses arsip digital resmi.</p>
          </div>
        )}
      </div>
      {showDocModal && <OfficialDocViewerModal user={user} onClose={() => setShowDocModal(false)} onPrint={() => window.print()} onDownload={handleDownload} />}
    </>
  );
};
