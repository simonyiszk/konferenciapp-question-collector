'use client';

import React, { useEffect } from 'react';

import { timeDifference } from '@/lib/time-difference';

export interface TimeAgoProps extends React.HTMLAttributes<HTMLSpanElement> {
  time: Date;
  tick?: number;
}

export { timeDifference };

export function TimeAgo({ time, tick, ...rest }: TimeAgoProps) {
  const [ssr, setSsr] = React.useState(true);
  useEffect(() => setSsr(false), []);

  const [_tick, setTick] = React.useState(0);
  useEffect(() => {
    if (!tick) return;
    const interval = setInterval(() => setTick((tick) => tick + 1), tick);
    return () => clearInterval(interval);
  });

  if (ssr) return null;
  const { human } = timeDifference({ target: time, now: new Date() });

  return (
    <span title={time.toLocaleTimeString()} {...rest}>
      {human}
    </span>
  );
}
