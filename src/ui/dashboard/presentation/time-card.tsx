'use client';
import { FiClock } from 'react-icons/fi';

import { useSSR, useTime } from '@/lib/hooks';
import { StatsCard } from '@/ui/dashboard/stats-card';
import { TimeAgo, toLocale } from '@/ui/dashboard/time-ago';

export function TimeCard({ start, end }: { start: Date; end: Date }) {
  const ssr = useSSR();
  const now = useTime();

  if (ssr) {
    return (
      <StatsCard title="Kezdésig" icon={FiClock}>
        <span className="invisible">00m00s</span>
      </StatsCard>
    );
  }

  const before = now < start;
  const during = now < end;

  return (
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
  );
}
