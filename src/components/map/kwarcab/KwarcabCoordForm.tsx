import React from 'react';
import { Navigation, MapPin } from 'lucide-react';

interface KwarcabCoordFormProps {
  lat: number;
  lng: number;
  radiusKm: number;
  onPickOnMap: () => void;
  onGetCurrentLocation: () => void;
  onChange: (fields: any) => void;
}

const KwarcabLatLongInputs: React.FC<{
  lat: number;
  lng: number;
  radiusKm: number;
  onChange: (f: any) => void;
}> = (p) => (
  <div className="space-y-2">
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="text-[10px] text-stone-500">Latitude</label>
        <input type="number" step="any" value={p.lat} onChange={(e) => p.onChange({ lat: parseFloat(e.target.value) || 0 })} className="w-full px-2.5 py-1.5 border border-amber-300 rounded-lg text-xs font-mono bg-white" required />
      </div>
      <div>
        <label className="text-[10px] text-stone-500">Longitude</label>
        <input type="number" step="any" value={p.lng} onChange={(e) => p.onChange({ lng: parseFloat(e.target.value) || 0 })} className="w-full px-2.5 py-1.5 border border-amber-300 rounded-lg text-xs font-mono bg-white" required />
      </div>
    </div>
    <div>
      <label className="block text-[10px] text-stone-600">Radius Batas Pengawasan (Km)</label>
      <input type="number" value={p.radiusKm} onChange={(e) => p.onChange({ radiusKm: Number(e.target.value) })} className="w-full px-2.5 py-1.5 border border-amber-300 rounded-lg text-xs bg-white" required />
    </div>
  </div>
);

export const KwarcabCoordForm: React.FC<KwarcabCoordFormProps> = (p) => (
  <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
    <div className="flex items-center justify-between">
      <span className="font-bold text-amber-950 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-amber-700" />Titik Pusat Wilayah (Koordinat GPS)
      </span>
      <div className="flex gap-1.5">
        <button type="button" onClick={p.onPickOnMap} className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1">
          <MapPin className="w-3 h-3" /><span>Pilih di Peta</span>
        </button>
        <button type="button" onClick={p.onGetCurrentLocation} className="px-2 py-1 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-[10px] font-bold flex items-center gap-1">
          <Navigation className="w-3 h-3" /><span>GPS Saya</span>
        </button>
      </div>
    </div>
    <KwarcabLatLongInputs lat={p.lat} lng={p.lng} radiusKm={p.radiusKm} onChange={p.onChange} />
  </div>
);
