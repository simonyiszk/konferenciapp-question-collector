'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignOutForm() {
  const { data: session, update: updateSession } = useSession();
  useEffect(() => {
    updateSession();
  }, []);

  return (
    <form>
      <h1 className="mb-2 text-xl md:text-2xl">Üdv {session?.user?.email}!</h1>
      <button
        onClick={() => {
          signOut({ callbackUrl: '/' });
        }}
        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <div className="hidden md:block">Kijelentkezés</div>
      </button>
    </form>
  );
}
