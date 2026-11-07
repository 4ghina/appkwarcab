import React, { useState } from 'react';
import { Search, MapPin, School, ChevronRight } from 'lucide-react';
import { GudepData } from '../../types/scout';

interface PublicGudepDirectoryProps {
  gudepList: GudepData[];
  onSelectGudepDetail?: (gudep: GudepData) => void;
  onSelectKwarranDetail?: (kwarranName: string) => void;
}

const KWARRAN_LIST = ['Semua', 'Pancoran Mas', 'Sukmajaya', 'Beji', 'Cimanggis', 'Sawangan', 'Tapos', 'Cilodong', 'Cinere', 'Cipayung', 'Bojongsari', 'Limo'];

export const PublicGudepDirectory: React.FC<PublicGudepDirectoryProps> = ({
  gudepList,
  onSelectGudepDetail,
  onSelectKwarranDetail
}) => {
  const [searchGudep, setSearchGudep] = useState('');
  const [selectedKwarran, setSelectedKwarran] = useState('Semua');

  const filteredGudep = gudepList.filter(g => {
    const matchK = selectedKwarran === 'Semua' || g.kwarran.toLowerCase().includes(selectedKwarran.toLowerCase());
    const matchS = g.pangkalan.toLowerCase().includes(searchGudep.toLowerCase()) ||
                   g.nomorPa.includes(searchGudep) ||
                   g.nomorPi.includes(searchGudep) ||
                   g.pembina.toLowerCase().includes(searchGudep.toLowerCase());
    return matchK && matchS;
  });

  return (
    <section id="direktori" className="space-y-4">
      <div>
        <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
          Pangkalan Resmi Terdaftar
        </span>
        <h2 className="text-lg sm:text-xl font-black text-stone-900">Direktori Gugus Depan Se-Kota Depok</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchGudep}
            onChange={(e) => setSearchGudep(e.target.value)}
            placeholder="Cari nama sekolah, nomor gudep (01.001), atau pembina..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-[#5D4037]"
          />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
          {KWARRAN_LIST.map(kw => (
            <button
              key={kw}
              onClick={() => setSelectedKwarran(kw)}
              className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap ${
                selectedKwarran === kw ? 'bg-[#5D4037] text-white' : 'bg-white border text-stone-600'
              }`}
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredGudep.slice(0, 6).map((g) => (
          <div
            key={g.id}
            onClick={() => onSelectGudepDetail?.(g)}
            className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:border-[#5D4037] transition-all cursor-pointer flex flex-col justify-between space-y-2"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] text-stone-500">
                <span className="font-bold text-amber-800">Kwarran {g.kwarran}</span>
                <span className="font-mono">{g.nomorPa} / {g.nomorPi}</span>
              </div>
              <h4 className="text-xs font-black text-stone-900 mt-0.5">{g.pangkalan}</h4>
              <p className="text-[11px] text-stone-600 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                <span className="truncate">{g.alamat}</span>
              </p>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[10px] text-stone-500">
              <span>Pembina: {g.pembina}</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
