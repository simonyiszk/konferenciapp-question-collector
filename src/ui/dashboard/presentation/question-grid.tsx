'use client';
import { type Question, QuestionState } from '@prisma/client';
import { useState } from 'react';

import { QuestionFilterSwitch } from '@/ui/dashboard/presentation/question-filter-switch';
import { QuestionCard } from '@/ui/dashboard/question-card';

export default function PresentationGrid({
  questions,
}: {
  questions: Question[];
}) {
  const [filter, setFilter] = useState<QuestionState>(QuestionState.NONE);
  const qs = questions.filter(
    (q) => filter === QuestionState.NONE || q.mark === filter,
  );
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
        {qs.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </>
  );
}
