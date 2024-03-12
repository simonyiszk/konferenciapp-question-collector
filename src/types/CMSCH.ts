import { Presentation } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class PresenterDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  pictureUrl?: string;
  static fromPlain(plain: PresenterDto) {
    return plainToInstance(PresenterDto, plain);
  }
}
export class PresentationDto {
  @IsString()
  @IsNotEmpty()
  slug!: string;
  @IsString()
  @IsNotEmpty()
  title!: string;
  @IsString()
  @IsNotEmpty()
  room!: string;
  @IsString()
  @IsNotEmpty()
  language!: string;
  @IsDateString()
  @IsNotEmpty()
  startTime!: string;
  @IsDateString()
  @IsNotEmpty()
  endTime!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsString()
  @IsNotEmpty()
  questionsUrl!: string;
  presenter!: PresenterDto;

  static fromPlain(plain: PresentationDto) {
    return plainToInstance(PresentationDto, {
      ...plain,
      presenter: PresenterDto.fromPlain(plain['presenter']),
    });
  }

  toPrismaTable(): Presentation {
    return {
      id: this.slug,
      start: new Date(this.startTime),
      end: new Date(this.endTime),
      room: this.room,
      title: this.title,
      presenterFullName: this.presenter.name,
      presenterAvatar: this.presenter.pictureUrl ?? null,
    };
  }
}
