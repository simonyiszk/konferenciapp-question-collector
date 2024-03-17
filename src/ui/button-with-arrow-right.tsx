import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';

import { Button } from '@/components/ui/button';

export function ButtonWithArrowRight({
  children,
  onClick,
  className = '',
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button onClick={onClick} className={'w-full ' + className}>
      <div className="flex w-full flex-row">
        <span>{children}</span>{' '}
        <ArrowRightIcon className="ml-auto w-5 md:w-6" />
      </div>
    </Button>
  );
}
