import { PowerIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import AcmeLogo from '@/app/ui/acme-logo';

export default function SideNav() {
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
          <Link
            className="flex h-20 w-full items-center justify-center bg-gray-400 hover:bg-sky-100 hover:text-blue-600"
            href={`/dashboard?presentation=${0}`}
          >
            Aktív előadás
          </Link>
          {new Array(15).fill(0).map((_, idx) => (
            <li key={idx}>
              <Link
                className="flex h-20 w-full items-center justify-center hover:bg-sky-100 hover:text-blue-600"
                href={`/dashboard?presentation=${idx}`}
              >
                Előadás {idx}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col space-y-2">
        <Link href="/dashboard/banned">
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <UserGroupIcon className="w-6" />
            <div className="hidden md:block">Kitoltott felhasználók</div>
          </button>
        </Link>

        <form>
          <Link href="/">
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Kijelentkezés</div>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
