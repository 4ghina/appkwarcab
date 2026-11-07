import type { SKUItem } from '../../../types/scout';

export const MOCK_SKU_SIAGA: SKUItem[] = [
  {
    id: 'sku-siaga-1',
    nomor: 1,
    golongan: 'Siaga',
    tingkat: 'Siaga Tata',
    kategori: 'Spiritual & Agama',
    deskripsi: 'Rajin beribadah dan dapat menghafal doa harian sebelum makan dan sebelum tidur.',
    isPassed: true,
    status: 'lulus',
    testedBy: 'Yanda Joko Susilo',
    testedDate: '15 Jan 2026'
  },
  {
    id: 'sku-siaga-2',
    nomor: 2,
    golongan: 'Siaga',
    tingkat: 'Siaga Tata',
    kategori: 'Patriotisme & Wawasan',
    deskripsi: 'Hafal Dwisatya dan Dwidarma serta dapat menerapkannya dalam kehidupan sehari-hari.',
    isPassed: true,
    status: 'lulus',
    testedBy: 'Bunda Sri',
    testedDate: '22 Jan 2026'
  },
  {
    id: 'sku-siaga-3',
    nomor: 3,
    golongan: 'Siaga',
    tingkat: 'Siaga Tata',
    kategori: 'Keterampilan & Sandi',
    deskripsi: 'Dapat membuat simpul mati, simpul hidup, dan simpul anyam dengan tali pramuka.',
    isPassed: true,
    status: 'lulus',
    testedBy: 'Yanda Joko Susilo',
    testedDate: '05 Feb 2026'
  },
  {
    id: 'sku-siaga-4',
    nomor: 4,
    golongan: 'Siaga',
    tingkat: 'Siaga Tata',
    kategori: 'Fisik & Kesehatan',
    deskripsi: 'Dapat memelihara kebersihan badan, memotong kuku secara teratur, dan mencuci tangan dengan sabun.',
    isPassed: true,
    status: 'lulus',
    testedBy: 'Bunda Sri',
    testedDate: '12 Feb 2026'
  },
  {
    id: 'sku-siaga-5',
    nomor: 5,
    golongan: 'Siaga',
    tingkat: 'Siaga Tata',
    kategori: 'Sosial & Alam',
    deskripsi: 'Dapat membantu orang tua membersihkan tempat tidur dan merapikan mainan sendiri di rumah.',
    isPassed: false,
    status: 'diajukan',
    catatan: 'Menunggu konfirmasi catatan buku saku dari orang tua'
  },
  {
    id: 'sku-siaga-6',
    nomor: 6,
    golongan: 'Siaga',
    tingkat: 'Siaga Tata',
    kategori: 'Patriotisme & Wawasan',
    deskripsi: 'Dapat menyanyikan lagu Indonesia Raya Stanza 1 dengan sikap sempurna.',
    isPassed: false,
    status: 'belum'
  }
];
