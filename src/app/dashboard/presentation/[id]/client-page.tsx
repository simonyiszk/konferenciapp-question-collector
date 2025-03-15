'use client';
import { QuestionState } from '@prisma/client';
import { FiInbox, FiStar } from 'react-icons/fi';

import { useAllQuestions } from '@/hook/use-presentation-queries';
import { isPresentationCurrent } from '@/lib/presentation.utils';
import { PresentationWithQuestions } from '@/server-lib/actions';
import { PresentationGrid } from '@/ui/dashboard/presentation/question-grid';
import { TimeCard } from '@/ui/dashboard/presentation/time-card';
import { StatsCard } from '@/ui/dashboard/stats-card';
import { ErrorBoundary } from '@/ui/error-boundary';

export function DashboardPresentationPage({
  initialPresentation,
  presentationId,
}: {
  presentationId: string;
  initialPresentation: PresentationWithQuestions;
}) {
  const { data: presentation, isLoading } = useAllQuestions(
    presentationId,
    initialPresentation,
  );

  if (isLoading || !presentation) {
    return <p>Loading...</p>;
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

      <ErrorBoundary>
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
      </ErrorBoundary>
      <span className="mb-4 mt-4 block h-1 w-32 rounded-lg bg-gray-300" />
      <PresentationGrid
        presentation={presentation}
        questions={presentation.questions}
      />
    </main>
  );
}
