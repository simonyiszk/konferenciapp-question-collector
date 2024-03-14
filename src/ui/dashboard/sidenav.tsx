import { type Presentation } from '@prisma/client';
import Link from 'next/link';
import { FiHome, FiUsers } from 'react-icons/fi';

import { Button } from '@/components/ui/button';

import SideNavPresentationItem from './sidenav-presentation-item';

export const dynamic = 'force-dynamic';

export default async function SideNav({
  presentations,
}: {
  presentations: Presentation[];
}) {
  return (
    <div className="flex h-full w-[400px] flex-col items-center overflow-hidden bg-slate-200 shadow-inner shadow-slate-500/10">
      <div className="flex w-full items-center justify-center rounded-br-lg bg-white p-5 shadow-md shadow-slate-500/10">
        <Link href="/dashboard">Simonyi Konferencia</Link>
      </div>

      <div className="w-full flex-1 overflow-y-scroll p-4">
        {presentations.map((presentation) => (
          <SideNavPresentationItem
            key={presentation.id}
            presentation={presentation}
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
  );
}
