import { WithSession } from '@/components/util';
import { getAllPresentations } from '@/server-lib/actions';
import { PageRoot } from '@/types/route';
import { SideNav, SideNavLayout } from '@/ui/side-nav';

export const revalidate = 3600;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const presentations = await getAllPresentations();

  return (
    <WithSession>
      <SideNavLayout main={children}>
        <SideNav presentations={presentations} variant={PageRoot.admin} />
      </SideNavLayout>
    </WithSession>
  );
}
