import { Question, QuestionState } from '@prisma/client';
import { FiClipboard, FiStar, FiTrash, FiUser } from 'react-icons/fi';

import { ClipBoard } from '@/components/util';
import { setQuestionMark } from '@/server-lib/actions';
import { TimeAgo } from '@/ui/dashboard/time-ago';

export function QuestionCard({ question }: { question: Question }) {
  const isSelected = question.mark === QuestionState.SELECTED;
  const isHidden = question.mark === QuestionState.HIDDEN;

  return (
    <div className="rounded-lg bg-white shadow-md">
      <form
        action={setQuestionMark}
        className="grid grid-cols-8 grid-rows-2 items-center justify-items-center gap-y-2 p-6 pb-3 xl:grid-cols-12"
      >
        <input className="hidden" type="hidden" name="id" value={question.id} />
        <FiUser className="row-start-1 h-6 w-6 justify-self-start" />

        <p
          title={question.userId}
          className="col-span-6 row-start-1 mx-1 max-w-[90%] overflow-x-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-gray-800 xl:col-span-8 xl:mx-0 xl:justify-self-start"
        >
          {question.userId}
        </p>

        <button type="button" title="másolás">
          <ClipBoard content={question.content}>
            <FiClipboard />
          </ClipBoard>
        </button>

        <span className="col-start-6 h-6 text-gray-500 hover:text-red-400 xl:col-span-6 xl:col-start-1 xl:w-28 xl:justify-self-start">
          {/* placeholder for the removed blacklist button*/}
        </span>

        <button
          title="elrejtés"
          type="submit"
          name="mark"
          value={isHidden ? QuestionState.NONE : QuestionState.HIDDEN}
          className={`h-6 w-6 xl:col-start-10 xl:row-start-1 xl:justify-self-end ${
            isHidden
              ? 'text-red-500 hover:text-gray-700'
              : 'text-gray-500 hover:text-red-700'
          } `}
        >
          <FiTrash />
        </button>

        <button
          className={`h-6 w-6 xl:col-start-11 xl:row-start-1 xl:justify-self-end ${
            isSelected ? 'text-yellow-500' : 'text-gray-500'
          } hover:text-yellow-600`}
          title="megjelölés"
          type="submit"
          name="mark"
          value={isSelected ? QuestionState.NONE : QuestionState.SELECTED}
        >
          <FiStar />
        </button>

        <p className="col-span-3 row-start-2 justify-self-start  text-sm text-gray-500 xl:col-span-4 xl:col-start-9 xl:justify-self-end">
          <TimeAgo time={question.createdAt} tick={1000} />
        </p>
      </form>

      <hr />

      <p className="max-h-60 overflow-y-auto p-6 pt-3 text-justify text-gray-700">
        {question.content}
      </p>
    </div>
  );
}
