import React from 'react';
import { CheckCircle2, AlertTriangle, QrCode, Lock, FileText, Download } from 'lucide-react';

function VerifierValidContent({ result }: { result: any }) {
  const isFull = result.fullAccess;
  return (
    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 animate-in fade-in">
      <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="block leading-tight">{result.status || 'KARTU DIGITAL SAH & TERVERIFIKASI'}</span>
            <span className="text-[10px] text-emerald-700 font-normal">Kwartir Cabang Gerakan Pramuka Kota Depok</span>
          </div>
        </div>
        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${isFull ? 'bg-emerald-200 text-emerald-950' : 'bg-stone-200 text-stone-700'}`}>
          {isFull ? 'Akses Penuh Petugas' : 'Tampilan Publik Terbatas'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div><span className="text-[10px] text-stone-500 block">Nama Anggota:</span><span className="font-bold text-stone-900">{result.name}</span></div>
        <div><span className="text-[10px] text-stone-500 block">Nomor KTA:</span><span className="font-mono font-bold text-stone-900">{result.nta}</span></div>
        <div><span className="text-[10px] text-stone-500 block">Golongan:</span><span className="font-medium text-stone-800">{result.golongan} ({result.tingkatan})</span></div>
        <div><span className="text-[10px] text-stone-500 block">Pangkalan / Gudep:</span><span className="font-medium text-stone-800">{result.pangkalan}</span></div>
        <div><span className="text-[10px] text-stone-500 block">Kwartir Ranting:</span><span className="font-medium text-stone-800">{result.kwarran}</span></div>
        <div><span className="text-[10px] text-stone-500 block">Masa Berlaku:</span><span className="font-medium text-stone-800">{result.validUntil || '31 Des 2028'}</span></div>
      </div>

      {!isFull ? (
        <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 text-[10px] text-amber-900 flex items-start gap-1.5">
          <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
          <span>Batasan Akses Publik: Data pribadi dan arsip salinan PDF asli hanya dapat diakses melalui login petugas atau pangkalan terkait.</span>
        </div>
      ) : (
        <div className="p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-[11px] text-emerald-950 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-semibold"><FileText className="w-4 h-4 text-emerald-700" /><span>Salinan Resmi Ayo Pramuka Terverifikasi</span></div>
          {result.officialDocUrl && (
            <a href={result.officialDocUrl} download className="px-2.5 py-1 rounded-lg bg-emerald-800 text-white font-bold text-[10px] flex items-center gap-1">
              <Download className="w-3 h-3" /> Unduh Dokumen
            </a>
          )}
        </div>
      )}

      <div className="pt-2 border-t border-emerald-200 flex items-center justify-between text-[11px]">
        <span className="font-bold text-emerald-900">Terdaftar di SIM-KWARCAB</span>
        <div className="flex items-center gap-1 text-emerald-800"><QrCode className="w-4 h-4" /><span>Token Keabsahan Kwarcab</span></div>
      </div>
    </div>
  );
}

export const VerifierResultView: React.FC<{ result: any }> = ({ result }) => {
  if (result.valid) {
    return <VerifierValidContent result={result} />;
  }

  return (
    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-xs text-rose-900 animate-in fade-in">
      <div className="flex items-center gap-2 font-bold">
        <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
        <span>Dokumen / Anggota Tidak Ditemukan</span>
      </div>
      <p className="text-[11px] leading-relaxed">{result.message}</p>
    </div>
  );
};
