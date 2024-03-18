'use client';

import React from 'react';

import { useSSR, useTime } from '@/lib/hooks';

export interface TimeAgoProps extends React.HTMLAttributes<HTMLSpanElement> {
  time: Date;
  autoUpdate?: boolean;
}

export function TimeAgo({ time, autoUpdate, ...rest }: TimeAgoProps) {
  const ssr = useSSR();
  const now = useTime(autoUpdate);

  let content = ssr ? '' : timeDifference({ target: time, now }).human;

  return (
    <span title={toLocale(time)} {...rest}>
      {content}
    </span>
  );
}

export function toLocale(time: Date): string | undefined {
  return time.toLocaleDateString() + ' ' + time.toLocaleTimeString();
}

export function timeDifference({
  target,
  now,
  humanPrecision = 2,
}: {
  target: Date;
  now: Date;
  humanPrecision?: number;
}) {
  const diff = Math.abs(now.getTime() - target.getTime());
  const s = diff / 1000;
  const mi = s / 60;
  const h = mi / 60;
  const d = h / 24;

  const day = Math.floor(d % 31);
  const hour = Math.floor(h % 24);
  const minute = Math.floor(mi % 60);
  const second = Math.round(s % 60);

  const arr = [
    { unit: 'd', value: day },
    { unit: 'h', value: hour },
    { unit: 'm', value: minute },
    { unit: 's', value: second },
  ];

  const prefixed = (n: number) => (n < 10 ? '0' : '') + n;

  let human = '00s';
  if (arr.some((x) => x.value !== 0)) {
    // first N non-zero values
    arr.splice(
      0,
      arr.findIndex((x) => x.value > 0),
    );
    human = arr
      .slice(0, humanPrecision)
      .map(({ unit, value }) => prefixed(value) + unit)
      .join('');
  }

  return { human, day, hour, minute, second };
}
