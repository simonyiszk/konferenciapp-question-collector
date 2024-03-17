'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function Username() {
  const { data, update } = useSession();
  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{data?.user?.name ?? data?.user?.email ?? 'Felhasználó'}</>;
}
