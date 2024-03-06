'use client';

import '@/ui/global.css';

import { SessionProvider } from 'next-auth/react';

import { inter } from '@/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <SessionProvider session={null}>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </SessionProvider>
    </html>
  );
}
