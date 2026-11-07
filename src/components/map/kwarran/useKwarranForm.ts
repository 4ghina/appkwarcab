import { useState } from 'react';
import { MapKwarranEntity, MapCoordinates } from '../mapTypes';

export function useKwarranForm(
  kwarrans: MapKwarranEntity[],
  initialKwarranId: string | undefined,
  onSave: (id: string, data: Partial<MapKwarranEntity>) => void,
  onClose: () => void,
  onRequestPickCoordinate: (c: MapCoordinates, cb: (coords: MapCoordinates) => void) => void
) {
  const [selectedId, setSelectedId] = useState(initialKwarranId || kwarrans[0]?.id || '');
  const current = kwarrans.find((k) => k.id === selectedId) || kwarrans[0];

  const [form, setForm] = useState({
    name: current.name, kecamatan: current.kecamatan, kode: current.kode,
    lat: current.center.lat, lng: current.center.lng, ketuaKwarran: current.ketuaKwarran,
    kontakWa: current.kontakWa, alamatKantor: current.alamatKantor, warnaTema: current.warnaTema || '#15803D',
  });

  const handleSelectKwarran = (id: string) => {
    setSelectedId(id);
    const target = kwarrans.find((k) => k.id === id);
    if (target) {
      setForm({
        name: target.name, kecamatan: target.kecamatan, kode: target.kode,
        lat: target.center.lat, lng: target.center.lng, ketuaKwarran: target.ketuaKwarran,
        kontakWa: target.kontakWa, alamatKantor: target.alamatKantor, warnaTema: target.warnaTema || '#15803D',
      });
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setForm((prev) => ({ ...prev, lat: Number(p.coords.latitude.toFixed(6)), lng: Number(p.coords.longitude.toFixed(6)) })),
        () => alert('Gagal mendapatkan lokasi GPS.')
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(selectedId, {
      name: form.name, kecamatan: form.kecamatan, kode: form.kode,
      center: { lat: Number(form.lat), lng: Number(form.lng) },
      ketuaKwarran: form.ketuaKwarran, kontakWa: form.kontakWa,
      alamatKantor: form.alamatKantor, warnaTema: form.warnaTema,
    });
    onClose();
  };

  return { selectedId, form, setForm, handleSelectKwarran, handleGetCurrentLocation, handleSubmit };
}
