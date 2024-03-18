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
import { MainGridLayout } from '@/ui/grid-layout';

export function PresentationGrid({
  questions,
  presentation,
}: {
  questions: Question[];
  presentation: Presentation;
}) {
  const [filter, setFilter] = useState<QuestionState>(QuestionState.NONE);
  const qs = questions.filter(
    (q) => filter === QuestionState.NONE || q.mark === filter,
  );

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
        <CreateQuestionCardForm presentationId={presentation.id} />
        {qs.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </MainGridLayout>
    </>
  );
}
