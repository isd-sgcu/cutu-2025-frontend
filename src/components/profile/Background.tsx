import Image from 'next/image';
import { getImageURL } from '@/utils/image';
import React from 'react';
export default function Background() {
  return (
    <div className="fixed inset-0 top-0 -z-10 mx-auto min-h-screen w-full max-w-screen-sm">
      <div>
        <Image
          src={getImageURL('/profile/Background.png')}
          className="opacity-70 bg-blend-lighten"
          fill
          alt="Background"
        />
        <div className="-z-10 h-screen bg-gradient-to-br from-[#322C4D] from-20% via-[#EA699F] to-[#F4B0CE]"></div>
      </div>
    </div>
  );
}
