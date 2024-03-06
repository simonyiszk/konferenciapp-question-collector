export function isTimeFrameActive({ start, end }: { start: Date; end: Date }) {
  const now = new Date();
  return start && end && start < now && now < end;
}
