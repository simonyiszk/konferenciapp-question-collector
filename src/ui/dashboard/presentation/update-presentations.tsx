'use client';

import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { updatePresentations } from '@/server-lib/actions';

export function UpdatePresentations() {
  const tanstack = useQueryClient();

  return (
    <form
      action={async () => {
        await updatePresentations();
        await tanstack.refetchQueries();
      }}
    >
      <Button type="submit">Előadások frissítése</Button>
    </form>
  );
}
