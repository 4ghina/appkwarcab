import React from 'react';
import { ArrowRight, QrCode } from 'lucide-react';
import { UserProfile } from '../../types/scout';
import { DynamicAssetImage } from '../DynamicAssetImage';

interface PublicHeaderProps {
  currentUser: UserProfile | null;
  config: any;
  onOpenVerifier: () => void;
  onOpenPortal: () => void;
  onOpenAuth: () => void;
  onNavigateToPeta?: () => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  currentUser,
  config,
  onOpenVerifier,
  onOpenPortal,
  onOpenAuth,
  onNavigateToPeta,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5D4037] to-[#3E2723] p-1.5 flex items-center justify-center text-amber-300 shadow-xs">
            <DynamicAssetImage
              src={config?.logos?.primary}
              alt="Logo Pramuka"
              fallbackType="logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-wider text-amber-800 uppercase block">
              {config?.kwarcabNomor || '09.22'} • Gerakan Pramuka
            </span>
            <h1 className="text-sm sm:text-base font-black text-stone-900 leading-none">
              {config?.kwarcabName || 'Kwartir Cabang Kota Depok'}
            </h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#beranda" className="text-[#5D4037] hover:text-[#3E2723]">Beranda</a>
          <button
            onClick={onNavigateToPeta || (() => {
              document.getElementById('peta-potensi-preview')?.scrollIntoView({ behavior: 'smooth' });
            })}
            className="hover:text-[#5D4037] flex items-center gap-1 font-extrabold text-amber-900 cursor-pointer"
          >
            <span>Peta Potensi</span>
            <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[9px] rounded-full">Tematik</span>
          </button>
          <a href="#kegiatan" className="hover:text-[#5D4037]">Kegiatan</a>
          <a href="#direktori" className="hover:text-[#5D4037]">Direktori Gudep</a>
          <a href="#berita" className="hover:text-[#5D4037]">Berita</a>
          <a href="#gabung" className="hover:text-[#5D4037]">Cara Gabung</a>
          <a href="#bantuan" className="hover:text-[#5D4037]">Bantuan</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenVerifier}
            className="hidden sm:flex items-center gap-1.5 py-2 px-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100 text-xs font-bold transition-all"
            title="Cek Keabsahan KTA Digital"
          >
            <QrCode className="w-3.5 h-3.5 text-amber-700" />
            <span>Cek KTA</span>
          </button>

          {currentUser ? (
            <button
              onClick={onOpenPortal}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#0D3813] text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
            >
              <span>Portal Saya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#5D4037] to-[#4E342E] hover:from-[#4E342E] hover:to-[#271612] text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
            >
              <span>Masuk / Daftar</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
