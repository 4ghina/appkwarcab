import type { SKUItem, YouthGolongan } from '../../types/scout';
import { MOCK_SKU_PENEGAK } from './sku/mockSkuPenegak';
import { MOCK_SKU_PENGGALANG } from './sku/mockSkuPenggalang';
import { MOCK_SKU_SIAGA } from './sku/mockSkuSiaga';
import { MOCK_SKU_PANDEGA } from './sku/mockSkuPandega';

export const INITIAL_SKU_ITEMS_BY_GOLONGAN: Record<YouthGolongan, SKUItem[]> = {
  Penegak: MOCK_SKU_PENEGAK,
  Penggalang: MOCK_SKU_PENGGALANG,
  Siaga: MOCK_SKU_SIAGA,
  Pandega: MOCK_SKU_PANDEGA
};

// Default pointer for backward compatibility
export const INITIAL_SKU_ITEMS: SKUItem[] = INITIAL_SKU_ITEMS_BY_GOLONGAN.Penegak;
