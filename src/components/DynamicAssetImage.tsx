import React, { useState } from 'react';
import { StampFallback, SignatureFallback, WosmFallback, DefaultLogoFallback } from './assets/AssetFallbackSvg';

interface DynamicAssetImageProps {
  src?: string | null;
  alt: string;
  fallbackType?: 'logo' | 'stamp' | 'signature' | 'avatar' | 'banner' | 'wosm';
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const DynamicAssetImage: React.FC<DynamicAssetImageProps> = (p) => {
  const [hasError, setHasError] = useState(false);

  if (p.src && !hasError) {
    return (
      <img
        src={p.src}
        alt={p.alt}
        width={p.width}
        height={p.height}
        onError={() => setHasError(true)}
        className={`object-contain ${p.className || ''}`}
      />
    );
  }

  const type = p.fallbackType || 'logo';
  if (type === 'stamp') return <StampFallback type={type} alt={p.alt} className={p.className} width={p.width} height={p.height} />;
  if (type === 'signature') return <SignatureFallback type={type} alt={p.alt} className={p.className} width={p.width} height={p.height} />;
  if (type === 'wosm') return <WosmFallback type={type} alt={p.alt} className={p.className} width={p.width} height={p.height} />;
  if (type === 'banner') {
    return (
      <div className={`w-full h-28 rounded-xl bg-gradient-to-r from-[#5D4037] via-[#8D6E63] to-[#2E7D32] flex items-center justify-center text-white ${p.className || ''}`}>
        <div className="text-center p-3">
          <span className="text-2xl block mb-1">⚜️</span>
          <p className="text-xs font-bold tracking-tight opacity-95">{p.alt}</p>
        </div>
      </div>
    );
  }

  return <DefaultLogoFallback type={type} alt={p.alt} className={p.className} />;
};
