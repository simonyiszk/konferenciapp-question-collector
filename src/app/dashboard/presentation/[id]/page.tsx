import { notFound } from 'next/navigation';

import { getAllPresentationQuestions } from '@/server-lib/actions';

import { DashboardPresentationPage } from './client-page';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const presentationId = (await params).id;
  if (!presentationId) {
    throw new Error('Invalid presentation id');
  }

  const presentation = await getAllPresentationQuestions(presentationId);

  if (!presentation) {
    notFound();
  }

  return (
    <DashboardPresentationPage
      presentationId={presentationId}
      initialPresentation={presentation}
    />
  );
}
