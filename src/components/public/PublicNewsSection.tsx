import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  summary: string;
}

const PUBLISHED_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Kwartir Cabang Resmi Buka Seleksi Calon Pramuka Garuda Tahun 2026',
    date: '02 November 2026',
    category: 'Prestasi & Penghargaan',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=80',
    summary: 'Sebanyak 350 peserta didik dari 11 Kwartir Ranting se-Kota Depok dipersiapkan mengikuti uji portofolio dan verifikasi faktual lapangan.'
  },
  {
    id: 'news-2',
    title: 'Pusdiklatcab Wijayakusuma Selenggarakan KMD dan KML Mandiri Angkatan XXIV',
    date: '28 Oktober 2026',
    category: 'Pendidikan Dewasa',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
    summary: 'Meningkatkan rasio Pembina Mahir di Gugus Depan pangkalan sekolah dasar dan menengah dengan kurikulum terpadu.'
  },
  {
    id: 'news-3',
    title: 'Aksi Bersih Lingkungan Saka Kalpataru di Kawasan Situ Rawa Kalong Kota Depok',
    date: '25 Oktober 2026',
    category: 'Bakti Komunitas',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&auto=format&fit=crop&q=80',
    summary: 'Ratusan Penegak berpartisipasi dalam penanaman 500 bibit pohon penyerap air dan aksi konservasi situ di Kota Depok.'
  }
];

export const PublicNewsSection: React.FC = () => {
  return (
    <section id="berita" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
            Warta & Pengumuman
          </span>
          <h2 className="text-lg sm:text-xl font-black text-stone-900">Kabar Terkini Kwartir Cabang</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PUBLISHED_NEWS.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs space-y-3">
            <img src={item.image} alt={item.title} className="w-full h-36 object-cover" />
            <div className="p-4 pt-1 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-stone-400">
                <span className="font-bold text-amber-800">{item.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-stone-900 leading-snug line-clamp-2">{item.title}</h3>
              <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
