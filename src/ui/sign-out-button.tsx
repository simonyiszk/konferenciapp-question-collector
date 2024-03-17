'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export interface SignOutButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

export function SignOutButton(props: SignOutButtonProps) {
  return (
    <Button
      variant="destructive"
      onClick={() => signOut({ callbackUrl: '/' })}
      {...props}
    >
      Kijelentkezés
    </Button>
  );
}
