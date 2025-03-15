import { getAllPresentations } from '@/server-lib/actions';
import { PageRoot } from '@/types/route';
import { UpdatePresentations } from '@/ui/dashboard/presentation/update-presentations';
import { ErrorBoundary } from '@/ui/error-boundary';
import { PresentationWidgets } from '@/ui/presentation-widgets';
import { SignOutButton } from '@/ui/sign-out-button';
import { Username } from '@/ui/username-text';

export const revalidate = 3600;

export default async function Page() {
  const presentations = await getAllPresentations();

  const pageRoot = PageRoot.admin;

  return (
    <main className="flex h-fit flex-col space-y-10 p-10">
      <h1>
        Üdv <Username />
      </h1>
      <div className="flex flex-col space-y-2">
        <ErrorBoundary>
          <UpdatePresentations />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <SignOutButton />
          </ErrorBoundary>
        </div>
      </div>
      <PresentationWidgets presentations={presentations} pageRoot={pageRoot} />
    </main>
  );
}
