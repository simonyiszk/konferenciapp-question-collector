'use client';

import { type Presentation } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSidebar,
  FiUsers,
} from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { SideNavPresentationItem } from './sidenav-presentation-item';

export function SideNav({ presentations }: { presentations: Presentation[] }) {
  const [open, setOpen] = useState(false);
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
          <Link passHref href="/dashboard">
            <Button>
              <FiHome />
            </Button>
          </Link>
          <h1 className="truncate text-xl">Simonyi Konferencia</h1>
          <button
            onClick={() => setOpen(false)}
            className="block rounded-full border border-slate-200 p-2 hover:bg-slate-200 lg:invisible"
          >
            <FiChevronLeft />
          </button>
        </div>

        <div className="w-full flex-1 overflow-y-scroll p-4">
          {presentations.map((presentation) => (
            <SideNavPresentationItem
              key={presentation.id}
              presentation={presentation}
              href={`/dashboard/presentation/${presentation.id}`}
            />
          ))}
        </div>
        <div className="w-full rounded-tr-lg bg-white p-2 shadow-md shadow-slate-500/10">
          <Link passHref href="/dashboard">
            <Button variant="outline" className="mb-2 w-full">
              <FiHome />
              Home
            </Button>
          </Link>
          <Link href="/dashboard/banned" passHref>
            <Button variant="outline" className="w-full">
              <FiUsers />
              Kitiltott felhasználók
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
