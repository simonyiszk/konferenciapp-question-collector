import { Presentation } from '@prisma/client';
import { differenceInMinutes, isAfter, isBefore } from 'date-fns';

function getCurrentDate() {
  return new Date('2024-03-19T13:50:00Z');
}

export function isPresentationPast(presentation: Presentation) {
  const now = getCurrentDate();
  const end = new Date(presentation.end);
  return isBefore(end, now);
}

export function isPresentationCurrent(presentation: Presentation) {
  const now = getCurrentDate();
  const start = new Date(presentation.start);
  const end = new Date(presentation.end);
  return isBefore(start, now) && isAfter(end, now);
}

export function isPresentationUpcoming(presentation: Presentation) {
  const now = getCurrentDate();
  const start = new Date(presentation.start);
  return isAfter(start, now) && differenceInMinutes(start, now) < 15;
}
