import React, { useEffect } from 'react';
import { MUMU_CONFIG } from './data/mumuData';
import { WebsiteRenderer } from './components/preview/WebsiteRenderer';

export default function App() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return <WebsiteRenderer config={MUMU_CONFIG} />;
}
