'use server';

import { Presentation, Question, QuestionState } from '@prisma/client';
import { validate } from 'class-validator';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { PresentationQuestionService } from '@/app/api/presentation/[id]/question/service';
import { prisma } from '@/server-lib/prisma';
import { PresentationDto } from '@/types/CMSCH';

const QUESTION_MARKS = Object.values(QuestionState);

// Time window: future presentations + past 30 days
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export const getAllPresentations = async () => {
  const thirtyDaysAgo = new Date(Date.now() - THIRTY_DAYS_MS);

  return await prisma.presentation.findMany({
    orderBy: [{ start: 'asc' }, { room: 'asc' }],
    where: { start: { gte: thirtyDaysAgo } },
  });
};

export type PresentationWithQuestions = Presentation & {
  questions: Question[];
};

export async function getSelectedPresentationQuestions(presentationId: string) {
  if (!presentationId) {
    throw new Error('Invalid presentation id');
  }

  return await prisma.presentation.findUnique({
    where: { id: presentationId },
    include: {
      questions: {
        orderBy: [{ updatedAt: 'asc' }, { createdAt: 'asc' }, { id: 'asc' }],
        where: { mark: QuestionState.SELECTED },
      },
    },
  });
}

export async function getAllPresentationQuestions(presentationId: string) {
  if (!presentationId) {
    throw new Error('Invalid presentation id');
  }

  return await prisma.presentation.findUnique({
    where: { id: presentationId },
    include: {
      questions: {
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
      },
    },
  });
}

export async function setQuestionMark(formData: FormData) {
  const session = await getServerSession();
  if (!session?.user) throw new Error('Unauthorized');

  const rawId = formData.get('id')?.toString();
  const mark = formData.get('mark')?.toString();

  if (
    !rawId ||
    !mark ||
    !Number.isInteger(Number.parseInt(rawId, 10)) ||
    !QUESTION_MARKS.includes(mark as QuestionState)
  ) {
    throw new Error(`Invalid form data: rawId=${rawId},mark=${mark}`);
  }

  const id = Number.parseInt(rawId, 10);

  const updatedQuestion = await prisma.question.update({
    data: {
      mark: mark as QuestionState,
    },
    where: { id },
  });

  // Revalidate only the affected presentation pages
  const presentationId = updatedQuestion.presentationId;
  revalidatePath(`/dashboard/presentation/${presentationId}`);
  revalidatePath(`/question/presentation/${presentationId}`);
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
  revalidatePath('/');
}

const questionService = new PresentationQuestionService();

export async function createSelectedQuestion(formData: FormData) {
  const session = await getServerSession();
  if (!session?.user) throw new Error('Unauthorized');

  const presentationId = formData.get('presentationId')?.toString() || '';

  const { errors, data } = await questionService.validate(presentationId, {
    content: formData.get('content')?.toString() || '',
    userId: 'Admin',
  });

  if (errors || !data) {
    throw new Error('Invalid question data: ' + JSON.stringify(errors));
  }

  await questionService.create({
    ...data,
    selected: true,
  });

  // Revalidate only the affected presentation pages
  revalidatePath(`/dashboard/presentation/${presentationId}`);
  revalidatePath(`/question/presentation/${presentationId}`);
}
