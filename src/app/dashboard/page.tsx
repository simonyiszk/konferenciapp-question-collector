import { Button } from '@/components/ui/button';
import { updatePresentations } from '@/server-lib/actions';
import { prisma } from '@/server-lib/prisma';
import { PageRoot } from '@/types/route';
import { SignOutForm } from '@/ui/dashboard/signout-form';
import { PresentationWidgets } from '@/ui/presentation-widgets';

export default async function Page() {
  const presentations = await prisma.presentation.findMany({
    orderBy: [{ start: 'asc' }, { room: 'asc' }],
  });

  const pageRoot = PageRoot.admin;

  return (
    <main className="flex h-fit flex-col space-y-10 p-10">
      <div className="flex flex-col space-y-2">
        <SignOutForm />
        <form action={updatePresentations}>
          <Button type="submit">Előadások frissítése</Button>
        </form>
      </div>
      <PresentationWidgets presentations={presentations} pageRoot={pageRoot} />
    </main>
  );
}
