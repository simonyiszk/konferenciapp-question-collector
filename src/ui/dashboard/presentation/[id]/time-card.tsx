'use client';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import { StatsCard } from '@/ui/dashboard/stats-card';
import { TimeAgo } from '@/ui/dashboard/time-ago';

export function TimeCard({ start, end }: { start: Date; end: Date }) {
  // Fix hydration mismatch
  const [ssr, setSsr] = useState(true);
  useEffect(() => setSsr(false), []);

  const [_tick, setTick] = useState(0);
  useEffect(() => {
    const intervalId = setInterval((t) => setTick(t + 1), 1000);
    return () => clearInterval(intervalId);
  });
  if (ssr) return null;
  const now = new Date();
  const before = now < start;
  const during = now < end;

  const dateToString = (d: Date) =>
    `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;

  return (
    <StatsCard
      title={before ? 'Kezdésig' : during ? 'Folyamatban' : 'Véget ért'}
      icon={ClockIcon}
    >
      <TimeAgo
        className="font-mono"
        time={before ? start : end}
        title={`start:\t${dateToString(start)}\nend:  \t${dateToString(end)}`}
      />
    </StatsCard>
  );
}
