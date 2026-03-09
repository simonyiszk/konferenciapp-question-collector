import { NextResponse } from 'next/server';

import { updatePresentations } from '@/server-lib/actions';

export async function GET() {
  try {
    await updatePresentations();
    return NextResponse.json({ message: 'Presentations updated' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
