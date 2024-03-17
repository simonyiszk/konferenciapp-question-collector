import { prisma } from '@/server-lib/prisma';
import { PageRoot } from '@/types/route';
import { SideNav, SideNavLayout } from '@/ui/side-nav';

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
    <SideNavLayout main={children}>
      <SideNav presentations={presentations} variant={PageRoot.readonly} />
    </SideNavLayout>
  );
}
