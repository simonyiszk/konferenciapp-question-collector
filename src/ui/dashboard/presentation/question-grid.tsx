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

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateQuestionCardForm presentationId={presentation.id} />
        {qs.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </>
  );
}
