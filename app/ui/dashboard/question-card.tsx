import { StarIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Question, QuestionState } from '@prisma/client';

import { setQuestionMark } from '@/app/lib/server/actions';
import { lusitana } from '@/app/ui/fonts';

export interface QuestionCardProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  question: Question;
}

export function QuestionCard({ question, ...rest }: QuestionCardProps) {
  const isSelected = question.mark === QuestionState.SELECTED;
  const isHidden = question.mark === QuestionState.HIDDEN;

  return (
    <div
      {...rest}
      className={' rounded-xl bg-gray-50 p-2 shadow-sm ' + rest.className}
    >
      <div className="flex justify-between p-4">
        <h3 className="ml-2 overflow-x-hidden text-sm font-medium">
          {question.userId}
        </h3>

        <form action={setQuestionMark} className="flex space-x-1.5">
          <input type="hidden" name="id" value={question.id} />
          <button
            title="elrejtés"
            type="submit"
            name="mark"
            value={isHidden ? QuestionState.NONE : QuestionState.HIDDEN}
            className={isHidden ? ' text-red-400' : ''}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          <button
            title="megjelölés"
            type="submit"
            name="mark"
            value={isSelected ? QuestionState.NONE : QuestionState.SELECTED}
            className={isSelected ? ' text-yellow-400' : ''}
          >
            <StarIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
      <p
        className={`${lusitana.className}
           rounded-xl bg-white px-4 py-8 text-justify`}
      >
        {question.content} at {question.createdAt.toISOString()}
      </p>
    </div>
  );
}
