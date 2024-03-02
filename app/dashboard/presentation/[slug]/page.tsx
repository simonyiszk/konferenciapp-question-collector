import { prisma } from '@/app/lib/server/prisma';
import { QuestionCard } from '@/app/ui/dashboard/question-card';
import { StatsCard } from '@/app/ui/dashboard/stats-cards';
import { lusitana } from '@/app/ui/fonts';

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
  const live =
    (presentation.start &&
      presentation.end &&
      presentation.start < new Date() &&
      presentation.end > new Date()) ??
    false;
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
          {live && (
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
            presentation.questions.filter((x) => x.mark === 'SELECTED').length
          }
          type="marked"
        />
      </div>
      <span className="mb-4 mt-4 block h-1 w-32 rounded-lg bg-gray-300" />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-3">
        {presentation.questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </main>
  );
}
