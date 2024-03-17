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
      <div className="space-y-4">
        <h1>Üdv {session?.user?.email ?? 'Ismeretlen'}!</h1>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
          Kijelentkezés
        </Button>
      </div>
    </form>
  );
}
