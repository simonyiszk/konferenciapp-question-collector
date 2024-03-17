import { QuestionState } from '@prisma/client';
import React from 'react';
import { FiInbox } from 'react-icons/fi';

import { isPresentationCurrent } from '@/lib/presentation.utils';
import { prisma } from '@/server-lib/prisma';
import { TimeCard } from '@/ui/dashboard/presentation/time-card';
import { StatsCard } from '@/ui/dashboard/stats-card';
import { ReadonlyQuestionGrid } from '@/ui/question/presentation/[id]/readonly-question-grid';

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) {
    throw new Error('Invalid presentation id');
  }
  const result = await prisma.presentation.findUnique({
    where: { id: params.id },
    include: {
      questions: {
        orderBy: [{ updatedAt: 'asc' }, { createdAt: 'asc' }],
        where: { mark: QuestionState.SELECTED },
      },
    },
  });

  if (!result) throw new Error('Invalid presentation id');

  const { questions, ...presentation } = result;

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
        noQuestions={questions.length}
      />
      <span className="mb-4 mt-4 block h-1 w-32 rounded-lg bg-gray-300" />

      <ReadonlyQuestionGrid questions={questions} />
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
