import { QuestionState } from '@prisma/client';
import Link from 'next/link';

import { prisma } from '@/app/lib/server/prisma';
import { QuestionCard } from '@/app/ui/dashboard/question-card';
import { StatsCard } from '@/app/ui/dashboard/stats-cards';
import { lusitana } from '@/app/ui/fonts';

import { isPresentationLive } from './lib';
import URLSearchFilter from './question-state-filterer';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;

  if (!id) {
    throw new Error('Invalid presentation id');
  }
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
  const isLive = isPresentationLive(presentation);

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
      <div className="my-2 flex space-x-2">
        <Link href="?filter=NONE">
          <button className="rounded-xl bg-gray-300 p-2">Összes</button>
        </Link>
        <Link href="?filter=SELECTED">
          <button className="rounded-xl bg-green-300 p-2">Megjelölt</button>
        </Link>
        <Link href="?filter=HIDDEN">
          <button className="rounded-xl bg-red-300 p-2">Elrejtett</button>
        </Link>
      </div>
      <span className="mb-4 mt-4 block h-1 w-32 rounded-lg bg-gray-300" />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-3">
        {presentation.questions.map((question) => (
          <URLSearchFilter key={question.id} mark={question.mark}>
            <QuestionCard question={question} />
          </URLSearchFilter>
        ))}
      </div>
    </main>
  );
}
