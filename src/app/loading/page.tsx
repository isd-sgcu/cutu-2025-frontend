'use client';
import Image from 'next/image';
import Ring from '../../../public/loading/Ring.svg';
import Logo from '../../../public/loading/Logo.svg';

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="relative">
        <Image src={Ring} alt="logo" className="w-32" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src={Logo} alt="logo" className="w-14" />
        </div>
      </div>
    </main>
  );
}
