import {
  ClipboardIcon,
  StarIcon,
  TrashIcon,
  UserIcon,
  UserMinusIcon,
} from '@heroicons/react/24/outline';
import { Question, QuestionState } from '@prisma/client';

import { setQuestionMark } from '@/server-lib/actions';

export function QuestionCard({ question }: { question: Question }) {
  const isSelected = question.mark === QuestionState.SELECTED;
  const isHidden = question.mark === QuestionState.HIDDEN;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <form
        action={setQuestionMark}
        className="mb-2 grid grid-cols-8 grid-rows-2  items-center justify-items-center gap-y-2 lg:grid-cols-12"
      >
        <input className="hidden" type="hidden" name="id" value={question.id} />
        <UserIcon className="row-start-1 h-6 w-6 justify-self-start" />

        <h3 className="col-span-6 row-start-1 mx-1 max-w-[90%] overflow-x-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-gray-800 lg:col-span-8 lg:mx-0 lg:justify-self-start">
          {question.userId}
        </h3>

        <ClipboardIcon className="row-start-1 h-6 w-6 text-gray-500 hover:text-gray-700 lg:col-start-12 lg:justify-self-end" />

        <button className="col-start-6 text-gray-500 hover:text-red-400 lg:col-span-6 lg:col-start-1 lg:justify-self-start">
          <span className="block lg:hidden">
            <UserMinusIcon className="h-6 w-6" />
          </span>
          <span className="hidden lg:block">blacklist user</span>
        </button>

        <button
          title="elrejtés"
          type="submit"
          name="mark"
          value={isHidden ? QuestionState.NONE : QuestionState.HIDDEN}
          className={`h-6 w-6 lg:col-start-10 lg:row-start-1 lg:justify-self-end ${
            isHidden ? 'text-red-500' : 'text-gray-500'
          } hover:text-gray-700`}
        >
          <TrashIcon />
        </button>

        <button
          className={`h-6 w-6 lg:col-start-11 lg:row-start-1 lg:justify-self-end ${
            isSelected ? 'text-yellow-500' : 'text-gray-500'
          } hover:text-yellow-600`}
          title="megjelölés"
          type="submit"
          name="mark"
          value={isSelected ? QuestionState.NONE : QuestionState.SELECTED}
        >
          <StarIcon />
        </button>

        <p className="col-span-3 row-start-2 justify-self-start  text-sm text-gray-500 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
          22 secs ago
        </p>
      </form>

      <p className="text-justify text-gray-700">{question.content}</p>
    </div>
  );

  // return (
  //   <div
  //     {...rest}
  //     className={' rounded-xl bg-gray-50 p-2 shadow-sm ' + rest.className}
  //   >
  //     <div className="w-100 flex p-4">
  //       {/* <form action={() => {}} className="flex-2"> */}
  //       <h3 className=" flex-2 flex space-x-2 overflow-x-hidden text-sm font-medium">
  //         <button className="hover:bg-gray-200">
  //           <UserMinusIcon className="h-5 w-5" />
  //         </button>
  //         <span>{question.userId.slice(5)}</span>
  //       </h3>
  //       {/* </form> */}

  //       <form action={setQuestionMark} className="flex space-x-1.5">
  //         <input type="hidden" name="id" value={question.id} />
  //         <button
  //           title="elrejtés"
  //           type="submit"
  //           name="mark"
  //           value={isHidden ? QuestionState.NONE : QuestionState.HIDDEN}
  //           className={'hover:bg-gray-200 ' + (isHidden ? ' text-red-400' : '')}
  //         >
  //           <TrashIcon className="h-5 w-5" />
  //         </button>
  //         <button
  //           title="megjelölés"
  //           type="submit"
  //           name="mark"
  //           value={isSelected ? QuestionState.NONE : QuestionState.SELECTED}
  //           className={isSelected ? ' text-yellow-400' : ''}
  //         >
  //           <StarIcon className="h-5 w-5" />
  //         </button>
  //       </form>
  //     </div>
  //     <p
  //       className={`${lusitana.className}
  //          rounded-xl bg-white px-4 py-8 text-justify`}
  //     >
  //       {question.content} at {question.createdAt.toISOString()}
  //     </p>
  //   </div>
  // );
}
