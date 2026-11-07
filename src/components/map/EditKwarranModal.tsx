import React from 'react';
import { MapKwarranEntity, MapCoordinates } from './mapTypes';
import { KwarranCoordForm } from './kwarran/KwarranCoordForm';
import { KwarranLeaderAndOffice } from './kwarran/KwarranLeaderAndOffice';
import { useKwarranForm } from './kwarran/useKwarranForm';
import { X, Save, MapPin } from 'lucide-react';

interface EditKwarranModalProps {
  kwarrans: MapKwarranEntity[];
  initialKwarranId?: string;
  onSave: (id: string, data: Partial<MapKwarranEntity>) => void;
  onClose: () => void;
  onRequestPickCoordinate: (currentCoords: MapCoordinates, onPicked: (coords: MapCoordinates) => void) => void;
}

export const EditKwarranModal: React.FC<EditKwarranModalProps> = ({ kwarrans, initialKwarranId, onSave, onClose, onRequestPickCoordinate }) => {
  const { selectedId, form, setForm, handleSelectKwarran, handleGetCurrentLocation, handleSubmit } = useKwarranForm(kwarrans, initialKwarranId, onSave, onClose, onRequestPickCoordinate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
        <div className="p-4 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-300" />
            <div><h3 className="text-sm font-black">Edit Wilayah Kwarran</h3><p className="text-[10px] text-emerald-200/80">Otorisasi Admin Tingkat Ranting</p></div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-medium text-stone-700">
          <div>
            <label className="block text-[11px] font-bold text-stone-900 mb-1">Pilih Kwartir Ranting</label>
            <select value={selectedId} onChange={(e) => handleSelectKwarran(e.target.value)} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-emerald-50/50 font-bold">
              {kwarrans.map((k) => <option key={k.id} value={k.id}>{k.name} ({k.kecamatan})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1">Nama Kecamatan</label>
              <input type="text" value={form.kecamatan} onChange={(e) => setForm({ ...form, kecamatan: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" required />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1">Kode Ranting</label>
              <input type="text" value={form.kode} onChange={(e) => setForm({ ...form, kode: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" required />
            </div>
          </div>
          <KwarranCoordForm lat={form.lat} lng={form.lng} onPickOnMap={() => onRequestPickCoordinate({ lat: form.lat, lng: form.lng }, (c) => setForm((p) => ({ ...p, lat: c.lat, lng: c.lng })))} onGetCurrentLocation={handleGetCurrentLocation} onChange={(coords) => setForm((p) => ({ ...p, ...coords }))} />
          <KwarranLeaderAndOffice ketuaKwarran={form.ketuaKwarran} warnaTema={form.warnaTema} alamatKantor={form.alamatKantor} onChange={(f) => setForm((p) => ({ ...p, ...f }))} />
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-50">Batal</button>
            <button type="submit" className="px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm"><Save className="w-3.5 h-3.5" /><span>Simpan Wilayah</span></button>
          </div>
        </form>
      </div>
    </div>
  );
};
