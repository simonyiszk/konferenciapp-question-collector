'use client';
import { StarIcon } from '@heroicons/react/24/outline';
import { Question } from '@prisma/client';

import { lusitana } from '@/app/ui/fonts';

export interface QuestionCardProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  question: Question;
}

export function QuestionCard({
  question: Question,
  ...rest
}: QuestionCardProps) {
  const Icon = Question.mark === 'SELECTED' ? StarIcon : null;
  return (
    <div
      onClick={() => {
        alert('question ' + Question.id);
      }}
      {...rest}
      className={' rounded-xl bg-gray-50 p-2 shadow-sm ' + rest.className}
    >
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">
          #{Question.id} from {Question.userId.slice(0, 10)}
        </h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {Question.content}
      </p>
    </div>
  );
}
