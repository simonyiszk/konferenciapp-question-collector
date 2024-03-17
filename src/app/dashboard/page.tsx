import { Button } from '@/components/ui/button';
import { updatePresentations } from '@/server-lib/actions';
import { prisma } from '@/server-lib/prisma';
import { PageRoot } from '@/types/route';
import { PresentationWidgets } from '@/ui/presentation-widgets';
import { SignOutButton } from '@/ui/sign-out-button';
import { Username } from '@/ui/username-text';

export default async function Page() {
  const presentations = await prisma.presentation.findMany({
    orderBy: [{ start: 'asc' }, { room: 'asc' }],
  });

  const pageRoot = PageRoot.admin;

  return (
    <main className="flex h-fit flex-col space-y-10 p-10">
      <h1>
        Üdv <Username />
      </h1>
      <div className="flex flex-col space-y-2">
        <form action={updatePresentations}>
          <Button type="submit">Előadások frissítése</Button>
        </form>
        <div>
          <SignOutButton />
        </div>
      </div>
      <PresentationWidgets presentations={presentations} pageRoot={pageRoot} />
    </main>
  );
}
