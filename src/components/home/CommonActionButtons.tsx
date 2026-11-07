import React from 'react';
import { MapPin, Calendar, Wifi, Search } from 'lucide-react';

interface CommonActionButtonsProps {
  onOpenGudepMap: () => void;
  onOpenEvents: () => void;
  onOpenRfid: () => void;
  onOpenPublicVerify: () => void;
}

export const CommonActionButtons: React.FC<CommonActionButtonsProps> = ({
  onOpenGudepMap,
  onOpenEvents,
  onOpenRfid,
  onOpenPublicVerify,
}) => {
  return (
    <>
      <button type="button" onClick={onOpenGudepMap} className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 text-center">
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-1.5 shadow-2xs">
          <MapPin className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold text-stone-800">Peta Gudep</span>
        <span className="text-[8px] text-blue-700 font-medium">Potensi Wilayah</span>
      </button>

      <button type="button" onClick={onOpenEvents} className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 text-center">
        <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-1.5 shadow-2xs">
          <Calendar className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold text-stone-800">Kegiatan & Kuota</span>
        <span className="text-[8px] text-amber-800 font-medium">Agenda Cabang</span>
      </button>

      <button type="button" onClick={onOpenRfid} className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 text-center">
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5 shadow-2xs">
          <Wifi className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold text-stone-800">KTA Pintar RFID</span>
        <span className="text-[8px] text-emerald-700 font-medium">Absensi & Saldo</span>
      </button>

      <button type="button" onClick={onOpenPublicVerify} className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 text-center">
        <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-700 flex items-center justify-center mb-1.5 shadow-2xs">
          <Search className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold text-stone-800">Cek Dokumen</span>
        <span className="text-[8px] text-stone-600 font-medium">Validasi QR / SK</span>
      </button>
    </>
  );
};
