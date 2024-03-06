'use client';
import { Fragment, useEffect, useState } from 'react';

export function PeriodicReloader({
  interval,
  children,
}: {
  interval: number;
  children: React.ReactNode;
}) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => setTick(() => tick + 1), interval);
    return () => clearInterval(intervalId);
  });

  return <Fragment key={tick}>{children}</Fragment>;
}
