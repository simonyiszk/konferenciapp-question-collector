'use server';

import { QuestionState } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/server-lib/prisma';

const QUESTION_MARKS = Object.values(QuestionState);

export async function setQuestionMark(formData: FormData) {
  const rawId = formData.get('id')?.toString();
  const mark = formData.get('mark')?.toString();

  if (
    !rawId ||
    !mark ||
    !Number.isInteger(Number.parseInt(rawId, 10)) ||
    !QUESTION_MARKS.includes(mark as QuestionState)
  ) {
    throw new Error('Invalid form data');
  }

  const id = Number.parseInt(rawId, 10);

  await prisma.question.update({
    data: {
      mark: mark as QuestionState,
    },
    where: { id },
  });

  revalidatePath('/dashboard');
}
