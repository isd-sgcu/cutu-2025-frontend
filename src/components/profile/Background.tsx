import Image from 'next/image';
import { getImageURL } from '@/utils/image';
import React from 'react';
import './Background.css';
export default function Background() {
  return (
    <>
      <Image
        src={getImageURL('/profile/Background.png')}
        className="absolute inset-0 -z-10 opacity-50"
        fill
        alt="Background"
      />
      <div className="BG absolute inset-0 -z-20"></div>
    </>
  );
}
