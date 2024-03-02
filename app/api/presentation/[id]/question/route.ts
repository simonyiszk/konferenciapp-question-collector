import { validate } from 'class-validator';

import { prisma } from '@/app/lib/server/prisma';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  OkResponse,
} from '@/app/lib/server/responses';
import { CreateQuestionInput } from '@/app/types/CreateQuestionsDto';

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
