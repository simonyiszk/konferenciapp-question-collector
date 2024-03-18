import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export function MainGridLayout(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={clsx(
        'mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
        props.className,
      )}
    />
  );
}
