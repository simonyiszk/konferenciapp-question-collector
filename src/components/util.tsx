'use client';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

export function ClipBoard({
  content,
  children,
}: {
  content: string;
  children: ReactNode;
}) {
  return (
    <span onClick={() => navigator.clipboard.writeText(content)}>
      {children}
    </span>
  );
}

export function WithSession({ children }: { children: ReactNode }) {
  return <SessionProvider session={null}>{children}</SessionProvider>;
}
