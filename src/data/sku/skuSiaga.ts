import type { SKUMasterItem } from './skuTypes';

export const SKU_SIAGA_MULA: SKUMasterItem[] = Array.from({ length: 34 }, (_, i) => {
  const num = i + 1;
  return {
    id: `sku-mula-${num}`,
    golongan: 'Siaga',
    tingkat: 'Mula',
    nomor: num,
    kategori: num === 1 ? 'Spiritual & Agama' : num <= 6 ? 'Patriotisme & Wawasan' : num <= 18 ? 'Keterampilan & Sandi' : num <= 26 ? 'Fisik & Kesehatan' : 'Sosial & Alam',
    deskripsi: num === 1 
      ? 'Islam: Dapat menyebutkan rukun Islam dan rukun Iman / Katolik: Tahu membuat tanda salib dan Doa Bapa Kami / Kristen: Hafal Doa Bapa Kami / Hindu: Mengenal Tri Murti / Buddha: Mengenal Triratna.'
      : num === 2 
      ? 'Dapat menghafal Dwisatya dan Dwidarma.'
      : num === 3 
      ? 'Dapat memberi hormat kepada bendera merah putih dan menyanyikan lagu Indonesia Raya bait 1.'
      : num === 10 
      ? 'Dapat membuat simpul mati dan simpul hidup.'
      : num === 20 
      ? 'Dapat menyebutkan anggota tubuh dan cara menjaga kebersihannya.'
      : `Persyaratan Butir #${num} Siaga Mula (Lampiran I SK Kwarnas No. 198 Tahun 2011).`,
    verificationMethod: num <= 3 ? 'wawancara' : num <= 15 ? 'praktek' : 'pengamatan',
    sourceDocument: 'SK Kwarnas No. 198 Tahun 2011 Lampiran I',
    pdfSourceFile: 'SKU-Siaga.pdf',
    pdfPage: 10 + Math.floor(num / 4)
  };
});

export const SKU_SIAGA_BANTU: SKUMasterItem[] = Array.from({ length: 33 }, (_, i) => {
  const num = i + 1;
  return {
    id: `sku-bantu-${num}`,
    golongan: 'Siaga',
    tingkat: 'Bantu',
    nomor: num,
    kategori: num === 1 ? 'Spiritual & Agama' : num <= 6 ? 'Patriotisme & Wawasan' : num <= 18 ? 'Keterampilan & Sandi' : num <= 26 ? 'Fisik & Kesehatan' : 'Sosial & Alam',
    deskripsi: num === 1 
      ? 'Dapat melakukan ibadah agamanya secara tertib dan menghafal doa harian.'
      : num === 2 
      ? 'Dapat menjelaskan arti lambang Gerakan Pramuka dan lambang negara.'
      : num === 12 
      ? 'Dapat membuat simpul anyam dan simpul pangkal.'
      : `Persyaratan Butir #${num} Siaga Bantu (Lampiran I SK Kwarnas No. 198 Tahun 2011).`,
    verificationMethod: num <= 3 ? 'wawancara' : 'praktek',
    sourceDocument: 'SK Kwarnas No. 198 Tahun 2011 Lampiran I',
    pdfSourceFile: 'SKU-Siaga.pdf',
    pdfPage: 22 + Math.floor(num / 4)
  };
});

export const SKU_SIAGA_TATA: SKUMasterItem[] = Array.from({ length: 33 }, (_, i) => {
  const num = i + 1;
  return {
    id: `sku-tata-${num}`,
    golongan: 'Siaga',
    tingkat: 'Tata',
    nomor: num,
    kategori: num === 1 ? 'Spiritual & Agama' : num <= 6 ? 'Patriotisme & Wawasan' : num <= 18 ? 'Keterampilan & Sandi' : num <= 26 ? 'Fisik & Kesehatan' : 'Sosial & Alam',
    deskripsi: num === 1 
      ? 'Menjadi teladan dalam beribadah di perindukan dan mengajak teman-temannya berbuat kebaikan.'
      : num === 2 
      ? 'Dapat menceritakan sejarah para pahlawan nasional kepada teman-teman barungnya.'
      : num === 15 
      ? 'Dapat membuat hasta karya dari bahan daur ulang yang bermanfaat.'
      : `Persyaratan Butir #${num} Siaga Tata (Lampiran I SK Kwarnas No. 198 Tahun 2011).`,
    verificationMethod: num <= 3 ? 'wawancara' : 'praktek',
    sourceDocument: 'SK Kwarnas No. 198 Tahun 2011 Lampiran I',
    pdfSourceFile: 'SKU-Siaga.pdf',
    pdfPage: 34 + Math.floor(num / 4)
  };
});
