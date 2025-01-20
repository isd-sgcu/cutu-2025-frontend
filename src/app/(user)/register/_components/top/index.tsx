'use client';

import { getImageURL } from '@/utils/image';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export interface TopProps {
  backgroundPath: string;
  back: string;
  header: string;
  onBack?: () => void;
}

export default function Top({
  backgroundPath,
  back,
  header,
  onBack,
}: TopProps) {
  return (
    <div className="relative flex aspect-[394/103] w-full items-center justify-between p-4">
      <Image
        src={getImageURL(backgroundPath)}
        alt="background"
        fill
        className="-z-10 brightness-50"
      />
      <div>
        <div className="flex gap-2 font-[400] text-white" onClick={onBack}>
          <ChevronLeft />
          {back}
        </div>
        <div className="mt-2 text-2xl font-[700] text-white">{header}</div>
      </div>
    </div>
  );
}
