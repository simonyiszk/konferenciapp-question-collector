import { type Presentation } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { isActiveNow } from '@/lib/utils';

export default function SideNavPresentationItem({
  presentation,
}: {
  presentation: Presentation;
}) {
  const isLive = isActiveNow(presentation);

  return (
    <Link
      className={
        'flex h-20 w-full items-center justify-center py-4 hover:bg-sky-100 hover:text-blue-600 ' +
        (isLive ? 'font-bold' : '')
      }
      href={`/dashboard/presentation/${presentation.id}`}
    >
      <div className="flex w-20 items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-gray-500">
          {presentation.presenterAvatar ? (
            <Image
              width={100}
              height={100}
              alt="Avatar of presenter"
              src={presentation.presenterAvatar}
              className="rounded-full"
            />
          ) : null}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <p className="">
          {presentation.title.split(' ').slice(0, 7).join(' ')}
          {/*
            Forgive me Daddy I was naughty.
            TODO: Use ellipses
          */}
          <span className="hidden">
            {presentation.title.split(' ').slice(7).join(' ')}
          </span>
        </p>
        <p className="text-gray-500">
          {presentation.presenterFullName} - {presentation.room}
        </p>
      </div>
    </Link>
  );
}
