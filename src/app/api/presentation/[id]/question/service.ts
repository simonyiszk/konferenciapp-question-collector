import { QuestionState } from '@prisma/client';
import { validate } from 'class-validator';

import { prisma } from '@/server-lib/prisma';
import {
  InternalServerErrorResponse,
  OkResponse,
} from '@/server-lib/responses';
import {
  CreateQuestionDto,
  CreateQuestionInput,
} from '@/types/CreateQuestionsDto';

export class PresentationQuestionService {
  async create({
    content,
    userId,
    presentationId,
    selected = false,
  }: CreateQuestionInput & { selected?: boolean }) {
    try {
      const question = await prisma.question.create({
        data: {
          content,
          mark: selected ? QuestionState.SELECTED : undefined,
          presentation: { connect: { id: presentationId } },
          user: {
            connectOrCreate: {
              where: { id: userId },
              create: { id: userId },
            },
          },
        },
      });
      return OkResponse(question);
    } catch (e) {
      console.error(e);
      return InternalServerErrorResponse(JSON.stringify(e));
    }
  }
  async validate(presentationId: string, body: CreateQuestionDto) {
    const data = CreateQuestionInput.fromPlain({
      ...body,
      presentationId,
    });

    const errors = await validate(data, { forbidUnknownValues: true });
    return errors.length === 0 ? { data } : { errors };
  }

  async findByUser(presentationId: string, userId: string) {
    try {
      const questions = await prisma.question.findMany({
        where: { presentationId, userId },
      });
      return OkResponse(questions);
    } catch (e) {
      console.error(e);
      return InternalServerErrorResponse(JSON.stringify(e));
    }
  }
}
