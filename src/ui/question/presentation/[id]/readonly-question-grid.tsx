'use client';
import { type Question } from '@prisma/client';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function ReadonlyQuestionGrid({ questions }: { questions: Question[] }) {
  const firstRender = useRef(true);
  const [notAnimated, setNotAnimated] = useState<number[]>([]);
  useEffect(() => {
    let it: any;
    if (firstRender.current) {
      firstRender.current = false;
      it = setTimeout(() => setNotAnimated(questions.map((q) => q.id)), 50);
    }
    return () => {
      firstRender.current = true;
      clearTimeout(it);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-6 grid grid-cols-1 gap-8 xl:grid-cols-2 ">
      {questions.map((q) => (
        <ReadonlyCard
          key={q.id}
          question={q}
          animate={!firstRender.current && !notAnimated.includes(q.id)}
        />
      ))}
    </div>
  );
}

function ReadonlyCard({
  question,
  animate,
}: {
  question: Question;
  animate: boolean;
}) {
  return (
    <Card
      key={question.id}
      className={clsx('rounded-md bg-white p-2 shadow-md duration-1000', {
        'animate-[backInRight]': animate,
      })}
    >
      <CardHeader className="py-5 text-lg font-bold">Kérdés</CardHeader>
      <CardContent className="max-h-60 overflow-y-auto break-normal text-justify">
        {question.content}
      </CardContent>
    </Card>
  );
}
