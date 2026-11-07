import React from 'react';
import { School, Calendar, FileText, ShieldCheck, MapPin } from 'lucide-react';

interface PublicQuickAccessProps {
  onOpenVerifier: () => void;
  onNavigateToPeta?: () => void;
}

export const PublicQuickAccess: React.FC<PublicQuickAccessProps> = ({ onOpenVerifier, onNavigateToPeta }) => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <button
        onClick={onNavigateToPeta || (() => {
          document.getElementById('peta-potensi-preview')?.scrollIntoView({ behavior: 'smooth' });
        })}
        className="p-3.5 bg-gradient-to-br from-emerald-500 to-[#1B5E20] text-white rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all group flex flex-col justify-between text-left"
      >
        <div className="w-9 h-9 rounded-xl bg-white/20 text-amber-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[9px] font-black uppercase text-emerald-200">Tematik & Realtime</span>
          <h3 className="text-xs font-black text-white">Peta Potensi</h3>
          <p className="text-[10px] text-emerald-100">Sebaran Kwarcab & Gudep</p>
        </div>
      </button>

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
        className="p-3.5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all group flex flex-col justify-between text-left col-span-2 sm:col-span-1"
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
