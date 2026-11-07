import React from 'react';
import { Navigation, MapPin } from 'lucide-react';

interface KwarranCoordFormProps {
  lat: number;
  lng: number;
  onPickOnMap: () => void;
  onGetCurrentLocation: () => void;
  onChange: (coords: { lat: number; lng: number }) => void;
}

const KwarranLatLongInputs: React.FC<{
  lat: number;
  lng: number;
  onChange: (c: { lat: number; lng: number }) => void;
}> = ({ lat, lng, onChange }) => (
  <div className="grid grid-cols-2 gap-2">
    <div>
      <label className="text-[10px] text-stone-500">Latitude</label>
      <input type="number" step="any" value={lat} onChange={(e) => onChange({ lat: parseFloat(e.target.value) || 0, lng })} className="w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs font-mono bg-white" required />
    </div>
    <div>
      <label className="text-[10px] text-stone-500">Longitude</label>
      <input type="number" step="any" value={lng} onChange={(e) => onChange({ lat, lng: parseFloat(e.target.value) || 0 })} className="w-full px-2.5 py-1.5 border border-emerald-300 rounded-lg text-xs font-mono bg-white" required />
    </div>
  </div>
);

export const KwarranCoordForm: React.FC<KwarranCoordFormProps> = (p) => (
  <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
    <div className="flex items-center justify-between">
      <span className="font-bold text-emerald-950 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-emerald-700" />Titik Pusat Ranting (Koordinat GPS)
      </span>
      <div className="flex gap-1.5">
        <button type="button" onClick={p.onPickOnMap} className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-[10px] font-bold flex items-center gap-1">
          <MapPin className="w-3 h-3" /><span>Pilih di Peta</span>
        </button>
        <button type="button" onClick={p.onGetCurrentLocation} className="px-2 py-1 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-[10px] font-bold flex items-center gap-1">
          <Navigation className="w-3 h-3" /><span>GPS Saya</span>
        </button>
      </div>
    </div>
    <KwarranLatLongInputs lat={p.lat} lng={p.lng} onChange={p.onChange} />
  </div>
);
