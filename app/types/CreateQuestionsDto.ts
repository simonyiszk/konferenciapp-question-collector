import { plainToInstance, Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export interface CreateQuestionDto {
  content: string;
  userId: string;
}

export class CreateQuestionInput {
  @IsNotEmpty()
  content!: string;

  @IsNotEmpty()
  userId!: string;

  // From slug
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsNotEmpty()
  @IsInt()
  presentationId!: number;

  static fromPlain(plain: CreateQuestionDto) {
    return plainToInstance(CreateQuestionInput, plain);
  }
}
