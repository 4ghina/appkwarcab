import React from 'react';
import { ShieldCheck, Database, Calendar } from 'lucide-react';

interface FooterRowsProps {
  dataSource: string;
  boundarySource: string;
  formattedDate: string;
}

export const FooterTopRow: React.FC<{ dataSource: string; formattedDate: string }> = ({ dataSource, formattedDate }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-2">
    <div className="flex items-center gap-2">
      <Database className="w-3.5 h-3.5 text-stone-600 shrink-0" />
      <span><strong className="text-stone-700">Sumber Data:</strong> {dataSource}</span>
    </div>
    <div className="flex items-center gap-2">
      <Calendar className="w-3.5 h-3.5 text-stone-600 shrink-0" />
      <span><strong className="text-stone-700">Pembaruan Terakhir:</strong> {formattedDate} WIB</span>
    </div>
  </div>
);

export const FooterBottomRow: React.FC<{ boundarySource: string }> = ({ boundarySource }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
    <div><strong className="text-stone-700">Atribusi Batas Wilayah:</strong> {boundarySource}</div>
    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>Privasi Terlindungi: Bebas NTA / NIK / Data Pribadi Peserta</span>
    </div>
  </div>
);

export const ThematicMapFooter: React.FC<{ dataSource?: string; boundarySource?: string; lastUpdated?: string }> = ({
  dataSource = 'Pelaporan Terverifikasi Kwartir Cabang Gerakan Pramuka Kota Depok',
  boundarySource = 'Badan Informasi Geospasial (BIG) & BPS Kota Depok',
  lastUpdated,
}) => {
  const formattedDate = React.useMemo(() => {
    if (!lastUpdated) return '7 November 2026';
    try {
      return new Date(lastUpdated).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return lastUpdated;
    }
  }, [lastUpdated]);

  return (
    <footer className="bg-stone-50 rounded-2xl border border-stone-200/80 p-4 text-[11px] text-stone-600 space-y-2">
      <FooterTopRow dataSource={dataSource} formattedDate={formattedDate} />
      <FooterBottomRow boundarySource={boundarySource} />
    </footer>
  );
};
