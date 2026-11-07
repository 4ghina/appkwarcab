import { useState } from 'react';
import { MapKwarcabEntity, MapCoordinates } from '../mapTypes';

export function useKwarcabForm(
  kwarcab: MapKwarcabEntity,
  onSave: (data: Partial<MapKwarcabEntity>) => void,
  onClose: () => void,
  onRequestPickCoordinate: (c: MapCoordinates, cb: (coords: MapCoordinates) => void) => void
) {
  const [form, setForm] = useState({
    name: kwarcab.name,
    nomor: kwarcab.nomor,
    kwarda: kwarcab.kwarda,
    lat: kwarcab.center.lat,
    lng: kwarcab.center.lng,
    radiusKm: kwarcab.radiusKm || 18,
    alamatSekretariat: kwarcab.alamatSekretariat,
    ketuaKwarcab: kwarcab.ketuaKwarcab,
    kontakWa: kwarcab.kontakWa,
    totalPotensiTarget: kwarcab.totalPotensiTarget || 45000,
  });

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setForm((prev) => ({ ...prev, lat: Number(p.coords.latitude.toFixed(6)), lng: Number(p.coords.longitude.toFixed(6)) })),
        () => alert('Gagal mendapatkan lokasi GPS. Pastikan izin lokasi aktif.')
      );
    }
  };

  const handlePickOnMap = () => {
    onRequestPickCoordinate({ lat: form.lat, lng: form.lng }, (c) => setForm((p) => ({ ...p, lat: c.lat, lng: c.lng })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: form.name, nomor: form.nomor, kwarda: form.kwarda,
      center: { lat: Number(form.lat), lng: Number(form.lng) },
      radiusKm: Number(form.radiusKm), alamatSekretariat: form.alamatSekretariat,
      ketuaKwarcab: form.ketuaKwarcab, kontakWa: form.kontakWa,
      totalPotensiTarget: Number(form.totalPotensiTarget),
    });
    onClose();
  };

  return { form, setForm, handleGetCurrentLocation, handlePickOnMap, handleSubmit };
}
