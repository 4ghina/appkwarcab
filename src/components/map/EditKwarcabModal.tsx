import React from 'react';
import { MapKwarcabEntity, MapCoordinates } from './mapTypes';
import { KwarcabCoordForm } from './kwarcab/KwarcabCoordForm';
import { useKwarcabForm } from './kwarcab/useKwarcabForm';
import { X, Save, Building2 } from 'lucide-react';

interface EditKwarcabModalProps {
  kwarcab: MapKwarcabEntity;
  onSave: (data: Partial<MapKwarcabEntity>) => void;
  onClose: () => void;
  onRequestPickCoordinate: (currentCoords: MapCoordinates, onPicked: (coords: MapCoordinates) => void) => void;
}

export const EditKwarcabModal: React.FC<EditKwarcabModalProps> = ({ kwarcab, onSave, onClose, onRequestPickCoordinate }) => {
  const { form, setForm, handleGetCurrentLocation, handlePickOnMap, handleSubmit } = useKwarcabForm(kwarcab, onSave, onClose, onRequestPickCoordinate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
        <div className="p-4 bg-gradient-to-r from-[#5D4037] to-[#3E2723] text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="text-sm font-black">Edit Koordinat & Wilayah Kwarcab</h3>
              <p className="text-[10px] text-amber-200/80">Otorisasi Superadmin Tingkat Cabang</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-medium text-stone-700">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-[11px] font-bold text-stone-900 mb-1">Nama Kwarcab</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" required />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-1">Kode Cabang</label>
              <input type="text" value={form.nomor} onChange={(e) => setForm({ ...form, nomor: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" required />
            </div>
          </div>
          <KwarcabCoordForm lat={form.lat} lng={form.lng} radiusKm={form.radiusKm} onPickOnMap={handlePickOnMap} onGetCurrentLocation={handleGetCurrentLocation} onChange={(f) => setForm((p) => ({ ...p, ...f }))} />
          <div>
            <label className="block text-[11px] font-bold text-stone-900 mb-1">Ketua Kwartir Cabang</label>
            <input type="text" value={form.ketuaKwarcab} onChange={(e) => setForm({ ...form, ketuaKwarcab: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-stone-900 mb-1">Alamat Kantor Sekretariat</label>
            <textarea rows={2} value={form.alamatSekretariat} onChange={(e) => setForm({ ...form, alamatSekretariat: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-50">Batal</button>
            <button type="submit" className="px-4 py-2 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm">
              <Save className="w-3.5 h-3.5" /><span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
