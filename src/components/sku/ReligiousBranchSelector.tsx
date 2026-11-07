import React from 'react';
import { Sparkles } from 'lucide-react';

export type ReligionChoice = 'Islam' | 'Katolik' | 'Kristen Protestan' | 'Hindu' | 'Buddha';

const RELIGION_CURRICULUM: Record<ReligionChoice, string[]> = {
  'Islam': [
    'Dapat menjelaskan makna Rukun Iman dan Rukun Islam',
    'Mampu mendirikan sholat fardhu berjamaah dan menjelaskan maknanya',
    'Mengetahui syarat, rukun, dan yang membatalkan puasa',
    'Dapat merawat jenazah (tajhizul janazah dasar)',
    'Dapat membaca doa ijab qobul zakat fitrah'
  ],
  'Katolik': [
    'Tahu sakramen-sakramen dalam Gereja Katolik',
    'Dapat berdoa Rosario dan memahami maknanya',
    'Aktif dalam kegiatan liturgi dan peribadatan lingkungan gereja'
  ],
  'Kristen Protestan': [
    'Dapat menyanyikan lagu-lagu rohani Kristen',
    'Dapat menceritakan riwayat tokoh Alkitab dan keteladanannya',
    'Hafal Doa Bapa Kami dan aktif dalam persekutuan pemuda'
  ],
  'Hindu': [
    'Dapat melafalkan doa Tri Sandhya dengan baik dan benar',
    'Dapat menjelaskan makna filosofis Panca Sradha',
    'Dapat melakukan persembahyangan harian'
  ],
  'Buddha': [
    'Dapat melafalkan Paritta Pancasila dan Paritta Buddhanussati',
    'Dapat menjelaskan Empat Kebenaran Mulia (Ariya Sacca)',
    'Melaksanakan meditasi harian'
  ]
};

interface ReligiousBranchSelectorProps {
  selectedReligion: ReligionChoice;
  onSelectReligion: (religion: ReligionChoice) => void;
}

export const ReligiousBranchSelector: React.FC<ReligiousBranchSelectorProps> = ({
  selectedReligion,
  onSelectReligion
}) => {
  const religions: ReligionChoice[] = ['Islam', 'Katolik', 'Kristen Protestan', 'Hindu', 'Buddha'];

  return (
    <div className="mt-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/90 space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-amber-950 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" />
          Cabang Agama Anda (SK Kwarnas 198/2011):
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {religions.map(rel => (
          <button
            key={rel}
            type="button"
            onClick={() => onSelectReligion(rel)}
            className={`px-2 py-0.5 rounded-lg text-[9px] font-bold transition-all ${
              selectedReligion === rel
                ? 'bg-amber-800 text-white'
                : 'bg-white text-stone-700 border border-amber-300 hover:bg-amber-100'
            }`}
          >
            {rel}
          </button>
        ))}
      </div>
      <div className="text-[10px] text-stone-700 pt-1 border-t border-amber-200/60 space-y-0.5">
        <span className="font-bold text-amber-900 block">Materi Uji Cabang {selectedReligion}:</span>
        <ul className="list-disc pl-3 text-[10px] space-y-0.5 text-stone-600">
          {RELIGION_CURRICULUM[selectedReligion].map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
