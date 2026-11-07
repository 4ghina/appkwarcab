import React from 'react';

export const METHODS = ['praktek', 'pengamatan', 'wawancara', 'tertulis'] as const;

interface TestMethodSelectorProps {
  testMethod: 'praktek' | 'pengamatan' | 'wawancara' | 'tertulis';
  onTestMethodChange(m: 'praktek' | 'pengamatan' | 'wawancara' | 'tertulis'): void;
}

export const TestMethodSelector: React.FC<TestMethodSelectorProps> = ({ testMethod, onTestMethodChange }) => (
  <div>
    <label className="block text-[11px] font-bold text-stone-700 mb-1">Metode Pengujian:</label>
    <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
      {METHODS.map(m => (
        <button
          key={m}
          type="button"
          onClick={() => onTestMethodChange(m)}
          className={`py-1.5 rounded-xl border capitalize text-[10px] ${
            testMethod === m ? 'bg-[#5D4037] text-white border-[#5D4037]' : 'bg-white text-stone-700'
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  </div>
);
