import { readJsonFile, writeJsonFile } from '../db/fileStorage';
import {
  MapCoordinates,
  MapKwarcabEntity,
  MapKwarranEntity,
  MapGudepEntity,
  DemographicsMapDataset,
} from './mapTypes';
import { DEFAULT_MAP_DATA } from './mapDefaults';

export * from './mapTypes';
export * from './mapDefaults';

const DB_FILENAME = 'demographics-map.json';

export const mapDemographicsService = {
  getDataset: (): DemographicsMapDataset => {
    return readJsonFile<DemographicsMapDataset>(DB_FILENAME, DEFAULT_MAP_DATA);
  },

  resetToDefault: (): DemographicsMapDataset => {
    const fresh = { ...DEFAULT_MAP_DATA, lastModified: new Date().toISOString() };
    writeJsonFile(DB_FILENAME, fresh);
    return fresh;
  },

  updateKwarcab: (data: Partial<MapKwarcabEntity>): MapKwarcabEntity => {
    const ds = mapDemographicsService.getDataset();
    ds.kwarcab = { ...ds.kwarcab, ...data, updatedAt: new Date().toISOString() };
    ds.lastModified = new Date().toISOString();
    writeJsonFile(DB_FILENAME, ds);
    return ds.kwarcab;
  },

  updateKwarran: (id: string, data: Partial<MapKwarranEntity>): MapKwarranEntity | null => {
    const ds = mapDemographicsService.getDataset();
    const idx = ds.kwarrans.findIndex((k) => k.id === id);
    if (idx === -1) return null;
    ds.kwarrans[idx] = { ...ds.kwarrans[idx], ...data, updatedAt: new Date().toISOString() };
    ds.lastModified = new Date().toISOString();
    writeJsonFile(DB_FILENAME, ds);
    return ds.kwarrans[idx];
  },

  upsertGudep: (data: Partial<MapGudepEntity> & { id?: string; pangkalan: string }): MapGudepEntity => {
    const ds = mapDemographicsService.getDataset();
    const id = data.id || `gudep-${Date.now()}`;
    const idx = ds.gudeps.findIndex((g) => g.id === id);
    const existing = idx >= 0 ? ds.gudeps[idx] : null;

    const saved: MapGudepEntity = {
      id,
      kwarranId: data.kwarranId || existing?.kwarranId || ds.kwarrans[0]?.id || 'kwarran-pancoran-mas',
      kwarranName: data.kwarranName || existing?.kwarranName || ds.kwarrans[0]?.name || 'Pancoran Mas',
      pangkalan: data.pangkalan,
      jenjang: data.jenjang || existing?.jenjang || 'SMP/MTs',
      nomorPa: data.nomorPa || existing?.nomorPa || '01.001',
      nomorPi: data.nomorPi || existing?.nomorPi || '01.002',
      koordinat: data.koordinat || existing?.koordinat || ds.kwarcab.center,
      alamat: data.alamat || existing?.alamat || '',
      pembina: data.pembina || existing?.pembina || 'Kak Pembina Gudep',
      kontakWa: data.kontakWa || existing?.kontakWa || '0812-0000-0000',
      status: data.status || existing?.status || 'Aktif',
      akreditasi: data.akreditasi || existing?.akreditasi || 'A',
      jumlahAnggota: data.jumlahAnggota || existing?.jumlahAnggota || { siaga: 0, penggalang: 50, penegak: 0, pandega: 0 },
      pembinaPutra: data.pembinaPutra ?? existing?.pembinaPutra ?? 2,
      pembinaPutri: data.pembinaPutri ?? existing?.pembinaPutri ?? 2,
      fotoUrl: data.fotoUrl || existing?.fotoUrl,
      updatedAt: new Date().toISOString(),
    };

    if (idx >= 0) {
      ds.gudeps[idx] = saved;
    } else {
      ds.gudeps.push(saved);
    }
    ds.lastModified = new Date().toISOString();
    writeJsonFile(DB_FILENAME, ds);
    return saved;
  },

  deleteGudep: (id: string): boolean => {
    const ds = mapDemographicsService.getDataset();
    const before = ds.gudeps.length;
    ds.gudeps = ds.gudeps.filter((g) => g.id !== id);
    if (ds.gudeps.length !== before) {
      ds.lastModified = new Date().toISOString();
      writeJsonFile(DB_FILENAME, ds);
      return true;
    }
    return false;
  },
};
