'use client';
import { Question, QuestionState } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { FiClipboard, FiStar, FiTrash, FiUser } from 'react-icons/fi';

import { ClipBoard } from '@/components/util';
import { setQuestionMark } from '@/server-lib/actions';
import { TimeAgo } from '@/ui/dashboard/time-ago';

export function QuestionCard({ question }: { question: Question }) {
  const isSelected = question.mark === QuestionState.SELECTED;
  const isHidden = question.mark === QuestionState.HIDDEN;
  const tanstack = useQueryClient();

  return (
    <div className="rounded-lg bg-white shadow-md">
      <div className="grid grid-cols-8 grid-rows-2 items-center justify-items-center gap-y-2 p-6 pb-3 xl:grid-cols-12">
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

        <form
          className="content xl:col-start-10 xl:row-start-1 xl:justify-self-end"
          action={async (formData) => {
            // First, call setQuestionMark to update the state
            await setQuestionMark(formData);

            // Then refresh the page to ensure changes are loaded
            await tanstack.refetchQueries();
          }}
        >
          <input type="hidden" name="id" value={question.id} />
          <input
            type="hidden"
            name="mark"
            value={isHidden ? QuestionState.NONE : QuestionState.HIDDEN}
          />
          <button
            title="elrejtés"
            type="submit"
            className={clsx(
              'h-6 w-6',
              isHidden
                ? 'text-red-500 hover:text-gray-700'
                : 'text-gray-500 hover:text-red-700',
            )}
          >
            <FiTrash />
          </button>
        </form>

        <form
          className="content xl:col-start-11 xl:row-start-1 xl:justify-self-end"
          action={async (formData) => {
            // First, call setQuestionMark to update the state
            await setQuestionMark(formData);

            // Then refresh the page to ensure changes are loaded
            await tanstack.refetchQueries();
          }}
        >
          <input type="hidden" name="id" value={question.id} />
          <input
            type="hidden"
            name="mark"
            value={isSelected ? QuestionState.NONE : QuestionState.SELECTED}
          />
          <button
            className={clsx(
              'h-6 w-6 hover:text-yellow-600',
              isSelected ? 'text-yellow-500' : 'text-gray-500',
            )}
            title="megjelölés"
            type="submit"
          >
            <FiStar />
          </button>
        </form>

        <p className="col-span-3 row-start-2 justify-self-start  text-sm text-gray-500 xl:col-span-4 xl:col-start-9 xl:justify-self-end">
          <TimeAgo time={question.createdAt} autoUpdate />
        </p>
      </div>

      <hr />

      <p className="max-h-60 overflow-y-auto p-6 pt-3 text-justify text-gray-700">
        {question.content}
      </p>
    </div>
  );
}
