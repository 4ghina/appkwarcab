import { useState } from 'react';
import { MapGudepEntity, MapKwarranEntity, MapCoordinates, JenjangSekolah } from '../mapTypes';

export function useGudepForm(
  gudep: MapGudepEntity | null | undefined,
  kwarrans: MapKwarranEntity[],
  onSave: (data: Partial<MapGudepEntity>) => void,
  onClose: () => void,
  onRequestPickCoordinate: (c: MapCoordinates, cb: (coords: MapCoordinates) => void) => void
) {
  const isEditing = Boolean(gudep);
  const defaultKwarran = kwarrans[0];

  const [form, setForm] = useState({
    id: gudep?.id,
    pangkalan: gudep?.pangkalan || '',
    kwarranId: gudep?.kwarranId || defaultKwarran?.id || '',
    jenjang: (gudep?.jenjang || 'SMP/MTs') as JenjangSekolah,
    nomorPa: gudep?.nomorPa || '01.001',
    nomorPi: gudep?.nomorPi || '01.002',
    lat: gudep?.koordinat.lat || defaultKwarran?.center.lat || -6.4025,
    lng: gudep?.koordinat.lng || defaultKwarran?.center.lng || 106.7942,
    alamat: gudep?.alamat || '',
    pembina: gudep?.pembina || '',
    kontakWa: gudep?.kontakWa || '0812-0000-0000',
    status: gudep?.status || 'Aktif',
    akreditasi: gudep?.akreditasi || 'A',
    siaga: gudep?.jumlahAnggota.siaga || 0,
    penggalang: gudep?.jumlahAnggota.penggalang || 0,
    penegak: gudep?.jumlahAnggota.penegak || 0,
    pandega: gudep?.jumlahAnggota.pandega || 0,
    pembinaPutra: gudep?.pembinaPutra || 2,
    pembinaPutri: gudep?.pembinaPutri || 2,
    fotoUrl: gudep?.fotoUrl || '',
  });

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setForm((prev) => ({ ...prev, lat: Number(p.coords.latitude.toFixed(6)), lng: Number(p.coords.longitude.toFixed(6)) })),
        () => alert('Gagal mendapatkan lokasi GPS.')
      );
    }
  };

  const handlePickOnMap = () => {
    onRequestPickCoordinate({ lat: form.lat, lng: form.lng }, (c) => setForm((p) => ({ ...p, lat: c.lat, lng: c.lng })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetKwarran = kwarrans.find((k) => k.id === form.kwarranId) || defaultKwarran;
    onSave({
      id: form.id, pangkalan: form.pangkalan, kwarranId: form.kwarranId, kwarranName: targetKwarran?.kecamatan || 'Pancoran Mas',
      jenjang: form.jenjang, nomorPa: form.nomorPa, nomorPi: form.nomorPi,
      koordinat: { lat: Number(form.lat), lng: Number(form.lng) }, alamat: form.alamat, pembina: form.pembina,
      kontakWa: form.kontakWa, status: form.status as any, akreditasi: form.akreditasi as any,
      jumlahAnggota: { siaga: Number(form.siaga), penggalang: Number(form.penggalang), penegak: Number(form.penegak), pandega: Number(form.pandega) },
      pembinaPutra: Number(form.pembinaPutra), pembinaPutri: Number(form.pembinaPutri), fotoUrl: form.fotoUrl,
    });
    onClose();
  };

  return { isEditing, form, setForm, handleGetCurrentLocation, handlePickOnMap, handleSubmit };
}
