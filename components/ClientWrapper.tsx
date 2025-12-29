'use client';

import { LanguageProvider } from './LanguageProvider';

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

