'use client';

import type { QuestionState } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

export default function URLSearchFilter({
  mark,
  children,
}: {
  mark: QuestionState;
  children: React.ReactNode;
}) {
  const search = useSearchParams();
  const filter = (search.get('filter') as QuestionState) ?? 'NONE';

  if (filter === 'NONE' || filter === mark) {
    return children;
  }

  return null;
}
