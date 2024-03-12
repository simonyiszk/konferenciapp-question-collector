'use server';

import { QuestionState } from '@prisma/client';
import { validate } from 'class-validator';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/server-lib/prisma';
import { PresentationDto } from '@/types/CMSCH';

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

export async function updatePresentations() {
  const url = process.env['CMSCH_CONFERENCES_API'];
  if (!url) {
    throw new Error('CMSCH_CONFERENCES_API not defined');
  }
  const res = await fetch(url, { cache: 'no-cache' }).then((res) => res.json());

  const presentationRaw: PresentationDto[] = res['presentations'];

  const presentations = presentationRaw.map((p) =>
    PresentationDto.fromPlain(p),
  );

  const errorsList = await Promise.all(presentations.map((p) => validate(p)));
  const errors = errorsList
    .filter((errors) => errors.length === 0)
    .reduce((errors, list) => [...list, ...errors], []);
  if (errors.length !== 0) {
    throw new Error('Unexpected CMSCH response: ' + JSON.stringify(errors));
  }

  const actions = presentations
    .map((p) => p.toPrismaTable())
    .map((p) =>
      prisma.presentation.upsert({
        create: p,
        update: p,
        where: { id: p.id },
      }),
    );
  await Promise.all(actions);
  revalidatePath('/dashboard');
}
