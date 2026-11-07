import React from 'react';
import { Smartphone, RotateCcw } from 'lucide-react';
import { CardTapPayload } from './smartCardTypes';

interface SmartCardSimulatorBarProps {
  currentCard: CardTapPayload | null;
  isScanning: boolean;
  onSimulateTap: () => void;
}

export const SmartCardSimulatorBar: React.FC<SmartCardSimulatorBarProps> = ({
  currentCard,
  isScanning,
  onSimulateTap,
}) => {
  return (
    <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Smartphone className="w-4 h-4 text-amber-800" />
        <div>
          <span className="text-[11px] font-bold text-amber-950 block">Uji Tempel Kartu (NFC)</span>
          <span className="text-[9px] text-amber-800 font-mono">
            UID: {currentCard?.uid || 'Siap Tempel'}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onSimulateTap}
        disabled={isScanning}
        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
      >
        <RotateCcw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
        <span>{isScanning ? 'Membaca...' : 'Tempel Kartu'}</span>
      </button>
    </div>
  );
};
