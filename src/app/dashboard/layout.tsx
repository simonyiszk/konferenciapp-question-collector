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
    <div className="flex flex-col md:h-screen md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-80 xl:w-96">
        <SideNav presentations={presentations} />
      </div>
      <div className="flex-grow overflow-y-scroll p-6 md:p-12">{children}</div>
    </div>
  );
}
