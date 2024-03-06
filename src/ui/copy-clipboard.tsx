'use client';

export default function ClipBoard({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <span onClick={() => navigator.clipboard.writeText(text)}>{children}</span>
  );
}
