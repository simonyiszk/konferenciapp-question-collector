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

export function PresentationGrid({
  questions,
  presentation,
}: {
  questions: Question[];
  presentation: Presentation;
}) {
  const [filter, setFilter] = useState<QuestionState>(QuestionState.NONE);

  let qs = questions.filter((q) => {
    switch (filter) {
      case QuestionState.NONE:
        return q.mark !== QuestionState.HIDDEN;
      case QuestionState.HIDDEN:
      case QuestionState.SELECTED:
        return q.mark === filter;
    }
  });

  // If marked: sort by time of marking
  if (filter !== QuestionState.NONE) {
    qs.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
  }

  if (!presentation) return <h1>Error no presentation set in this context</h1>;

  return (
    <>
      <QuestionFilterSwitch
        options={[
          { label: 'Beérkezett', value: QuestionState.NONE },
          { label: 'Megjelölt', value: QuestionState.SELECTED },
          { label: 'Törölt', value: QuestionState.HIDDEN },
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
