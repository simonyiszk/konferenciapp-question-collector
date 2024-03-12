import { updatePresentations } from '@/server-lib/actions';
import { Button } from '@/ui/button';
import SignOutButton from '@/ui/dashboard/signout-button';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main>
      <SignOutButton />
      <form action={updatePresentations}>
        <Button type="submit">Előadások frissítése</Button>
      </form>
    </main>
  );
}
