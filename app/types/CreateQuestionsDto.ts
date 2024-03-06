import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  presentationId!: string;

  static fromPlain(plain: CreateQuestionDto) {
    return plainToInstance(CreateQuestionInput, plain);
  }
}
