import { Presentation } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class PresenterDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  pictureUrl?: string;
  static fromPlain(plain: PresenterDto | null) {
    if (!plain) return null;
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
  @IsString()
  @IsNotEmpty()
  startTime!: string;
  @IsString()
  @IsNotEmpty()
  endTime!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsString()
  @IsNotEmpty()
  questionsUrl!: string;
  presenter!: PresenterDto | null;

  static fromPlain(plain: PresentationDto) {
    return plainToInstance(PresentationDto, {
      ...plain,
      presenter: PresenterDto.fromPlain(plain['presenter']),
    });
  }

  private parseTime(time: string) {
    if (time.match(/^\d{2}:\d{2}$/)) {
      const today = new Date().toISOString().split('T')[0];
      return new Date(`${today}T${time}:00`);
    }
    return new Date(time);
  }

  toPrismaTable(): Presentation {
    return {
      id: this.slug,
      start: this.parseTime(this.startTime),
      end: this.parseTime(this.endTime),
      room: this.room,
      title: this.title,
      presenterFullName: this.presenter!.name,
      presenterAvatar: this.presenter?.pictureUrl ?? null,
    };
  }
}
