import { prisma } from '@/server-lib/prisma';
import SideNav from '@/ui/dashboard/sidenav';

export const dynamic = 'force-dynamic';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const presentations = await prisma.presentation.findMany({
    orderBy: [{ start: 'asc' }, { room: 'asc' }],
  });
  return (
    <div className="grid h-screen w-screen grid-cols-[400px_1fr] grid-rows-[1fr]">
      <SideNav presentations={presentations} />
      <div className="h-full w-full overflow-auto">{children}</div>
    </div>
  );
}
