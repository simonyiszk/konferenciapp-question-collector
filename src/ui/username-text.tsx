'use client';
import { useSession } from 'next-auth/react';

export function Username() {
  const { data } = useSession();

  return <>{data?.user?.name ?? data?.user?.email ?? 'Felhasználó'}</>;
}
