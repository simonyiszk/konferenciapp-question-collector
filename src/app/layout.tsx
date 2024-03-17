import '@/ui/global.css';

import { PeriodicReloader } from '@/components/util';
import { inter } from '@/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body className={`${inter.className} antialiased`}>
        <PeriodicReloader interval={30_000}>{children}</PeriodicReloader>
      </body>
    </html>
  );
}
