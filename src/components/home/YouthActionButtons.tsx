import React from 'react';
import { BookOpen, Award } from 'lucide-react';

interface YouthActionButtonsProps {
  onOpenSKU(): void;
  onOpenGaruda(): void;
}

export const YouthActionButtons: React.FC<YouthActionButtonsProps> = ({ onOpenSKU, onOpenGaruda }) => (
  <>
    <button type="button" onClick={onOpenSKU} className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 text-center">
      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5 shadow-2xs"><BookOpen className="w-5 h-5" /></div>
      <span className="text-[10px] font-bold text-stone-800">E-SKU Saya</span><span className="text-[8px] text-emerald-700 font-medium">Uji Kecakapan</span>
    </button>
    <button type="button" onClick={onOpenGaruda} className="flex flex-col items-center p-2.5 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:border-amber-400 text-center">
      <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-1.5 shadow-2xs"><Award className="w-5 h-5" /></div>
      <span className="text-[10px] font-bold text-stone-800">Pramuka Garuda</span><span className="text-[8px] text-amber-700 font-medium">Seleksi & Portofolio</span>
    </button>
  </>
);
