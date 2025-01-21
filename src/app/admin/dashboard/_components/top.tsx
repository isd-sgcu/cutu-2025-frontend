import { getImageURL } from '@/utils/image';
import Image from 'next/image';
import React from 'react';

export default function Top() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src={getImageURL('/staff/logowhite.svg')}
        alt="logo"
        width={65}
        height={91}
      />
      <h1 className="text-2xl text-white">Admin Panel</h1>
    </div>
  );
}
