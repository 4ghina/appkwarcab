import React from 'react';
import { X, School, MapPin, Info } from 'lucide-react';
import { ThematicDistrict, ThematicGudepSummary, ThematicMetricDef } from './thematicMapTypes';

export const DrawerHeader: React.FC<{
  district: ThematicDistrict;
  activeMetric: ThematicMetricDef;
  onClose: () => void;
}> = ({ district, activeMetric, onClose }) => {
  const metricResult = district.metrics[activeMetric.id];
  return (
    <div className="p-4 bg-gradient-to-r from-stone-900 to-[#5D4037] text-white flex items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-amber-300 text-[10px] font-black uppercase">
            Kwarran {district.kode}
          </span>
          <span className="text-[10px] text-stone-300">{district.gudepCount.registered} Pangkalan Terdata</span>
        </div>
        <h3 className="text-base font-black text-white mt-1">Kecamatan {district.name}</h3>
        <p className="text-xs text-amber-200">
          {activeMetric.label}: <span className="font-black text-white">{metricResult?.value.toLocaleString('id-ID') || 0} {activeMetric.unit}</span>
        </p>
      </div>
      <button onClick={onClose} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors" title="Tutup Panel">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const DrawerSelectedGudepCard: React.FC<{
  gudep: ThematicGudepSummary;
  onClear: () => void;
}> = ({ gudep, onClear }) => (
  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2.5">
    <div className="flex items-start justify-between gap-2">
      <div>
        <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-extrabold">Gudep {gudep.nomor}</span>
        <h4 className="text-sm font-black text-stone-900 mt-1">{gudep.pangkalan}</h4>
        <p className="text-xs text-stone-600">{gudep.jenjang}</p>
      </div>
      <button onClick={onClear} className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950">Lihat Semua</button>
    </div>
    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
      <div className="p-2 rounded-xl bg-white border border-stone-200/80">
        <span className="text-[10px] text-stone-600 block">Pembina:</span>
        <span className="font-bold text-stone-800">{gudep.pembina}</span>
      </div>
      <div className="p-2 rounded-xl bg-white border border-stone-200/80">
        <span className="text-[10px] text-stone-600 block">Total Peserta Didik:</span>
        <span className="font-bold text-emerald-800">{gudep.totalAnggota} Anggota</span>
      </div>
    </div>
    <div className="text-[11px] text-stone-600 flex items-start gap-1.5">
      <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
      <span>{gudep.alamat || 'Alamat pangkalan resmi Kota Depok'}</span>
    </div>
  </div>
);

export const DrawerGudepListItem: React.FC<{
  gudep: ThematicGudepSummary;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ gudep, isSelected, onSelect }) => (
  <div
    onClick={onSelect}
    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
      isSelected ? 'bg-amber-100/70 border-amber-400 ring-1 ring-amber-400' : 'bg-stone-50/80 border-stone-200/90 hover:bg-stone-100 hover:border-amber-300'
    }`}
  >
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <School className="w-3.5 h-3.5 text-[#5D4037] shrink-0" />
          <h5 className="text-xs font-black text-stone-900 truncate">{gudep.pangkalan}</h5>
        </div>
        <span className="text-[10px] text-stone-600 block pl-5">Gudep {gudep.nomor} • {gudep.jenjang}</span>
      </div>
      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 shrink-0">Aktif</span>
    </div>
  </div>
);

interface ThematicGudepDrawerProps {
  district: ThematicDistrict | null;
  activeMetric: ThematicMetricDef;
  onClose: () => void;
  selectedGudep: ThematicGudepSummary | null;
  onSelectGudep: (g: ThematicGudepSummary) => void;
}

export const ThematicGudepDrawer: React.FC<ThematicGudepDrawerProps> = ({
  district,
  activeMetric,
  onClose,
  selectedGudep,
  onSelectGudep,
}) => {
  if (!district) return null;
  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden flex flex-col max-h-[600px] transition-all">
      <DrawerHeader district={district} activeMetric={activeMetric} onClose={onClose} />
      {activeMetric.notes && (
        <div className="px-4 py-2 bg-amber-50 border-b border-amber-200/60 text-amber-900 text-[11px] flex items-center gap-1.5 font-medium">
          <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>{activeMetric.notes}</span>
        </div>
      )}
      <div className="p-4 overflow-y-auto space-y-3 flex-1">
        {selectedGudep && <DrawerSelectedGudepCard gudep={selectedGudep} onClear={() => onSelectGudep(null as any)} />}
        <div className="text-xs font-black text-stone-700 flex items-center justify-between">
          <span>Daftar Gugus Depan ({district.gudeps.length}):</span>
          <span className="text-[11px] font-normal text-stone-600">Klik untuk melihat profil</span>
        </div>
        <div className="space-y-2">
          {district.gudeps.map((g) => (
            <DrawerGudepListItem key={g.id} gudep={g} isSelected={selectedGudep?.id === g.id} onSelect={() => onSelectGudep(g)} />
          ))}
          {district.gudeps.length === 0 && (
            <div className="p-6 text-center text-xs text-stone-600 bg-stone-50 rounded-2xl">Belum ada Gugus Depan yang terdaftar pada wilayah ini.</div>
          )}
        </div>
      </div>
    </div>
  );
};
