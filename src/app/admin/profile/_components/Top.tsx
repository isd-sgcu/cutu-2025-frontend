import { getImageURL } from '@/utils/image';
import Image from 'next/image';
import React from 'react';

export default function Top() {
  return (
    <div className="flex flex-col items-center py-10 text-white">
      <Image
        src={getImageURL('/staff/logowhite.svg')}
        alt="logo"
        width={65}
        height={91}
      />
      <div className="mt-8 text-xl">75th CU-TU Unity Football</div>
      <div className="mt-6 text-3xl font-semibold">Welcome!, Admin</div>
      <div className="text-xl">username</div>
    </div>
  );
}
