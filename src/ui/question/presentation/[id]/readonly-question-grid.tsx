import { type Question } from '@prisma/client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function ReadonlyCards({ questions }: { questions: Question[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-8 xl:grid-cols-2 ">
      {questions.map((q) => (
        <ReadonlyCard key={q.id} question={q} />
      ))}
    </div>
  );
}

function ReadonlyCard({ question }: { question: Question }) {
  return (
    <Card
      key={question.id}
      className="rounded-md bg-white p-2 duration-1000 hover:shadow-md"
    >
      <CardHeader className="py-5 text-lg font-bold">Kérdés</CardHeader>
      <CardContent className="break-normal text-justify">
        {question.content}
      </CardContent>
    </Card>
  );
}
