import { WithSession } from '@/components/util';
import { prisma } from '@/server-lib/prisma';
import { PageRoot } from '@/types/route';
import { SideNav } from '@/ui/dashboard/sidenav';

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
    <WithSession>
      <div className="relative grid h-screen w-screen grid-cols-1 grid-rows-[min_1fr] overflow-hidden lg:grid-cols-[400px_1fr]">
        <SideNav presentations={presentations} variant={PageRoot.admin} />
        <div className="h-full w-full overflow-auto">{children}</div>
      </div>
    </WithSession>
  );
}
