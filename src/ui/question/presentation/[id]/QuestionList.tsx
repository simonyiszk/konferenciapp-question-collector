'use client';

import { useSelectedQuestions } from '@/hook/use-presentation-queries';
import { PresentationWithQuestions } from '@/server-lib/actions';
import { ReadonlyQuestionGrid } from '@/ui/question/presentation/[id]/readonly-question-grid';

interface QuestionListProps {
  presentationId: string;
  initialData: PresentationWithQuestions;
}

export default function QuestionList({
  initialData,
  presentationId,
}: QuestionListProps) {
  const { data, isLoading } = useSelectedQuestions(presentationId, initialData);

  return (
    <>
      {isLoading && (
        <div className="text-muted-foreground text-sm">Refreshing...</div>
      )}
      <ReadonlyQuestionGrid questions={data?.questions || []} />
    </>
  );
}
