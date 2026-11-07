import React from 'react';
import { MapGudepEntity } from '../mapTypes';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

export const GudepDrawerBody: React.FC<{ gudep: MapGudepEntity }> = ({ gudep }) => {
  const total = gudep.jumlahAnggota.siaga + gudep.jumlahAnggota.penggalang + gudep.jumlahAnggota.penegak + gudep.jumlahAnggota.pandega;
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${gudep.koordinat.lat},${gudep.koordinat.lng}`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-stone-50 rounded-2xl space-y-1.5 border border-stone-200/60">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Lokasi & Koordinat Gedung</span>
          </div>
          <p className="text-stone-600 text-[11px] leading-relaxed">{gudep.alamat}</p>
          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-[10px] text-stone-500">
              {gudep.koordinat.lat.toFixed(5)}, {gudep.koordinat.lng.toFixed(5)}
            </span>
            <a href={gmapsUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-1">
              <span>Buka Google Maps</span><ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="p-3 bg-stone-50 rounded-2xl space-y-1.5 border border-stone-200/60">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pembina Gugus Depan</span>
          </div>
          <p className="text-stone-800 text-[11px] font-bold">{gudep.pembina}</p>
          <p className="text-stone-500 text-[10px]">WA: {gudep.kontakWa}</p>
          <span className="inline-block text-[10px] text-stone-500">Tim Pembina: {gudep.pembinaPutra} Pa / {gudep.pembinaPutri} Pi</span>
        </div>
      </div>

      <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-amber-950">Komposisi Peserta Didik Aktif</span>
          <span className="text-xs font-black text-amber-900">{total} Jiwa</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="bg-white/80 p-1.5 rounded-xl border border-amber-200"><div className="text-[10px] font-bold text-emerald-800">Siaga</div><div className="font-black text-stone-800">{gudep.jumlahAnggota.siaga}</div></div>
          <div className="bg-white/80 p-1.5 rounded-xl border border-amber-200"><div className="text-[10px] font-bold text-rose-800">Penggalang</div><div className="font-black text-stone-800">{gudep.jumlahAnggota.penggalang}</div></div>
          <div className="bg-white/80 p-1.5 rounded-xl border border-amber-200"><div className="text-[10px] font-bold text-amber-800">Penegak</div><div className="font-black text-stone-800">{gudep.jumlahAnggota.penegak}</div></div>
          <div className="bg-white/80 p-1.5 rounded-xl border border-amber-200"><div className="text-[10px] font-bold text-purple-800">Pandega</div><div className="font-black text-stone-800">{gudep.jumlahAnggota.pandega}</div></div>
        </div>
      </div>
    </div>
  );
};
