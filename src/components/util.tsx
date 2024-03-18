'use client';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode, useEffect, useState } from 'react';

import { useInterval } from '@/lib/hooks';

export function ClipBoard({
  content,
  children,
}: {
  content: string;
  children: ReactNode;
}) {
  return (
    <span onClick={() => navigator.clipboard.writeText(content)}>
      {children}
    </span>
  );
}

export function PeriodicReloader({ interval }: { interval: number }) {
  const STEPS = 5;

  const router = useRouter();
  const [tick, setTick] = useState(STEPS);

  useInterval(() => setTick((t) => t - 1), interval / STEPS);

  const href = typeof window !== 'undefined' ? window.location.href : '';
  useEffect(() => setTick(STEPS), [href]);

  if (tick === 0) {
    setTick(STEPS);
    router.refresh();
  }

  return null;
}

export function WithSession({ children }: { children: ReactNode }) {
  return <SessionProvider session={null}>{children}</SessionProvider>;
}
