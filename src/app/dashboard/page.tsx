import { Button } from '@/components/ui/button';
import { updatePresentations } from '@/server-lib/actions';
import SignOutForm from '@/ui/dashboard/signout-form';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="p-10">
      <SignOutForm className="mb-4" />
      <form action={updatePresentations}>
        <Button type="submit">Előadások frissítése</Button>
      </form>
    </main>
  );
}
