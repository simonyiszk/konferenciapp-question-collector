import { QuestionState } from '@prisma/client';

import { prisma } from '@/app/lib/server/prisma';
import { isTimeFrameActive } from '@/app/lib/utils';
import QuestionGrid from '@/app/ui/dashboard/presentation/[id]/question-grid';
import { StatsCard } from '@/app/ui/dashboard/stats-card';
import { lusitana } from '@/app/ui/fonts';
import { PeriodicReloader } from '@/app/ui/utils';

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
  const isLive = isTimeFrameActive(presentation);

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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        <StatsCard
          title="Előadás vége"
          value={presentation.end.toISOString().slice(11, 16) || 'N/A'}
          type="pending"
        />
        <StatsCard
          title="Beérkezett"
          value={presentation.questions.length}
          type="invoices"
        />
        <StatsCard
          title="Megjelölt"
          value={
            presentation.questions.filter(
              (q) => q.mark === QuestionState.SELECTED,
            ).length
          }
          type="marked"
        />
      </div>
      <span className="mb-4 mt-4 block h-1 w-32 rounded-lg bg-gray-300" />
      <QuestionGrid questions={presentation.questions} />
    </main>
  );
}
