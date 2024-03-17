import { type Presentation } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import {
  isPresentationCurrent,
  isPresentationPast,
  isPresentationUpcoming,
} from '@/lib/presentation.utils';
import { cn } from '@/lib/utils';

interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  presentation: Presentation;
}

export default function SideNavPresentationItem({
  presentation,
  className,
}: SideNavProps) {
  const isPast = isPresentationPast(presentation);
  const presenterInitials = getInitials(presentation.presenterFullName);
  return (
    <Link
      className={cn(
        'relative mb-5 flex items-center overflow-hidden rounded-xl bg-white p-3 shadow-md shadow-slate-500/10 hover:bg-slate-50 dark:bg-slate-800 hover:dark:bg-slate-700',
        {
          'opacity-50': isPast,
        },
        className,
      )}
      href={`/dashboard/presentation/${presentation.id}`}
    >
      {presentation.presenterAvatar ? (
        <Image
          width={50}
          height={50}
          alt="Avatar of presenter"
          src={presentation.presenterAvatar}
          className="h-14 w-14 rounded-full"
        />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2">
          <p className="text-xl">{presenterInitials}</p>
        </div>
      )}
      <div className="mx-2 flex-1 flex-col gap-2 overflow-hidden">
        <p className="truncate">{presentation.title}</p>
        <p className="text-slate-500">
          {presentation.presenterFullName} • {presentation.room} •{' '}
          {format(new Date(presentation.start), 'HH:mm')}
        </p>
      </div>
      <PresentationStatusIndicator presentation={presentation} />
    </Link>
  );
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 3)
    .join('');
}

interface PresentationStatusIndicatorProps {
  presentation: Presentation;
}

export function PresentationStatusIndicator({
  presentation,
}: PresentationStatusIndicatorProps) {
  const isCurrent = isPresentationCurrent(presentation);
  const isUpcoming = isPresentationUpcoming(presentation);
  return (
    <div
      className={cn('rounded-full p-1', {
        hidden: !isCurrent && !isUpcoming,
        'bg-yellow-400/30': isUpcoming,
        'bg-green-400/30': isCurrent,
      })}
    >
      <div
        className={cn('h-5 w-5 rounded-full', {
          'bg-yellow-400': isUpcoming,
          'bg-green-400': isCurrent,
        })}
      />
    </div>
  );
}
