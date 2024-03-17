import { QuestionState } from '@prisma/client';
import { FiInbox, FiStar } from 'react-icons/fi';

import { isPresentationCurrent } from '@/lib/presentation.utils';
import { prisma } from '@/server-lib/prisma';
import { PresentationGrid } from '@/ui/dashboard/presentation/question-grid';
import { TimeCard } from '@/ui/dashboard/presentation/time-card';
import { StatsCard } from '@/ui/dashboard/stats-card';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) {
    throw new Error('Invalid presentation id');
  }

  const presentation = await prisma.presentation.findUnique({
    where: { id: params.id },
    include: {
      questions: {
        orderBy: { createdAt: 'asc' },
        include: { user: true },
      },
    },
  });

  if (!presentation) throw new Error('Invalid presentation id');

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
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <TimeCard start={presentation.start} end={presentation.end} />
        <StatsCard title="Beérkezett" icon={FiInbox}>
          {presentation.questions.length}
        </StatsCard>
        <StatsCard title="Megjelölt" icon={FiStar}>
          {
            presentation.questions.filter(
              (q) => q.mark === QuestionState.SELECTED,
            ).length
          }
        </StatsCard>
      </div>
      <span className="mb-4 mt-4 block h-1 w-32 rounded-lg bg-gray-300" />
      <PresentationGrid
        presentation={presentation}
        questions={presentation.questions}
      />
    </main>
  );
}
