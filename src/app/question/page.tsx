import { WithSession } from '@/components/util';
import { getAllPresentations } from '@/server-lib/actions';
import { PageRoot } from '@/types/route';
import { SignInForm } from '@/ui/home/signin-form';
import { PresentationWidgets } from '@/ui/presentation-widgets';

export const revalidate = 3600;

export default async function Page() {
  const presentations = await getAllPresentations();

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
