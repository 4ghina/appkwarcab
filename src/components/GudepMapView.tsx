import React, { useState } from 'react';
import { GudepData } from '../types/scout';
import { MapPin, School, X } from 'lucide-react';
import { GudepInteractiveMap } from './map/GudepInteractiveMap';
import { GudepMapCard } from './map/GudepMapCard';
import { GudepDetailModal } from './map/GudepDetailModal';
import { GudepMapFilters } from './map/GudepMapFilters';

interface GudepMapViewProps {
  gudepList: GudepData[];
  onClose?: () => void;
}

export const GudepMapView: React.FC<GudepMapViewProps> = ({ gudepList, onClose }) => {
  const [selectedKwarran, setSelectedKwarran] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGudep, setSelectedGudep] = useState<GudepData | null>(null);

  const filteredGudep = gudepList.filter(g => {
    const matchKwarran = selectedKwarran === 'Semua' || g.kwarran.toLowerCase().includes(selectedKwarran.toLowerCase());
    const matchSearch = g.pangkalan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        g.nomorPa.includes(searchQuery) || g.nomorPi.includes(searchQuery) ||
                        g.pembina.toLowerCase().includes(searchQuery.toLowerCase());
    return matchKwarran && matchSearch;
  });

  return (
    <div className="w-full pb-20 animate-in fade-in duration-150 space-y-4">
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#2E7D32] via-[#1B5E20] to-[#0D3813] text-white shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-white/20">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-emerald-400 text-stone-950 font-black shadow-sm"><MapPin className="w-4 h-4" /></span>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">Peta & Potensi Gugus Depan</h3>
              <p className="text-sm font-extrabold text-white">Kwartir Cabang Kota Depok</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"><X className="w-4 h-4" /></button>
          )}
        </div>
      </div>
      <GudepInteractiveMap filteredGudep={filteredGudep} onSelectGudep={setSelectedGudep} />
      <GudepMapFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedKwarran={selectedKwarran} setSelectedKwarran={setSelectedKwarran} />
      <div className="space-y-3">
        {filteredGudep.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-stone-200 text-stone-500">
            <School className="w-10 h-10 mx-auto text-stone-300 mb-2" /><p className="text-xs font-semibold">Gugus Depan tidak ditemukan</p>
          </div>
        ) : (
          filteredGudep.map(gudep => <GudepMapCard key={gudep.id} gudep={gudep} onSelect={() => setSelectedGudep(gudep)} />)
        )}
      </div>
      {selectedGudep && <GudepDetailModal gudep={selectedGudep} onClose={() => setSelectedGudep(null)} />}
    </div>
  );
};
