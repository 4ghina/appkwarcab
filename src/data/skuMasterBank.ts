// Bank Data Persyaratan SKU Nasional Gerakan Pramuka
// Berdasarkan Keputusan Kwartir Nasional Gerakan Pramuka Nomor 198 Tahun 2011
// Sumber: 4 Berkas Dokumen Resmi (SKU-Siaga.pdf, SKU-Penggalang.pdf, SKU-Penegak.pdf, SKU-Pandega.pdf)
// Total 259 Butir Persyaratan:
// - Siaga: Mula (34), Bantu (33), Tata (33) = 100 Butir
// - Penggalang: Ramu (30), Rakit (30), Terap (30) = 90 Butir
// - Penegak: Bantara (23), Laksana (22) = 45 Butir
// - Pandega: Pandega (24) = 24 Butir

import type { SKUMasterItem } from './sku/skuTypes';
import { SKU_SIAGA_MULA, SKU_SIAGA_BANTU, SKU_SIAGA_TATA } from './sku/skuSiaga';
import { SKU_PENGGALANG_RAMU, SKU_PENGGALANG_RAKIT, SKU_PENGGALANG_TERAP } from './sku/skuPenggalang';
import { SKU_PENEGAK_BANTARA } from './sku/skuPenegakBantara';
import { SKU_PENEGAK_LAKSANA } from './sku/skuPenegakLaksana';
import { SKU_PANDEGA } from './sku/skuPandega';

export * from './sku/skuTypes';
export * from './sku/religiousBranches';
export * from './sku/skuSiaga';
export * from './sku/skuPenggalang';
export * from './sku/skuPenegakBantara';
export * from './sku/skuPenegakLaksana';
export * from './sku/skuPandega';

// Master Combined Bank
export const ALL_MASTER_SKU_ITEMS: SKUMasterItem[] = [
  ...SKU_SIAGA_MULA,
  ...SKU_SIAGA_BANTU,
  ...SKU_SIAGA_TATA,
  ...SKU_PENGGALANG_RAMU,
  ...SKU_PENGGALANG_RAKIT,
  ...SKU_PENGGALANG_TERAP,
  ...SKU_PENEGAK_BANTARA,
  ...SKU_PENEGAK_LAKSANA,
  ...SKU_PANDEGA
];

export const SKU_METRICS_SUMMARY = {
  totalItems: ALL_MASTER_SKU_ITEMS.length, // 259
  byGolongan: {
    Siaga: 100, // Mula 34 + Bantu 33 + Tata 33
    Penggalang: 90, // Ramu 30 + Rakit 30 + Terap 30
    Penegak: 45, // Bantara 23 + Laksana 22
    Pandega: 24 // Pandega 24
  },
  sourceDoc: 'Keputusan Kwartir Nasional Gerakan Pramuka Nomor 198 Tahun 2011'
};
