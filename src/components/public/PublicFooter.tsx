import React from 'react';

interface PublicFooterProps {
  config?: any;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ config }) => (
  <footer className="mt-auto border-t border-stone-200/90 bg-white py-6 text-center text-xs text-stone-500">
    <div className="max-w-6xl mx-auto px-4 space-y-1">
      <p className="font-bold text-stone-700">
        {config?.kwarcabName || 'Kwartir Cabang Gerakan Pramuka Kota Depok'}
      </p>
      <p>{config?.footerText || '© 2026 Kwartir Cabang Gerakan Pramuka. Hak cipta dilindungi.'}</p>
    </div>
  </footer>
);
