import React from 'react';
import { School, Calendar, FileText, ShieldCheck } from 'lucide-react';

interface PublicQuickAccessProps {
  onOpenVerifier: () => void;
}

export const PublicQuickAccess: React.FC<PublicQuickAccessProps> = ({ onOpenVerifier }) => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <a
        href="#direktori"
        className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between"
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
          <School className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs font-black text-stone-900">Cari Gudep</h3>
          <p className="text-[10px] text-stone-500">Direktori pangkalan resmi</p>
        </div>
      </a>

      <a
        href="#kegiatan"
        className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between"
      >
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs font-black text-stone-900">Lihat Kegiatan</h3>
          <p className="text-[10px] text-stone-500">Agenda & kuota kontingen</p>
        </div>
      </a>

      <a
        href="#berita"
        className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between"
      >
        <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs font-black text-stone-900">Pengumuman</h3>
          <p className="text-[10px] text-stone-500">Surat edaran & warta</p>
        </div>
      </a>

      <button
        onClick={onOpenVerifier}
        className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between text-left"
      >
        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs font-black text-stone-900">Cek Dokumen & KTA</h3>
          <p className="text-[10px] text-stone-500">Verifikasi keaslian publik</p>
        </div>
      </button>
    </section>
  );
};
