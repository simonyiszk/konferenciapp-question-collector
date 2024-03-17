'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { PageRoot } from '@/types/route';

export function SignInForm() {
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
    <div className="flex max-w-xs flex-col space-y-4">
      {status && (
        <Button
          onClick={onClick}
          className="w-full bg-blue-500 hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600"
        >
          <span>Bejelentkezés Google Fiókkal</span>{' '}
          <ArrowRightIcon className="ml-auto w-5 md:w-6" />
        </Button>
      )}
      {status === 'loading' && <p className="h-10 font-bold">Loading...</p>}
      {status === 'authenticated' && (
        <Link href={PageRoot.asHref(PageRoot.admin)}>
          <Button className="w-full bg-blue-500 hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600">
            <span>{session?.user?.email ?? ' '}</span>
            <ArrowRightIcon className="ml-auto w-5  md:w-6" />
          </Button>
        </Link>
      )}
    </div>
  );
}
