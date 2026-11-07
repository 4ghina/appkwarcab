import React from 'react';
import { SmartCardAttendanceLog } from './smartCardTypes';

export const AttendanceLogsList: React.FC<{ logs: SmartCardAttendanceLog[] }> = ({ logs }) => {
  return (
    <div className="space-y-1.5 pt-1">
      <h4 className="text-xs font-bold text-stone-800 flex items-center justify-between">
        <span>Log Absensi Kegiatan Terbaru</span>
        <span className="text-[10px] text-stone-500">{logs.length} Kehadiran</span>
      </h4>
      <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
        {logs.slice(0, 5).map((log) => (
          <div
            key={log.id}
            className="p-2 bg-white rounded-xl border border-stone-200 text-xs flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-[11px] text-stone-900">{log.name}</p>
              <p className="text-[9px] text-stone-500">{log.eventName} · {log.timestamp}</p>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[9px]">
              {log.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
