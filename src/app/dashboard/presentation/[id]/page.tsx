import { InboxIcon, StarIcon } from '@heroicons/react/24/outline';
import { QuestionState } from '@prisma/client';

import { isActiveNow } from '@/lib/utils';
import { prisma } from '@/server-lib/prisma';
import QuestionGrid from '@/ui/dashboard/presentation/[id]/question-grid';
import { TimeCard } from '@/ui/dashboard/presentation/[id]/time-card';
import { StatsCard } from '@/ui/dashboard/stats-card';
import { lusitana } from '@/ui/fonts';
import { PeriodicReloader } from '@/ui/utils';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) {
    throw new Error('Invalid presentation id');
  }

  return (
    <PeriodicReloader interval={10_000}>
      <ActualPage id={params.id} />
    </PeriodicReloader>
  );
}

async function ActualPage({ id }: { id: string }) {
  const presentation = await prisma.presentation.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { createdAt: 'asc' },
        include: { user: true },
        where: { user: { blacklistedAt: null } },
      },
    },
  });

  if (!presentation) throw new Error('Invalid presentation id');
  const isLive = isActiveNow(presentation);

  return (
    <main>
      <div>
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
          {presentation.title}
        </h1>
        <div className="flex space-x-2 text-sm text-white">
          {presentation.room && (
            <span className="rounded-full bg-red-500 p-1.5 px-4">
              {presentation.room}
            </span>
          )}
          {isLive && (
            <span className="rounded-full bg-green-500 p-1.5 px-4">Live</span>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <TimeCard start={presentation.start} end={presentation.end} />
        <StatsCard title="Beérkezett" icon={InboxIcon}>
          {presentation.questions.length}
        </StatsCard>
        <StatsCard title="Megjelölt" icon={StarIcon}>
          {
            presentation.questions.filter(
              (q) => q.mark === QuestionState.SELECTED,
            ).length
          }
        </StatsCard>
      </div>
      <span className="mb-4 mt-4 block h-1 w-32 rounded-lg bg-gray-300" />
      <QuestionGrid questions={presentation.questions} />
    </main>
  );
}
