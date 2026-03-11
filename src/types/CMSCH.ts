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
  slug!: string;
  @IsString()
  title!: string;
  @IsString()
  room!: string;
  @IsString()
  language!: string;
  @IsString()
  startTime!: string;
  @IsString()
  endTime!: string;
  @IsString()
  description!: string;
  @IsString()
  questionsUrl!: string;
  presenter!: PresenterDto | null;

  static fromPlain(plain: PresentationDto) {
    return plainToInstance(PresentationDto, {
      ...plain,
      presenter: PresenterDto.fromPlain(plain['presenter']),
    });
  }

  private parseTime(time: string) {
    const confDate = process.env.NEXT_PUBLIC_CONFERENCE_DATE || '2026-03-24';
    if (time.match(/^\d{2}:\d{2}$/)) {
      return new Date(`${confDate}T${time}:00`);
    }
    // If it's a full date, we still want to force the conference date from env
    const date = new Date(time);
    if (!isNaN(date.getTime())) {
      const parts = confDate.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0] || '2026', 10);
        const month = parseInt(parts[1] || '03', 10);
        const day = parseInt(parts[2] || '24', 10);
        date.setFullYear(year);
        date.setMonth(month - 1);
        date.setDate(day);
      }
      return date;
    }
    return date;
  }

  toPrismaTable(): Presentation {
    return {
      id: this.slug,
      start: this.parseTime(this.startTime),
      end: this.parseTime(this.endTime),
      room: this.room,
      title: this.title,
      presenterFullName: this.presenter?.name ?? 'Simonyi Konferencia',
      presenterAvatar: this.presenter?.pictureUrl ?? null,
    };
  }
}
