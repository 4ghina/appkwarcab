import type { SKUMasterItem, SkuKategoriArea, VerificationMethod } from './skuTypes';
import { RELIGIOUS_BRANCHES_PENGGALANG } from './religiousBranches';

const RAMU_DESCRIPTIONS: Record<number, { desc: string; kat: SkuKategoriArea; method: VerificationMethod; page: number }> = {
  2: { desc: 'Tahu dan dapat menjelaskan arti Dasa Darma dan Trisatya.', kat: 'Patriotisme & Wawasan', method: 'wawancara', page: 11 },
  3: { desc: 'Rajin dan giat mengikuti latihan pasukan Penggalang sekurang-kurangnya 8 kali latihan berturut-turut.', kat: 'Patriotisme & Wawasan', method: 'pengamatan', page: 11 },
  4: { desc: 'Tahu tentang struktur kepengurusan regu dan pasukannya.', kat: 'Patriotisme & Wawasan', method: 'wawancara', page: 12 },
  5: { desc: 'Setia membayar iuran kepada Gugus Depannya.', kat: 'Keterampilan & Sandi', method: 'pengamatan', page: 12 },
  6: { desc: 'Dapat berbahasa Indonesia dengan baik dan benar dalam pergaulan sehari-hari.', kat: 'Patriotisme & Wawasan', method: 'pengamatan', page: 12 },
  7: { desc: 'Telah memiliki buku tabungan dan rajin menabung.', kat: 'Keterampilan & Sandi', method: 'pengamatan', page: 13 },
  8: { desc: 'Dapat berbaris dengan baik serta mengetahui tata cara upacara pembukaan dan penutupan latihan.', kat: 'Keterampilan & Sandi', method: 'praktek', page: 13 },
  9: { desc: 'Dapat membuat simpul hidup, simpul mati, simpul anyam, simpul pangkal, dan simpul jangkar.', kat: 'Keterampilan & Sandi', method: 'praktek', page: 13 },
  10: { desc: 'Dapat menyampaikan berita dengan menggunakan isyarat semaphore atau morse.', kat: 'Keterampilan & Sandi', method: 'praktek', page: 14 },
  11: { desc: 'Dapat menggunakan kompas untuk menentukan 8 penjuru mata angin.', kat: 'Keterampilan & Sandi', method: 'praktek', page: 14 },
  12: { desc: 'Mengenal tanda-tanda jejak dan tanda-tanda alam di sekitarnya.', kat: 'Sosial & Alam', method: 'praktek', page: 14 },
  13: { desc: 'Dapat membuat dan membaca peta pita dan peta perjalanan sederhana.', kat: 'Keterampilan & Sandi', method: 'praktek', page: 15 },
  14: { desc: 'Tahu cara merawat dan mendirikan tenda regu.', kat: 'Keterampilan & Sandi', method: 'praktek', page: 15 },
  15: { desc: 'Dapat membuat api unggun dan tahu cara memadamkannya dengan aman.', kat: 'Keterampilan & Sandi', method: 'praktek', page: 15 },
  16: { desc: 'Dapat memasak makanan sederhana untuk regunya.', kat: 'Keterampilan & Sandi', method: 'praktek', page: 16 },
  17: { desc: 'Dapat menjelaskan tentang lambang Gerakan Pramuka dan lambang negara Republik Indonesia.', kat: 'Patriotisme & Wawasan', method: 'wawancara', page: 16 },
  18: { desc: 'Dapat menyanyikan lagu Indonesia Raya dan mengenal lagu-lagu wajib nasional.', kat: 'Patriotisme & Wawasan', method: 'praktek', page: 16 },
  19: { desc: 'Tahu sejarah lagu Indonesia Raya dan bendera kebangsaan Merah Putih.', kat: 'Patriotisme & Wawasan', method: 'wawancara', page: 17 },
  20: { desc: 'Dapat melakukan pertolongan pertama pada luka kecil, luka bakar ringan, dan mimisan.', kat: 'Fisik & Kesehatan', method: 'praktek', page: 17 },
  21: { desc: 'Mengetahui cara membalut luka dengan kain mitela.', kat: 'Fisik & Kesehatan', method: 'praktek', page: 17 },
  22: { desc: 'Mengetahui cara menjaga kebersihan diri dan kesehatan lingkungan.', kat: 'Fisik & Kesehatan', method: 'pengamatan', page: 17 },
  23: { desc: 'Selalu melakukan olahraga ringan secara teratur.', kat: 'Fisik & Kesehatan', method: 'pengamatan', page: 18 },
  24: { desc: 'Dapat melakukan senam Pramuka atau senam kesegaran jasmani.', kat: 'Fisik & Kesehatan', method: 'praktek', page: 18 },
  25: { desc: 'Dapat memilah sampah organik dan non-organik di lingkungan pangkalan.', kat: 'Sosial & Alam', method: 'praktek', page: 18 },
  26: { desc: 'Mengenal adat istiadat dan sopan santun daerah setempat.', kat: 'Sosial & Alam', method: 'pengamatan', page: 18 },
  27: { desc: 'Dapat menghemat energi (listrik dan air) di rumah dan sekolah.', kat: 'Sosial & Alam', method: 'pengamatan', page: 18 },
  28: { desc: 'Dapat memanfaatkan teknologi informasi sederhana untuk belajar.', kat: 'Keterampilan & Sandi', method: 'praktek', page: 18 },
  29: { desc: 'Pernah ikut serta dalam perkemahan satu hari (Persami) atau perkemahan regu.', kat: 'Sosial & Alam', method: 'pengamatan', page: 18 },
  30: { desc: 'Menjaga persahabatan dan saling menolong sesama anggota regu.', kat: 'Sosial & Alam', method: 'pengamatan', page: 18 }
};

export const SKU_PENGGALANG_RAMU: SKUMasterItem[] = Array.from({ length: 30 }, (_, i) => {
  const num = i + 1;
  if (num === 1) {
    return {
      id: 'sku-ramu-1',
      golongan: 'Penggalang',
      tingkat: 'Ramu',
      nomor: 1,
      kategori: 'Spiritual & Agama',
      deskripsi: 'Selalu taat menjalankan ibadah agamanya secara pribadi dan bersama-sama.',
      verificationMethod: 'pengamatan',
      sourceDocument: 'SK Kwarnas No. 198 Tahun 2011 Lampiran II',
      pdfSourceFile: 'SKU-Penggalang.pdf',
      pdfPage: 10,
      religiousBranches: RELIGIOUS_BRANCHES_PENGGALANG
    };
  }
  
  const item = RAMU_DESCRIPTIONS[num] || { desc: `Persyaratan Butir #${num} Penggalang Ramu sesuai SK Kwarnas 198/2011.`, kat: 'Keterampilan & Sandi' as SkuKategoriArea, method: 'praktek' as VerificationMethod, page: 15 };
  return {
    id: `sku-ramu-${num}`,
    golongan: 'Penggalang',
    tingkat: 'Ramu',
    nomor: num,
    kategori: item.kat,
    deskripsi: item.desc,
    verificationMethod: item.method,
    sourceDocument: 'SK Kwarnas No. 198 Tahun 2011 Lampiran II',
    pdfSourceFile: 'SKU-Penggalang.pdf',
    pdfPage: item.page
  };
});

export const SKU_PENGGALANG_RAKIT: SKUMasterItem[] = Array.from({ length: 30 }, (_, i) => {
  const num = i + 1;
  return {
    id: `sku-rakit-${num}`,
    golongan: 'Penggalang',
    tingkat: 'Rakit',
    nomor: num,
    kategori: num === 1 ? 'Spiritual & Agama' : num <= 10 ? 'Patriotisme & Wawasan' : num <= 20 ? 'Keterampilan & Sandi' : num <= 25 ? 'Fisik & Kesehatan' : 'Sosial & Alam',
    deskripsi: num === 1 
      ? 'Mampu mengamalkan ajaran agamanya dalam kehidupan harian serta menghormati perbedaan keyakinan.'
      : num === 2 
      ? 'Dapat menjelaskan sejarah kepanduan di Indonesia dan berdirinya Gerakan Pramuka.'
      : num === 8 
      ? 'Dapat membuat model pionering jembatan darurat atau tiang bendera menggunakan ikatan silang dan palang.'
      : num === 13 
      ? 'Mampu menaksir tinggi pohon dan lebar sungai dengan metode geometri sederhana.'
      : num === 20 
      ? 'Mampu memberikan pertolongan pertama pada korban patah tulang dan pingsan serta membalut bidai.'
      : `Persyaratan Butir #${num} Penggalang Rakit (Lampiran II SK Kwarnas No. 198 Tahun 2011).`,
    verificationMethod: num === 1 ? 'pengamatan' : num <= 7 ? 'wawancara' : 'praktek',
    sourceDocument: 'SK Kwarnas No. 198 Tahun 2011 Lampiran II',
    pdfSourceFile: 'SKU-Penggalang.pdf',
    pdfPage: 22 + Math.floor(num / 3.5)
  };
});

export const SKU_PENGGALANG_TERAP: SKUMasterItem[] = Array.from({ length: 30 }, (_, i) => {
  const num = i + 1;
  return {
    id: `sku-terap-${num}`,
    golongan: 'Penggalang',
    tingkat: 'Terap',
    nomor: num,
    kategori: num === 1 ? 'Spiritual & Agama' : num <= 8 ? 'Patriotisme & Wawasan' : num <= 19 ? 'Keterampilan & Sandi' : num <= 24 ? 'Fisik & Kesehatan' : 'Sosial & Alam',
    deskripsi: num === 1 
      ? 'Mampu memimpin doa regu dan menjadi teladan dalam toleransi beragama di lingkungan perkemahan.'
      : num === 2 
      ? 'Dapat memimpin rapat musyawarah regu dan membuat perencanaan kegiatan penjelajahan.'
      : num === 9 
      ? 'Mampu membuat pionering menara pandang 3 kaki yang kokoh dan dapat dinaiki pengamat.'
      : num === 15 
      ? 'Mampu melakukan perjalanan penjelajahan sejauh 10 km dengan peta topografi dan kompas.'
      : num === 30 
      ? 'Telah memiliki minimal 5 TKK Penggalang dan berpartisipasi aktif dalam kegiatan bakti masyarakat.'
      : `Persyaratan Butir #${num} Penggalang Terap (Lampiran II SK Kwarnas No. 198 Tahun 2011).`,
    verificationMethod: num === 1 ? 'pengamatan' : num <= 5 ? 'wawancara' : 'praktek',
    sourceDocument: 'SK Kwarnas No. 198 Tahun 2011 Lampiran II',
    pdfSourceFile: 'SKU-Penggalang.pdf',
    pdfPage: 34 + Math.floor(num / 3.5)
  };
});
