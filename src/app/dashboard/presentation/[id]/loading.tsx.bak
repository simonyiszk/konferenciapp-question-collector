'use client';
import { usePathname } from 'next/navigation';

import { MainGridLayout } from '@/ui/grid-layout';
import {
  CardsSkeleton,
  CreateQuestionCardSkeleton,
  FilterSwitchSkeleton,
  QuestionCardSkeleton,
} from '@/ui/skeletons';

export default function Loading() {
  const id = usePathname()
    ?.split('/')
    .findLast(() => true);

  return (
    <main className="space-y-4 p-10">
      <h1>{id?.replaceAll('-', ' ') ?? '...'}</h1>
      <div className="flex space-x-2 text-sm text-white">
        <span className="invisible rounded-full p-1.5 px-4">O</span>
      </div>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <CardsSkeleton amount={3} />
      </div>
      <span className="mb-4 mt-4 block h-1 w-32 rounded-lg bg-gray-300" />
      <FilterSwitchSkeleton options={['Összes', 'Megjelölt', 'Elrejtett']} />
      <MainGridLayout>
        <CreateQuestionCardSkeleton />
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
        <QuestionCardSkeleton />
      </MainGridLayout>
    </main>
  );
}
