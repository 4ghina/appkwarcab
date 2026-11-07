import React from 'react';
import { InfographicData } from '../../../types/infographic';
import { ShieldCheck } from 'lucide-react';

interface InfographicAccessibleSummaryProps {
  data: InfographicData | null;
}

export const InfographicAccessibleSummary: React.FC<InfographicAccessibleSummaryProps> = ({ data }) => {
  if (!data) return null;

  const { metadata, summary, youthComposition } = data;

  return (
    <div className="space-y-2">
      {/* Privacy note if message is present */}
      {metadata.statusMessage && (
        <div className="p-2.5 rounded-xl bg-stone-100 text-stone-600 text-xs flex items-center gap-2 border border-stone-200">
          <ShieldCheck className="w-4 h-4 text-stone-500 shrink-0" />
          <span>{metadata.statusMessage}</span>
        </div>
      )}

      {/* Screen Reader Accessible Table */}
      <div className="sr-only">
        <h3>Ringkasan Aksesibilitas Potensi Pramuka</h3>
        <p>Wilayah: {metadata.kwarran}, Gudep: {metadata.gudepName}, Periode: {metadata.periodLabel}</p>
        <table>
          <caption>Tabel Data Potensi Pramuka</caption>
          <thead>
            <tr>
              <th scope="col">Kategori</th>
              <th scope="col">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Peserta Didik Aktif</td>
              <td>{summary.pesertaDidikAktif ?? 'Data belum tersedia'}</td>
            </tr>
            <tr>
              <td>Pembina Aktif</td>
              <td>{summary.pembinaAktif ?? 'Data belum tersedia'}</td>
            </tr>
            <tr>
              <td>Gugus Depan Aktif</td>
              <td>{summary.gudepAktif ?? 'Data belum tersedia'}</td>
            </tr>
            <tr>
              <td>Siaga</td>
              <td>{youthComposition.siaga}</td>
            </tr>
            <tr>
              <td>Penggalang</td>
              <td>{youthComposition.penggalang}</td>
            </tr>
            <tr>
              <td>Penegak</td>
              <td>{youthComposition.penegak}</td>
            </tr>
            <tr>
              <td>Pandega</td>
              <td>{youthComposition.pandega}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
