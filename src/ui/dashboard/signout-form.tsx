'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export interface SignOutFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}

export default function SignOutForm(props: SignOutFormProps) {
  const { data: session, update: updateSession } = useSession();
  useEffect(() => {
    updateSession();
  }, []);

  return (
    <form {...props}>
      <h1 className="mb-2 text-xl md:text-2xl">
        Üdv {session?.user?.email ?? 'Ismeretlen'}!
      </h1>
      <Button
        variant="destructive"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <div className="hidden md:block">Kijelentkezés</div>
      </Button>
    </form>
  );
}
