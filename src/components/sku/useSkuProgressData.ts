import { useState, useMemo } from 'react';
import { SKUItem, UserProfile, YouthGolongan } from '../../types/scout';
import { ALL_MASTER_SKU_ITEMS } from '../../data/skuMasterBank';

export function useSkuProgressData(user: UserProfile, skuList: SKUItem[]) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const targetGolongan: YouthGolongan = user.youthGolongan || 'Penegak';
  const targetTingkat = user.currentTingkat || (targetGolongan === 'Penegak' ? 'Bantara' : (targetGolongan === 'Penggalang' ? 'Terap' : (targetGolongan === 'Siaga' ? 'Tata' : 'Pandega')));

  const activeMaster = useMemo(() => {
    return ALL_MASTER_SKU_ITEMS.filter(it => it.golongan.toLowerCase() === targetGolongan.toLowerCase() && it.tingkat.toLowerCase() === targetTingkat.toLowerCase());
  }, [targetGolongan, targetTingkat]);

  const mergedSKU = useMemo(() => {
    return activeMaster.map(master => {
      const p = skuList.find(s => s.id === master.id || (s.nomor === master.nomor && (s.golongan === targetGolongan || !s.golongan)));
      return { ...master, isPassed: Boolean(p?.isPassed), status: (p?.isPassed ? 'lulus' : (p?.status || 'belum')) as any, testedBy: p?.testedBy, testedDate: p?.testedDate, catatan: p?.catatan };
    });
  }, [activeMaster, skuList, targetGolongan]);

  const passedCount = mergedSKU.filter(i => i.isPassed).length;
  const totalCount = mergedSKU.length || 23;
  const progressPercent = Math.round((passedCount / totalCount) * 100);

  const filteredSKU = useMemo(() => {
    return mergedSKU.filter(item => {
      const matchCat = selectedCategory === 'Semua' || item.kategori === selectedCategory;
      const matchSearch = item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) || String(item.nomor).includes(searchQuery);
      return matchCat && matchSearch;
    });
  }, [mergedSKU, selectedCategory, searchQuery]);

  return {
    targetGolongan, targetTingkat, passedCount, totalCount, progressPercent,
    selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, filteredSKU
  };
}
