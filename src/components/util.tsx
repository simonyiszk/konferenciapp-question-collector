'use client';
import { useEffect, useState } from 'react';

export function DisableSSR({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode | null;
}) {
  const [ssr, setSSR] = useState(true);
  useEffect(() => setSSR(false), []);

  return ssr ? fallback : children;
}

export default function ClipBoard({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  return (
    <span onClick={() => navigator.clipboard.writeText(content)}>
      {children}
    </span>
  );
}
