import Image from 'next/image';

import AcmeLogo from '@/ui/acme-logo';
import { lusitana } from '@/ui/fonts';
import AuthButton from '@/ui/home/signin-form';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo>
          <p className="text-2xl">Simonyi Konferencia Előadói Kérdések</p>
        </AcmeLogo>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            Jelentkezz be, hogy elérd a kezelői felületet
          </p>
          <AuthButton />
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* TODO: relevant image here */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            alt="Screenshots of the project"
          ></Image>
        </div>
      </div>
    </main>
  );
}
