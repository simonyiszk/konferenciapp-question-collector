import { WithSession } from '@/components/util';
import { SignInForm } from '@/ui/home/signin-form';

export default function Page() {
  return (
    <WithSession>
      <main className="flex min-h-screen flex-col items-center justify-center gap-10">
        <h1 className="text-2xl">Simonyi Konferencia Előadói Kérdések</h1>
        <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-slate-100 p-5">
          <p>Jelentkezz be, hogy elérd a kezelői felületet!</p>
          <SignInForm />
        </div>
      </main>
    </WithSession>
  );
}
