import React from 'react';
import { UserContext } from '../../types/scout';
import { ShieldCheck } from 'lucide-react';

interface ContextPickerDropdownProps {
  contexts: UserContext[];
  activeContextId?: string;
  onSelectContext: (id: string) => void;
}

export const ContextPickerDropdown: React.FC<ContextPickerDropdownProps> = ({
  contexts,
  activeContextId,
  onSelectContext,
}) => {
  return (
    <div className="absolute right-0 mt-1 w-64 p-2 bg-white rounded-2xl border border-stone-200 shadow-xl z-50 space-y-1">
      <span className="text-[10px] uppercase font-bold text-stone-400 px-2 py-1 block">
        Pilih Konteks Tugas Aktif
      </span>
      {contexts.map((ctx) => (
        <button
          key={ctx.id}
          type="button"
          onClick={() => onSelectContext(ctx.id)}
          className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-start gap-2 ${
            ctx.id === activeContextId
              ? 'bg-amber-50 text-amber-950 font-bold border border-amber-300'
              : 'hover:bg-stone-50 text-stone-700'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-xs font-bold truncate">{ctx.label}</p>
            <p className="text-[10px] text-stone-500 truncate">{ctx.subLabel || ctx.unitName}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
