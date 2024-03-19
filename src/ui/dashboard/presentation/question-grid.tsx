'use client';
import {
  type Presentation,
  type Question,
  QuestionState,
} from '@prisma/client';
import { useState } from 'react';

import { CreateQuestionCardForm } from '@/ui/dashboard/presentation/create-question-card-form';
import { QuestionFilterSwitch } from '@/ui/dashboard/presentation/question-filter-switch';
import { QuestionCard } from '@/ui/dashboard/question-card';
import { ErrorBoundary } from '@/ui/error-boundary';
import { MainGridLayout } from '@/ui/grid-layout';

const FilterMapping: Record<
  QuestionState,
  (questions: Question[]) => Question[]
> = {
  [QuestionState.NONE]: (questions) =>
    questions.filter((q) => q.mark !== QuestionState.HIDDEN),
  [QuestionState.SELECTED]: (questions) =>
    questions.filter((q) => q.mark === QuestionState.SELECTED),
  [QuestionState.HIDDEN]: (questions) =>
    questions.filter((q) => q.mark === QuestionState.HIDDEN),
};

export function PresentationGrid({
  questions,
  presentation,
}: {
  questions: Question[];
  presentation: Presentation;
}) {
  const [filter, setFilter] = useState<QuestionState>(QuestionState.NONE);
  const qs = FilterMapping[filter](questions);

  if (filter !== QuestionState.NONE)
    qs.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());

  if (!presentation) return <h1>Error no presentation set in this context</h1>;

  return (
    <>
      <QuestionFilterSwitch
        options={[
          { label: 'Összes', value: QuestionState.NONE },
          { label: 'Megjelölt', value: QuestionState.SELECTED },
          { label: 'Elrejtett', value: QuestionState.HIDDEN },
        ]}
        currentOption={filter}
        onOptionChange={setFilter}
      />

      <MainGridLayout>
        <ErrorBoundary>
          <CreateQuestionCardForm presentationId={presentation.id} />
        </ErrorBoundary>
        {qs.map((question) => (
          <ErrorBoundary key={question.id}>
            <QuestionCard question={question} />
          </ErrorBoundary>
        ))}
      </MainGridLayout>
    </>
  );
}
