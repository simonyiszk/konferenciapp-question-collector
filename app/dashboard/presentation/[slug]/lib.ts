export function isPresentationLive({ start, end }: { start: Date; end: Date }) {
  return (start && end && start < new Date() && end > new Date()) ?? false;
}
