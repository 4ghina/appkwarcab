import { useState, useEffect } from 'react';

export function getInitialRoute(): string {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.startsWith('/portal')) return 'portal';
    if (path.startsWith('/masuk')) return 'masuk';
    if (path.startsWith('/admin')) return 'admin';
    if (path.startsWith('/ranting/')) return 'ranting';
    if (path.startsWith('/gudep/')) return 'gudep';
    if (path.startsWith('/verifikasi')) return 'verifikasi';
  }
  return 'public';
}

export function getInitialSlug(): string {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.startsWith('/ranting/')) return decodeURIComponent(path.replace('/ranting/', ''));
    if (path.startsWith('/gudep/')) return decodeURIComponent(path.replace('/gudep/', ''));
  }
  return '';
}

export function useAppNavigation() {
  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [routeSlug, setRouteSlug] = useState<string>(getInitialSlug);
  const [returnToUrl, setReturnToUrl] = useState<string>('/portal');

  const navigateTo = (route: string, slug?: string) => {
    setCurrentRoute(route);
    if (slug !== undefined) setRouteSlug(slug);
    let path = '/';
    if (route === 'public') path = '/';
    else if (route === 'portal') path = '/portal';
    else if (route === 'masuk') path = '/masuk';
    else if (route === 'admin') path = '/admin';
    else if (route === 'ranting') path = `/ranting/${encodeURIComponent(slug || 'Pancoran Mas')}`;
    else if (route === 'gudep') path = `/gudep/${encodeURIComponent(slug || 'gudep-01')}`;
    else if (route === 'verifikasi') path = '/verifikasi';

    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/portal')) setCurrentRoute('portal');
      else if (path.startsWith('/masuk')) setCurrentRoute('masuk');
      else if (path.startsWith('/admin')) setCurrentRoute('admin');
      else if (path.startsWith('/ranting/')) {
        setCurrentRoute('ranting');
        setRouteSlug(decodeURIComponent(path.replace('/ranting/', '')));
      } else if (path.startsWith('/gudep/')) {
        setCurrentRoute('gudep');
        setRouteSlug(decodeURIComponent(path.replace('/gudep/', '')));
      } else if (path.startsWith('/verifikasi')) setCurrentRoute('verifikasi');
      else setCurrentRoute('public');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return { currentRoute, routeSlug, returnToUrl, setReturnToUrl, navigateTo };
}
