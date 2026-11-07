import React from 'react';
import { DemographicsMapDataset, MapGudepEntity, MapKwarcabEntity, MapKwarranEntity, MapCoordinates } from './mapTypes';
import { INITIAL_MAP_DATASET } from './defaultMapData';

export function useMapCrudActions(
  dataset: DemographicsMapDataset,
  setDataset: React.Dispatch<React.SetStateAction<DemographicsMapDataset>>,
  setSelectedGudep: (g: MapGudepEntity | null) => void,
  setPickedCoordinate: (c: MapCoordinates | null) => void,
  setPickingCallback: (cb: any) => void
) {
  const handleUpdateKwarcab = async (data: Partial<MapKwarcabEntity>) => {
    const nextKw = { ...dataset.kwarcab, ...data, updatedAt: new Date().toISOString() };
    setDataset((prev) => ({ ...prev, kwarcab: nextKw }));
    fetch('/api/map/kwarcab', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).catch(() => {});
  };

  const handleUpdateKwarran = async (id: string, data: Partial<MapKwarranEntity>) => {
    const updated = dataset.kwarrans.map((k) => (k.id === id ? { ...k, ...data } : k));
    setDataset((prev) => ({ ...prev, kwarrans: updated }));
    fetch(`/api/map/kwarran/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).catch(() => {});
  };

  const handleSaveGudep = async (data: Partial<MapGudepEntity>) => {
    const isNew = !data.id || data.id === 'new';
    const id = isNew ? `gudep-${Date.now()}` : data.id!;
    const saved = { ...data, id, updatedAt: new Date().toISOString() } as MapGudepEntity;
    setDataset((prev) => {
      const idx = prev.gudeps.findIndex((g) => g.id === id);
      return { ...prev, gudeps: idx >= 0 ? prev.gudeps.map((g) => (g.id === id ? saved : g)) : [...prev.gudeps, saved] };
    });
    setSelectedGudep(saved);
    fetch('/api/map/gudep', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).catch(() => {});
  };

  const handleDeleteGudep = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data Gudep ini?')) return;
    setDataset((prev) => ({ ...prev, gudeps: prev.gudeps.filter((g) => g.id !== id) }));
    setSelectedGudep(null);
    fetch(`/api/map/gudep/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const handleResetData = async () => {
    if (!confirm('Muat ulang data sampel default untuk Kwarcab, Kwarran, dan Gudep?')) return;
    try {
      const res = await fetch('/api/map/reset', { method: 'POST' });
      const json = await res.json();
      if (json?.data) setDataset(json.data);
    } catch (e) {
      setDataset(INITIAL_MAP_DATASET);
    }
  };

  const handleRequestPick = (initialCoords: MapCoordinates, callback: (c: MapCoordinates) => void) => {
    setPickedCoordinate(initialCoords);
    setPickingCallback(() => (coords: MapCoordinates) => {
      setPickedCoordinate(coords);
      callback(coords);
      setPickingCallback(null);
    });
  };

  return { handleUpdateKwarcab, handleUpdateKwarran, handleSaveGudep, handleDeleteGudep, handleResetData, handleRequestPick };
}
