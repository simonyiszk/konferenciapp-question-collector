import { type Presentation } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export default function SideNavPresentationItem({
  presentation,
}: {
  presentation: Presentation;
}) {
  const presenterInitials = getInitials(presentation.presenterFullName);
  return (
    <Link
      className={cn(
        'relative mb-5 flex items-center overflow-hidden rounded-xl bg-white p-3 shadow-md shadow-slate-500/10 active:bg-slate-50 dark:bg-slate-800 active:dark:bg-slate-700',
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
          {presentation.presenterFullName} • {presentation.room}
        </p>
      </div>
    </Link>
  );
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}
