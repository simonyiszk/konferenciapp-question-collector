import { notFound } from 'next/navigation';
import React from 'react';
import { FiInbox } from 'react-icons/fi';

import { isPresentationCurrent } from '@/lib/presentation.utils';
import { getSelectedPresentationQuestions } from '@/server-lib/actions';
import { TimeCard } from '@/ui/dashboard/presentation/time-card';
import { StatsCard } from '@/ui/dashboard/stats-card';
import QuestionList from '@/ui/question/presentation/[id]/QuestionList';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const presentationId = (await params).id;
  if (!presentationId) {
    throw new Error('Invalid presentation id');
  }

  const presentation = await getSelectedPresentationQuestions(presentationId);

  if (!presentation) {
    notFound();
  }

  return (
    <main className="space-y-4 p-10">
      <h1>{presentation.title}</h1>
      <div className="flex space-x-2 text-sm text-white">
        {presentation.room && (
          <span className="rounded-full bg-red-500 p-1.5 px-4">
            {presentation.room}
          </span>
        )}
        {isPresentationCurrent(presentation) && (
          <span className="rounded-full bg-green-500 p-1.5 px-4">Live</span>
        )}
      </div>
      <StatCards
        start={presentation.start}
        end={presentation.end}
        noQuestions={presentation.questions.length}
      />
      <span className="mb-4 mt-4 block h-1 w-32 rounded-lg bg-gray-300" />

      <QuestionList
        presentationId={presentationId}
        initialData={presentation}
      />
    </main>
  );
}

function StatCards({
  start,
  end,
  noQuestions,
}: {
  start: Date;
  end: Date;
  noQuestions: number;
}) {
  return (
    <div className="flex w-full flex-col gap-5 md:flex-row">
      <TimeCard start={start} end={end} />
      <StatsCard title="Beérkezett" icon={FiInbox}>
        {noQuestions}
      </StatsCard>
    </div>
  );
}
