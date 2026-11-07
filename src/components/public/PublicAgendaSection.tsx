import React, { useState } from 'react';
import { Calendar, MapPin, Users, X, ArrowRight } from 'lucide-react';
import { CabangEvent } from '../../types/scout';

interface PublicAgendaSectionProps {
  events: CabangEvent[];
  onOpenAuth: (redirectPath?: string) => void;
  onOpenPortal: () => void;
  isLoggedIn: boolean;
}

export const PublicAgendaSection: React.FC<PublicAgendaSectionProps> = ({
  events,
  onOpenAuth,
  onOpenPortal,
  isLoggedIn
}) => {
  const [selectedEvent, setSelectedEvent] = useState<CabangEvent | null>(null);

  return (
    <section id="kegiatan" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
            Agenda Resmi Cabang
          </span>
          <h2 className="text-lg sm:text-xl font-black text-stone-900">Kegiatan & Pelatihan Mendatang</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.slice(0, 3).map((ev) => (
          <div
            key={ev.id}
            onClick={() => setSelectedEvent(ev)}
            className="p-4 bg-white rounded-3xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-[#5D4037] transition-all cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 uppercase">
                  {ev.kategori || ev.kategoriGolongan?.join(', ')}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {ev.status || 'Pendaftaran Dibuka'}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-stone-900 leading-snug">{ev.nama}</h3>
              <div className="space-y-1 text-[11px] text-stone-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{ev.tanggal}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{ev.lokasi}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
              <span className="text-stone-500 font-mono text-[10px]">Kuota: {ev.kuotaTerisi ?? ev.terdaftar ?? 0}/{ev.kuotaTotal ?? (ev.kuotaPerGudep * 10)}</span>
              <span className="text-[11px] font-bold text-[#5D4037] flex items-center gap-1">
                Detail <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="text-[10px] font-bold uppercase text-amber-800">{selectedEvent.kategori || selectedEvent.kategoriGolongan?.join(', ')}</span>
              <button onClick={() => setSelectedEvent(null)} className="p-1 rounded-full text-stone-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="text-sm font-black text-stone-900">{selectedEvent.nama}</h4>
            <div className="space-y-1.5 text-xs text-stone-600">
              <p><strong className="text-stone-800">Tanggal:</strong> {selectedEvent.tanggal}</p>
              <p><strong className="text-stone-800">Lokasi:</strong> {selectedEvent.lokasi}</p>
              <p><strong className="text-stone-800">Penyelenggara:</strong> {selectedEvent.organizer || 'Kwarcab Kota Depok'}</p>
              <p className="text-[11px] pt-1">{selectedEvent.deskripsi || selectedEvent.tema}</p>
            </div>
            <div className="pt-2 flex items-center gap-2">
              <button onClick={() => setSelectedEvent(null)} className="py-2 px-3 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold">
                Tutup
              </button>
              <button
                onClick={() => { setSelectedEvent(null); if (isLoggedIn) onOpenPortal(); else onOpenAuth('/portal'); }}
                className="flex-1 py-2 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold"
              >
                {isLoggedIn ? 'Buka Pendaftaran di Portal' : 'Masuk untuk Mendaftar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
