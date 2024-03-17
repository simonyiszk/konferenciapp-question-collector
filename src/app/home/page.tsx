import Link from 'next/link';

import { WithSession } from '@/components/util';
import { ButtonWithArrowRight } from '@/ui/button-with-arrow-right';
import { SignInForm } from '@/ui/home/signin-form';

export default function Page() {
  return (
    <WithSession>
      <main className="flex min-h-screen items-center justify-center gap-10 p-10">
        <div className="space-y-10">
          <h1 className="text-2xl">Simonyi Konferencia Előadói Kérdések</h1>
          <div className="max-w-fit">
            <h2 className="text-xl">A kérdések megtekintése</h2>
            <div className="w-full gap-6 rounded-lg bg-slate-100 p-5 pl-0">
              <Link href="/question">
                <ButtonWithArrowRight>
                  Kérdések megtekintése
                </ButtonWithArrowRight>
              </Link>
            </div>
            <h2 className="text-xl">Moderátor nézet</h2>
            <div className="gap-6 rounded-lg bg-slate-100 p-5 pl-0">
              <SignInForm />
            </div>
          </div>
        </div>
      </main>
    </WithSession>
  );
}
