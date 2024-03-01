'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { Button } from '@/app/ui/button';

export default function SignInForm() {
  const { data: session, status, update: updateSession } = useSession();
  useEffect(() => {
    updateSession();
  }, []);

  async function onClick() {
    try {
      console.log('Starting signin with google');
      const resp = await signIn('google', {
        callbackUrl: '/dashboard',
      });
      console.log('Signin with google response', resp);
    } catch (e) {
      console.error('Error signing in with google', e);
      await signOut();
    }
  }

  return (
    <div className="flex max-w-xs flex-col">
      {status && (
        <Button onClick={onClick} className="mb-4 w-full">
          <span>Bejelentkezés Google Fiókkal</span>{' '}
          <ArrowRightIcon className="ml-auto w-5 md:w-6" />
        </Button>
      )}
      {status === 'loading' && <p className="h-10 font-bold">Loading...</p>}
      {status === 'authenticated' && (
        <Link href="/dashboard">
          <Button className="w-full">
            <span>{session?.user?.email ?? ' '}</span>
            <ArrowRightIcon className="ml-auto w-5 md:w-6" />
          </Button>
        </Link>
      )}
    </div>
  );
}
