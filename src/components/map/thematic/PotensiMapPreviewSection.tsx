import React from 'react';
import { ArrowRight, MapPin, Layers, Award, School, Users } from 'lucide-react';

export const PreviewHeaderSection: React.FC<{ onExplore: () => void }> = ({ onExplore }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="px-2.5 py-0.5 rounded-full bg-[#5D4037] text-white text-[10px] font-black uppercase tracking-wider">Modul Baru</span>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">11 Kecamatan</span>
      </div>
      <h2 className="text-xl sm:text-2xl font-black text-stone-900">Peta Potensi Pramuka Kwarcab</h2>
      <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
        Peta tematik beranotasi yang memvisualisasikan capaian Pramuka Garuda, SKU, SKK, persebaran pembina mahir, dan pangkalan sekolah se-Kota Depok.
      </p>
    </div>
    <button
      onClick={onExplore}
      className="self-start md:self-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-[#5D4037] hover:from-amber-700 hover:to-[#3E2723] text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
    >
      <Layers className="w-4 h-4 text-amber-200" />
      <span>Jelajahi Peta Potensi</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

export const PreviewMetricCards: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <div className="p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-2xs flex items-center gap-3.5">
      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
        <Users className="w-5 h-5" />
      </div>
      <div>
        <span className="text-[10px] font-bold text-stone-600 uppercase block">Peserta Didik</span>
        <div className="text-base font-black text-stone-900">Siaga, Penggalang, Penegak</div>
        <span className="text-[10px] text-emerald-800 font-bold">Terverifikasi per Kwarran</span>
      </div>
    </div>
    <div className="p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-2xs flex items-center gap-3.5">
      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
        <Award className="w-5 h-5" />
      </div>
      <div>
        <span className="text-[10px] font-bold text-stone-600 uppercase block">Capaian Tertinggi</span>
        <div className="text-base font-black text-stone-900">Pramuka Garuda & SKK</div>
        <span className="text-[10px] text-amber-800 font-bold">5 Bidang Warna Kecakapan</span>
      </div>
    </div>
    <div className="p-4 rounded-2xl bg-white/90 border border-stone-200/90 shadow-2xs flex items-center gap-3.5">
      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
        <School className="w-5 h-5" />
      </div>
      <div>
        <span className="text-[10px] font-bold text-stone-600 uppercase block">Pangkalan Satuan</span>
        <div className="text-base font-black text-stone-900">SD, SMP, SMA, PT</div>
        <span className="text-[10px] text-purple-800 font-bold">Gudep Terdaftar & Aktif</span>
      </div>
    </div>
  </div>
);

export const PreviewBottomBanner: React.FC<{ onExplore: () => void }> = ({ onExplore }) => (
  <div
    onClick={onExplore}
    className="p-4 rounded-2xl bg-stone-900 text-white cursor-pointer hover:bg-stone-850 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group border border-stone-800"
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
        <MapPin className="w-4 h-4" />
      </div>
      <div>
        <div className="text-xs font-black group-hover:text-amber-300 transition-colors">
          Peta Tematik Beranotasi Interaktif dengan Garis Penunjuk Statistik
        </div>
        <div className="text-[11px] text-stone-400">
          Buka tampilan peta penuh untuk menyaring data per golongan atau melihat daftar Gudep sekolah
        </div>
      </div>
    </div>
    <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform self-end sm:self-auto">
      <span>Buka Peta Lengkap</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </span>
  </div>
);

export const PotensiMapPreviewSection: React.FC<{ onExploreFullMap: () => void }> = ({ onExploreFullMap }) => (
  <section className="bg-gradient-to-br from-amber-50/70 via-white to-stone-50 rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm space-y-6">
    <PreviewHeaderSection onExplore={onExploreFullMap} />
    <PreviewMetricCards />
    <PreviewBottomBanner onExplore={onExploreFullMap} />
  </section>
);
