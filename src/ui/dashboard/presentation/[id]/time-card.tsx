'use client';
import { ClockIcon } from '@heroicons/react/24/outline';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import { useEffect, useState } from 'react';

import { StatsCard } from '@/ui/dashboard/stats-card';

export function TimeCard({ start, end }: { start: Date; end: Date }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const int = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(int);
  });
  const started = start < now;
  const finished = end < now;
  const target = now < start ? start : end;
  const mins = Math.abs(differenceInMinutes(target, now)) % 60;
  const hours = Math.abs(differenceInHours(target, now));

  return (
    <StatsCard
      title={!started ? 'Kezdésig' : !finished ? 'Folyamatban' : 'Véget ért'}
      icon={ClockIcon}
    >
      <span title={`start:\t${start}\nend:  \t${end}`}>
        {hours < 10 ? '0' : ''}
        {hours}h{mins < 10 ? '0' : ''}
        {mins}m
      </span>
    </StatsCard>
  );
}
