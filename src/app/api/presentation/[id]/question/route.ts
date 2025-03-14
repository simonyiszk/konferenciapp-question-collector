import { prisma } from '@/server-lib/prisma';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  OkResponse,
} from '@/server-lib/responses';

import { PresentationQuestionService } from './service';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userid');

  if (!userId) return BadRequestResponse('Missing userid');

  try {
    const questions = await prisma.question.findMany({
      where: { presentationId: (await params).id, userId },
    });
    return OkResponse(questions);
  } catch (e) {
    console.error(e);
    return InternalServerErrorResponse(JSON.stringify(e));
  }
}

const service = new PresentationQuestionService();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { data, errors } = await service.validate(
    (await params).id,
    await req.json(),
  );
  if (errors || !data) return BadRequestResponse(JSON.stringify(errors));
  return service.create(data);
}
