'use client';
import Image from 'next/image';
import { getImageURL } from '@/utils/image';

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="relative">
        <div className="relative h-32 w-32">
          <Image src={getImageURL('/loading/Ring.svg')} fill alt="ring" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-20 w-14">
            <Image src={getImageURL('/loading/Logo.svg')} fill alt="logo" />
          </div>
        </div>
      </div>
    </main>
  );
}
