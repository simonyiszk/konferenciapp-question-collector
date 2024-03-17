'use client';

import { type Presentation } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSidebar,
} from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PageRoot } from '@/types/route';

import { PresentationItem } from '../presentation-item';

export function SideNavLayout({
  children,
  main,
}: {
  main: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid h-screen w-screen grid-cols-1 grid-rows-[4rem_1fr] overflow-hidden lg:grid-cols-[400px_1fr] lg:grid-rows-none">
      {children}
      <div className="h-full w-full overflow-auto">{main}</div>
    </div>
  );
}

export function SideNav({
  presentations,
  variant,
}: {
  presentations: Presentation[];
  variant: PageRoot;
}) {
  const [open, setOpen] = useState(false);

  const rootHref = PageRoot.asHref(variant);

  return (
    <>
      <div className="top-0 mx-10 mt-5 h-fit lg:hidden">
        <Button
          className="gap-0"
          variant="outline"
          onClick={() => setOpen(!open)}
        >
          <FiSidebar />
          <FiChevronRight />
        </Button>
        <hr className="mt-4 block h-1 w-32 rounded-lg bg-gray-300" />
      </div>
      <div
        onClick={() => setOpen(false)}
        className={cn(
          'absolute bottom-0 left-0 right-0 top-0 z-10 h-screen w-screen bg-black/50',
          {
            hidden: !open,
          },
        )}
      />
      <div
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setOpen(false);
        }}
        className={cn(
          'absolute bottom-0 left-0 top-0 z-10 flex h-full w-[400px] max-w-full flex-col items-center overflow-hidden bg-slate-200 shadow-lg shadow-slate-500/10 transition-transform lg:relative lg:translate-x-0',
          {
            '-translate-x-full': !open,
          },
        )}
      >
        <div className="flex w-full items-center justify-between gap-5 rounded-br-lg bg-white p-5 shadow-md shadow-slate-500/10">
          <Link passHref href={rootHref}>
            <Button>
              <FiHome />
            </Button>
          </Link>

          <Link href="/">
            <h1 className="truncate text-xl">Simonyi Konferencia</h1>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="block rounded-full border border-slate-200 p-2 hover:bg-slate-200 lg:invisible"
          >
            <FiChevronLeft />
          </button>
        </div>

        <div className="w-full flex-1 overflow-y-scroll p-4">
          {presentations.map((presentation) => (
            <PresentationItem
              key={presentation.id}
              presentation={presentation}
              href={`${rootHref}/presentation/${presentation.id}`}
            />
          ))}
        </div>

        <div className="w-full rounded-tr-lg bg-white p-2 shadow-md shadow-slate-500/10">
          <Link passHref href={rootHref}>
            <Button variant="outline" className="mb-2 w-full">
              <FiHome />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
