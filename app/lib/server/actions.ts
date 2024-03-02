'use server';

import { QuestionState } from '@prisma/client';

import { prisma } from '@/app/lib/server/prisma';

const MARKS = Object.values(QuestionState);

export async function updateQuestion(formData: FormData) {
  const rawId = formData.get('id')?.toString();
  const mark = formData.get('mark')?.toString();

  if (
    !rawId ||
    !mark ||
    !Number.isInteger(Number.parseInt(rawId)) ||
    !MARKS.includes(mark as QuestionState)
  ) {
    throw new Error('Invalid form data');
  }

  const id = Number.parseInt(rawId);

  return await prisma.question.update({
    data: {
      mark: mark as QuestionState,
    },
    where: { id },
  });
}
