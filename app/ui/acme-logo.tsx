import { GlobeAltIcon } from '@heroicons/react/24/outline';

import { lusitana } from '@/app/ui/fonts';

export interface AcmeLogoProps {
  children?: React.ReactNode;
}

export default function AcmeLogo({
  children = <p className="text-[44px]">Acme</p>,
}: AcmeLogoProps) {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      {children}
    </div>
  );
}
