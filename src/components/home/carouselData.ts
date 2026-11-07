export interface CarouselSlide {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAudience: string;
  imageDesktop: string;
  imageMobile: string;
  imageAlt: string;
  focalPoint?: 'center' | 'top' | 'bottom';
  buttonLabel: string;
  buttonAction: () => void;
  status: 'published' | 'draft';
  order: number;
}

export const DEFAULT_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-garuda-2026',
    title: 'Pendaftaran Seleksi Pramuka Garuda Kwartir Cabang 2026',
    description: 'Penilaian portofolio dan verifikasi berjenjang untuk Pramuka Penggalang & Penegak berprestasi telah dibuka.',
    category: 'Prestasi Tertinggi',
    targetAudience: 'Penggalang & Penegak',
    imageDesktop: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&auto=format&fit=crop&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Upacara Penganugerahan Lencana Pramuka Garuda Kwartir Cabang',
    focalPoint: 'center',
    buttonLabel: 'Pelajari Persyaratan Garuda',
    buttonAction: () => {},
    status: 'published',
    order: 1
  },
  {
    id: 'slide-pusdiklat-kmd-kml',
    title: 'Kursus Pembina Mahir (KMD & KML) Pusdiklatcab',
    description: 'Peningkatan kompetensi pembinaan satuan dengan kurikulum terstandar Pusdiklatnas & penerbitan SHB resmi.',
    category: 'Pendidikan Dewasa',
    targetAudience: 'Pembina & Pelatih',
    imageDesktop: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Kegiatan Pembinaan dan Kursus Mahir Pembina Pramuka',
    focalPoint: 'center',
    buttonLabel: 'Daftar Kursus Pusdiklatcab',
    buttonAction: () => {},
    status: 'published',
    order: 2
  },
  {
    id: 'slide-gudep-herreg',
    title: 'Her-Registrasi & Pemutakhiran Gugus Depan 2026',
    description: 'Pastikan pangkalan Gudep Anda terakreditasi dan terdata resmi pada Peta Potensi Kwartir Cabang.',
    category: 'Kelembagaan Gudep',
    targetAudience: 'Pengelola Gudep',
    imageDesktop: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop&q=80',
    imageMobile: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    imageAlt: 'Pendataan dan Akreditasi Pangkalan Gugus Depan',
    focalPoint: 'center',
    buttonLabel: 'Lihat Direktori Pangkalan',
    buttonAction: () => {},
    status: 'published',
    order: 3
  }
];
