'use client';
import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';

import { DisableSSR } from '@/components/util';
import { StatsCard } from '@/ui/dashboard/stats-card';
import { TimeAgo, toLocale } from '@/ui/dashboard/time-ago';

export function TimeCard({ start, end }: { start: Date; end: Date }) {
  const [_tick, setTick] = useState(0);
  useEffect(() => {
    const intervalId = setInterval((t) => setTick(t + 1), 1000);
    return () => clearInterval(intervalId);
  });
  const now = new Date();
  const before = now < start;
  const during = now < end;

  return (
    <DisableSSR>
      <StatsCard
        title={before ? 'Kezdésig' : during ? 'Folyamatban' : 'Véget ért'}
        icon={FiClock}
      >
        <TimeAgo
          className="font-mono"
          time={before ? start : end}
          title={`start:\t${toLocale(start)}\nend:  \t${toLocale(end)}`}
        />
      </StatsCard>
    </DisableSSR>
  );
}
