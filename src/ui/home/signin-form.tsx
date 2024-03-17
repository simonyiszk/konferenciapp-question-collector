'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { PageRoot } from '@/types/route';

import { ButtonWithArrowRight } from '../button-with-arrow-right';

export function SignInForm() {
  const { data: session, status, update: updateSession } = useSession();
  useEffect(() => {
    updateSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <ButtonWithArrowRight
          onClick={onClick}
          className="w-full bg-blue-500 hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600"
        >
          Bejelentkezés Google Fiókkal
        </ButtonWithArrowRight>
      )}
      {status === 'loading' && <p className="h-10 font-bold">Loading...</p>}
      {status === 'authenticated' && (
        <Link href={PageRoot.asHref(PageRoot.admin)}>
          <ButtonWithArrowRight className="w-full bg-blue-500 hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600">
            {session?.user?.email ?? ' '}
          </ButtonWithArrowRight>
        </Link>
      )}
    </div>
  );
}
