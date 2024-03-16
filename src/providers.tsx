'use client';

import { type Presentation } from '@prisma/client';
import { createContext } from 'react';

export const PresentationContext = createContext<Presentation | null>(null);

export function PresentationProvider({
  value = null,
  children,
}: {
  value: Presentation | null;
  children: React.ReactNode;
}) {
  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
}
