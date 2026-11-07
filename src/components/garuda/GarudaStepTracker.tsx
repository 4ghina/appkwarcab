import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

interface GarudaStepTrackerProps {
  currentTahap: number;
}

const STEPS = [
  { step: 1, title: 'Diajukan Gudep', desc: 'Portofolio & Rekomendasi Pangkalan' },
  { step: 2, title: 'Verifikasi Kwarran', desc: 'Pemeriksaan Berkas Ranting' },
  { step: 3, title: 'Penilaian Kwarcab', desc: 'Wawancara & Uji Kelayakan Cabang' },
  { step: 4, title: 'SK Terbit & Pelantikan', desc: 'Penganugerahan Medali Garuda' }
];

export const GarudaStepTracker: React.FC<GarudaStepTrackerProps> = ({ currentTahap }) => {
  return (
    <div className="p-4 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-3">
      <h4 className="text-xs font-bold text-stone-900 uppercase">Tahapan Seleksi & Verifikasi Berjenjang</h4>
      <div className="space-y-3">
        {STEPS.map((s) => {
          const isPassed = s.step < currentTahap;
          const isCurrent = s.step === currentTahap;
          return (
            <div key={s.step} className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                isPassed ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-amber-500 text-white animate-pulse' : 'bg-stone-100 text-stone-400'
              }`}>
                {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className={`text-xs font-bold ${isCurrent ? 'text-amber-900' : 'text-stone-800'}`}>{s.title}</h5>
                  <span className="text-[10px] text-stone-400">{isPassed ? 'Selesai' : isCurrent ? 'Sedang Berjalan' : 'Menunggu'}</span>
                </div>
                <p className="text-[11px] text-stone-500">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
