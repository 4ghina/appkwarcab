import React from 'react';
import { Wifi, X, Calendar, CreditCard, Receipt } from 'lucide-react';

interface SmartCardTabsHeaderProps {
  activeTab: 'absensi' | 'saldo' | 'transaksi';
  onTabChange(tab: 'absensi' | 'saldo' | 'transaksi'): void;
  onClose?(): void;
}

const TABS: Array<{ id: 'absensi' | 'saldo' | 'transaksi'; label: string; icon: React.FC<{ className?: string }>; activeColor: string }> = [
  { id: 'absensi', label: 'Absensi', icon: Calendar, activeColor: 'text-[#5D4037]' },
  { id: 'saldo', label: 'Cek Saldo', icon: CreditCard, activeColor: 'text-emerald-900' },
  { id: 'transaksi', label: 'Transaksi', icon: Receipt, activeColor: 'text-purple-900' },
];

export const SmartCardTabsHeader: React.FC<SmartCardTabsHeaderProps> = ({
  activeTab,
  onTabChange,
  onClose,
}) => {
  return (
    <>
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-[#5D4037] text-amber-300 flex items-center justify-center font-bold">
            <Wifi className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-stone-900 leading-tight">Terminal KTA Pintar</h2>
            <p className="text-[10px] text-stone-500">Sensor RFID / NFC Interaktif</p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-2xl border border-stone-200 text-xs">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`py-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1 transition-all ${
                isActive ? `bg-white ${t.activeColor} shadow-xs` : 'text-stone-600'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
