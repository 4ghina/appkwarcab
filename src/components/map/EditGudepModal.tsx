import React from 'react';
import { MapGudepEntity, MapKwarranEntity, MapCoordinates } from './mapTypes';
import { GudepBasicFields } from './gudep/GudepBasicFields';
import { GudepCoordSection } from './gudep/GudepCoordSection';
import { GudepDemographicsSection } from './gudep/GudepDemographicsSection';
import { useGudepForm } from './gudep/useGudepForm';
import { X, Save, School } from 'lucide-react';

interface EditGudepModalProps {
  gudep?: MapGudepEntity | null;
  kwarrans: MapKwarranEntity[];
  onSave: (data: Partial<MapGudepEntity>) => void;
  onClose: () => void;
  onRequestPickCoordinate: (currentCoords: MapCoordinates, onPicked: (coords: MapCoordinates) => void) => void;
}

export const EditGudepModal: React.FC<EditGudepModalProps> = ({ gudep, kwarrans, onSave, onClose, onRequestPickCoordinate }) => {
  const { isEditing, form, setForm, handleGetCurrentLocation, handlePickOnMap, handleSubmit } = useGudepForm(gudep, kwarrans, onSave, onClose, onRequestPickCoordinate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
        <div className="p-4 bg-gradient-to-r from-amber-700 to-amber-900 text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="text-sm font-black">{isEditing ? 'Edit Koordinat & Profil Gudep' : 'Tambah Gudep Pangkalan Baru'}</h3>
              <p className="text-[10px] text-amber-200/80">Otorisasi Pembina / Admin Gugus Depan Sekolah</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-medium text-stone-700">
          <GudepBasicFields pangkalan={form.pangkalan} kwarranId={form.kwarranId} jenjang={form.jenjang} nomorPa={form.nomorPa} nomorPi={form.nomorPi} kwarrans={kwarrans} onChange={(f) => setForm((p) => ({ ...p, ...f }))} />
          <GudepCoordSection lat={form.lat} lng={form.lng} onPickOnMap={handlePickOnMap} onGetCurrentLocation={handleGetCurrentLocation} onChange={(c) => setForm((p) => ({ ...p, ...c }))} />
          <GudepDemographicsSection siaga={form.siaga} penggalang={form.penggalang} penegak={form.penegak} pandega={form.pandega} pembina={form.pembina} kontakWa={form.kontakWa} alamat={form.alamat} onChange={(f) => setForm((p) => ({ ...p, ...f }))} />
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-50">Batal</button>
            <button type="submit" className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm">
              <Save className="w-3.5 h-3.5" /><span>{isEditing ? 'Simpan Perubahan' : 'Daftarkan Gudep'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
