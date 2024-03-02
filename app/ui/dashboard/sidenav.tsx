import { UserGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { prisma } from '@/app/lib/server/prisma';
import AcmeLogo from '@/app/ui/acme-logo';

export const dynamic = 'force-dynamic';

export default async function SideNav() {
  const presentations = await prisma.presentation.findMany({
    orderBy: { start: 'asc' },
  });
  return (
    <div className="flex h-screen w-72 flex-col bg-gray-300 p-2 pt-4">
      <Link className="flex rounded-md bg-black px-4 py-6" href="/dashboard">
        <div className="w-full text-white">
          <AcmeLogo>
            <p className="text-2xl">Simonyi Konferencia</p>
          </AcmeLogo>
        </div>
      </Link>
      <div className="mx-0 my-2 flex h-[50%] grow flex-col justify-between space-y-2 bg-white">
        <ul className="h-full overflow-y-scroll">
          {presentations.map((presentation) => {
            const active =
              presentation.start < new Date() && presentation.end > new Date();
            return (
              <li key={presentation.id}>
                <Link
                  className={
                    'flex h-20 w-full items-center justify-center hover:bg-sky-100 hover:text-blue-600 ' +
                    (active ? 'font-bold' : '')
                  }
                  href={`/dashboard/presentation/${presentation.id}`}
                >
                  {presentation.title}
                  <br />
                  <span className="font-light">{presentation.room}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col space-y-2">
        <Link href="/dashboard/banned">
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <UserGroupIcon className="w-6" />
            <div className="hidden md:block">Kitoltott felhasználók</div>
          </button>
        </Link>
      </div>
    </div>
  );
}
