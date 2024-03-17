import { Button } from '@/components/ui/button';
import {
  isPresentationCurrent,
  isPresentationUpcoming,
} from '@/lib/presentation.utils';
import { updatePresentations } from '@/server-lib/actions';
import { prisma } from '@/server-lib/prisma';
import SideNavPresentationItem from '@/ui/dashboard/sidenav-presentation-item';
import SignOutForm from '@/ui/dashboard/signout-form';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const presentations = await prisma.presentation.findMany({
    orderBy: [{ start: 'asc' }, { room: 'asc' }],
  });

  const currentPresentations = presentations.filter(isPresentationCurrent);
  const upcomingPresentations = presentations.filter(isPresentationUpcoming);
  return (
    <main className="h-fit p-10">
      <SignOutForm className="mb-4" />
      <form action={updatePresentations}>
        <Button type="submit">Előadások frissítése</Button>
      </form>
      <h2 className="mb-5 mt-10">Aktuális előadások</h2>
      <ul>
        {currentPresentations.map((presentation) => (
          <SideNavPresentationItem
            presentation={presentation}
            key={presentation.id}
          />
        ))}
      </ul>
      <h2 className="mb-5 mt-10">Következő előadások</h2>
      <ul>
        {upcomingPresentations.map((presentation) => (
          <SideNavPresentationItem
            presentation={presentation}
            key={presentation.id}
          />
        ))}
      </ul>
    </main>
  );
}
