'use client';
import { type Question, QuestionState } from '@prisma/client';
import { useState } from 'react';

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
      <div className="my-2 flex space-x-2">
        <button
          className={`rounded-xl bg-gray-200 p-2 hover:bg-gray-600 hover:text-gray-100 ${
            filter === QuestionState.NONE ? 'bg-gray-600 text-gray-100' : ''
          }`}
          onClick={() => setFilter(QuestionState.NONE)}
        >
          Összes
        </button>
        <button
          className={`rounded-xl bg-green-300 p-2 hover:bg-green-500 ${
            filter === QuestionState.SELECTED ? 'bg-green-500' : ''
          }`}
          onClick={() => setFilter(QuestionState.SELECTED)}
        >
          Megjelölt
        </button>
        <button
          className={`rounded-xl bg-red-300 p-2 hover:bg-red-500 ${
            filter === QuestionState.HIDDEN ? 'bg-red-500' : ''
          }`}
          onClick={() => setFilter(QuestionState.HIDDEN)}
        >
          Elrejtett
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {qs.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </>
  );
}
