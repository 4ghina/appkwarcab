export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface MapKwarcabEntity {
  id: string;
  name: string;
  nomor: string;
  kwarda: string;
  center: MapCoordinates;
  defaultZoom: number;
  radiusKm: number;
  alamatSekretariat: string;
  ketuaKwarcab: string;
  kontakWa: string;
  totalPotensiTarget: number;
  updatedAt: string;
}

export interface MapKwarranEntity {
  id: string;
  name: string;
  kecamatan: string;
  kode: string;
  center: MapCoordinates;
  ketuaKwarran: string;
  kontakWa: string;
  alamatKantor: string;
  warnaTema: string;
  updatedAt: string;
}

export type JenjangSekolah = 'SD/MI' | 'SMP/MTs' | 'SMA/SMK/MA' | 'Perguruan Tinggi' | 'Komunitas';

export interface MapGudepEntity {
  id: string;
  kwarranId: string;
  kwarranName: string;
  pangkalan: string;
  jenjang: JenjangSekolah;
  nomorPa: string;
  nomorPi: string;
  koordinat: MapCoordinates;
  alamat: string;
  pembina: string;
  kontakWa: string;
  status: 'Aktif' | 'Kurang Aktif' | 'Belum Her-Registrasi';
  akreditasi: 'A' | 'B' | 'C' | 'Belum';
  jumlahAnggota: {
    siaga: number;
    penggalang: number;
    penegak: number;
    pandega: number;
  };
  pembinaPutra: number;
  pembinaPutri: number;
  fotoUrl?: string;
  updatedAt: string;
}

export interface DemographicsMapDataset {
  kwarcab: MapKwarcabEntity;
  kwarrans: MapKwarranEntity[];
  gudeps: MapGudepEntity[];
  lastModified: string;
}

export type MapRoleMode = 'superadmin' | 'admin_kwarran' | 'admin_gudep';

export interface MapFilterState {
  kwarranId: string;
  jenjang: string;
  searchQuery: string;
  showBoundaries: boolean;
  showPins: boolean;
  showHeatmap: boolean;
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
}
