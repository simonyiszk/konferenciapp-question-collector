'use client';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode, useEffect, useState } from 'react';

export function DisableSSR({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode | null;
}) {
  const [ssr, setSSR] = useState(true);
  useEffect(() => setSSR(false), []);

  return ssr ? fallback : children;
}

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

export function PeriodicReloader({
  interval,
  children,
}: {
  interval: number;
  children: ReactNode;
}) {
  const router = useRouter();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      console.log('Hello', t, new Date());
      setTick((t) => t + 1);
      router.refresh();
    }, interval);
    () => clearTimeout(t);
  }, [tick]);
  return children;
}

export function WithSession({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
