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
    <div className="relative grid h-screen w-screen grid-cols-1 grid-rows-[1fr] overflow-hidden lg:grid-cols-[400px_1fr]">
      <SideNav presentations={presentations} />
      <div className="h-full w-full overflow-auto">{children}</div>
    </div>
  );
}
