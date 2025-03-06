import { WithSession } from '@/components/util';
import { prisma } from '@/server-lib/prisma';
import { PageRoot } from '@/types/route';
import { SideNav, SideNavLayout } from '@/ui/side-nav';

export const dynamic = 'force-dynamic';
const ALMOST_A_YEAR = 200 * 24 * 60 * 60 * 1000;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const presentations = await prisma.presentation.findMany({
    orderBy: [{ start: 'asc' }, { room: 'asc' }],
    where: { start: { gte: new Date(Date.now() - ALMOST_A_YEAR) } },
  });
  return (
    <WithSession>
      <SideNavLayout main={children}>
        <SideNav presentations={presentations} variant={PageRoot.admin} />
      </SideNavLayout>
    </WithSession>
  );
}
