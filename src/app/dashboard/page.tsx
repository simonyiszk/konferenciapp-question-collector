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
      <SignOutForm />
      <PresentationWidgets presentations={presentations} pageRoot={pageRoot} />
    </main>
  );
}
