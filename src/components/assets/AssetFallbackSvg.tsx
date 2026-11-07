import React from 'react';

interface FallbackProps {
  type: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const StampFallback: React.FC<FallbackProps> = ({ alt, className, width, height }) => (
  <svg viewBox="0 0 100 100" className={`text-blue-700/80 ${className || ''}`} width={width || 70} height={height || 70} fill="none" aria-label={alt}>
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" strokeDasharray="4,2" />
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
    <path d="M50 30 L53 42 L65 42 L55 50 L59 62 L50 54 L41 62 L45 50 L35 42 L47 42 Z" fill="currentColor" opacity="0.6" />
    <text x="50" y="74" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="currentColor">KWARTIR CABANG</text>
  </svg>
);

export const SignatureFallback: React.FC<FallbackProps> = ({ alt, className, width, height }) => (
  <svg viewBox="0 0 160 80" className={`text-blue-900/90 ${className || ''}`} width={width || 120} height={height || 50} fill="none" aria-label={alt}>
    <path d="M20 50 C28 35, 34 25, 42 20 C48 16, 52 28, 48 45 C45 55, 40 60, 55 52 C70 42, 85 30, 95 38 C102 44, 98 56, 110 46 C120 38, 135 32, 145 35" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M35 62 L130 58" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const WosmFallback: React.FC<FallbackProps> = ({ alt, className, width, height }) => (
  <svg viewBox="0 0 60 60" className={`text-purple-700 ${className || ''}`} width={width || 40} height={height || 40} fill="none" aria-label={alt}>
    <circle cx="30" cy="30" r="28" fill="#4B0082" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="30" cy="30" r="25" stroke="#D8B4E2" strokeWidth="1" strokeDasharray="2,2" />
    <path d="M30 14 C32 20, 34 26, 30 35 C26 26, 28 20, 30 14 Z" fill="#FFFFFF" />
    <path d="M30 30 C34 26, 42 25, 42 31 C42 36, 34 37, 30 40 C30 40, 26 37, 18 31 C18 25, 26 26, 30 30 Z" fill="#FFFFFF" />
    <path d="M25 41 L35 41 L30 48 Z" fill="#FFFFFF" />
  </svg>
);

export const DefaultLogoFallback: React.FC<FallbackProps> = ({ alt, className }) => (
  <div className={`inline-flex items-center justify-center shrink-0 ${className || ''}`}>
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" aria-label={alt}>
      <circle cx="32" cy="32" r="30" fill="#5D4037" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="32" cy="32" r="26" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2,2" />
      <path d="M32 12 C33.5 17.5, 36.5 20.5, 42 23 C36.5 24.5, 35 27.5, 34 33 C37.5 31.5, 41.5 33, 44 36.5 C39 37.5, 35.5 40, 33.5 47 C33 51, 31 51, 30.5 47 C28.5 40, 25 37.5, 20 36.5 C22.5 33, 26.5 31.5, 30 33 C29 27.5, 27.5 24.5, 22 23 C27.5 20.5, 30.5 17.5, 32 12 Z" fill="#F59E0B" />
      <circle cx="32" cy="37" r="2" fill="#5D4037" />
    </svg>
  </div>
);
