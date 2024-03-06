import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isActiveNow({ start, end }: { start: Date; end: Date }) {
  const now = new Date();
  return start && end && start < now && now < end;
}
