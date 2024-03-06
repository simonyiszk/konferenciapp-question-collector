import { validate } from 'class-validator';

import { prisma } from '@/server-lib/prisma';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  OkResponse,
} from '@/server-lib/responses';
import { CreateQuestionInput } from '@/types/CreateQuestionsDto';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userid');

  if (!userId) return BadRequestResponse('Missing userid');

  try {
    const questions = await prisma.question.findMany({
      where: { presentationId: params.id, userId },
    });
    return OkResponse(questions);
  } catch (e) {
    console.log(e);
    return InternalServerErrorResponse(JSON.stringify(e));
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = CreateQuestionInput.fromPlain({
    ...(await req.json()),
    presentationId: params.id,
  });

  const errors = await validate(data, { forbidUnknownValues: true });
  if (errors.length !== 0) {
    return BadRequestResponse(JSON.stringify(errors));
  }

  try {
    const question = await prisma.question.create({
      data: {
        content: data.content,
        presentation: { connect: { id: data.presentationId } },
        user: {
          connectOrCreate: {
            where: { id: data.userId },
            create: { id: data.userId },
          },
        },
      },
    });
    return OkResponse(question);
  } catch (e) {
    console.log(e);
    return InternalServerErrorResponse(JSON.stringify(e));
  }
}
