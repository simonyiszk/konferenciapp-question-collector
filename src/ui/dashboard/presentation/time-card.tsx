'use client';
import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';

import { DisableSSR } from '@/components/util';
import { StatsCard } from '@/ui/dashboard/stats-card';
import { TimeAgo, toLocale } from '@/ui/dashboard/time-ago';

export function TimeCard({ start, end }: { start: Date; end: Date }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(intervalId);
  });
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
