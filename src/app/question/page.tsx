import { WithSession } from '@/components/util';
import { prisma } from '@/server-lib/prisma';
import { PageRoot } from '@/types/route';
import { SignInForm } from '@/ui/home/signin-form';
import { PresentationWidgets } from '@/ui/presentation-widgets';

export default async function Page() {
  const presentations = await prisma.presentation.findMany({
    orderBy: [{ start: 'asc' }, { room: 'asc' }],
  });

  const pageRoot = PageRoot.readonly;

  return (
    <main className="flex h-fit flex-col space-y-10 p-10 pt-5">
      <h1 className="mb-1">Simonyi Konferencia Q&A</h1>
      <WithSession>
        <h2>Moderátor hozzáférés</h2>
        <SignInForm />
      </WithSession>
      <hr />
      <PresentationWidgets presentations={presentations} pageRoot={pageRoot} />
    </main>
  );
}
