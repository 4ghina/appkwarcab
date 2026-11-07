import React from 'react';
import { MapGudepEntity } from './mapTypes';
import { Users, School, Award, UserCheck } from 'lucide-react';

interface DemographicsSummaryBarProps {
  gudeps: MapGudepEntity[];
  kwarcabName: string;
}

const StatCard: React.FC<{
  icon: React.ReactNode;
  bgIcon: string;
  label: string;
  valText: string;
  unitText: string;
  subText: React.ReactNode;
}> = (p) => (
  <div className="p-3.5 bg-white rounded-2xl border border-stone-200/90 shadow-2xs flex items-center gap-3">
    <div className={`w-10 h-10 rounded-xl ${p.bgIcon} flex items-center justify-center shrink-0`}>
      {p.icon}
    </div>
    <div>
      <span className="text-[10px] uppercase font-bold text-stone-500">{p.label}</span>
      <div className="text-lg font-black text-stone-900 leading-tight">
        {p.valText} <span className="text-xs font-semibold text-stone-500">{p.unitText}</span>
      </div>
      {p.subText}
    </div>
  </div>
);

function calculateTotals(gudeps: MapGudepEntity[]) {
  return gudeps.reduce((acc, g) => {
    acc.siaga += g.jumlahAnggota.siaga;
    acc.penggalang += g.jumlahAnggota.penggalang;
    acc.penegak += g.jumlahAnggota.penegak;
    acc.pandega += g.jumlahAnggota.pandega;
    acc.pembina += (g.pembinaPutra || 0) + (g.pembinaPutri || 0);
    if (g.akreditasi === 'A') acc.akreditasiA += 1;
    return acc;
  }, { siaga: 0, penggalang: 0, penegak: 0, pandega: 0, pembina: 0, akreditasiA: 0 });
}

export const DemographicsSummaryBar: React.FC<DemographicsSummaryBarProps> = ({ gudeps, kwarcabName }) => {
  const totals = calculateTotals(gudeps);
  const totalPeserta = totals.siaga + totals.penggalang + totals.penegak + totals.pandega;
  const ratio = totals.pembina > 0 ? Math.round(totalPeserta / totals.pembina) : 0;
  const nameShort = kwarcabName.replace('Kwartir Cabang Gerakan Pramuka ', '');

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard icon={<School className="w-5 h-5" />} bgIcon="bg-emerald-50 text-emerald-700" label="Gudep Terdata" valText={String(gudeps.length)} unitText="Pangkalan" subText={<span className="text-[10px] text-emerald-700 font-semibold">{totals.akreditasiA} Terakreditasi A</span>} />
      <StatCard icon={<Users className="w-5 h-5" />} bgIcon="bg-amber-50 text-amber-800" label="Peserta Didik Aktif" valText={totalPeserta.toLocaleString('id-ID')} unitText="Jiwa" subText={<span className="text-[9px] font-bold text-stone-500">S:{totals.siaga} G:{totals.penggalang} T:{totals.penegak}</span>} />
      <StatCard icon={<UserCheck className="w-5 h-5" />} bgIcon="bg-blue-50 text-blue-700" label="Pembina Gudep" valText={String(totals.pembina)} unitText="Orang" subText={<span className="text-[10px] text-stone-500 font-medium">Rasio 1 : {ratio}</span>} />
      <StatCard icon={<Award className="w-5 h-5" />} bgIcon="bg-purple-50 text-purple-700" label="Status Wilayah" valText={nameShort} unitText="" subText={<span className="text-[10px] text-emerald-700 font-bold">● Data Realtime Sinkron</span>} />
    </div>
  );
};
