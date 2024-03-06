'use client';
import { ClockIcon } from '@heroicons/react/24/outline';
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { useEffect, useState } from 'react';

import { StatsCard } from '@/ui/dashboard/stats-card';

export function TimeCard({ start, end }: { start: Date; end: Date }) {
  const [ssr, setSsr] = useState(true);
  useEffect(() => setSsr(false), []);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 500);
    return () => clearInterval(intervalId);
  });
  // Disable ssr to solve hydration mismatch
  if (ssr) return null;
  const started = start < now;
  const finished = end < now;
  const target = now < start ? start : end;
  const secs = Math.abs(differenceInSeconds(target, now)) % 60;
  const mins = Math.abs(differenceInMinutes(target, now)) % 60;
  const hours = Math.abs(
    differenceInHours(target, now, { roundingMethod: 'round' }),
  );

  const prefixed = (n: number) => (n < 10 ? `0${n}` : n);

  let s = '';
  if (hours !== 0) s += `${prefixed(hours)}h:`;
  s += `${prefixed(mins)}m`;
  if (hours === 0) s += `:${prefixed(secs)}s`;

  return (
    <StatsCard
      title={!started ? 'Kezdésig' : !finished ? 'Folyamatban' : 'Véget ért'}
      icon={ClockIcon}
    >
      <span className="font-mono" title={`start:\t${start}\nend:  \t${end}`}>
        {s}
      </span>
    </StatsCard>
  );
}
