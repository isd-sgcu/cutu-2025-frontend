'use client';

import React from 'react';
import QRCode from 'react-qr-code';
import Image from 'next/image';
import { getImageURL } from '@/utils/image';
import { useLiff } from '@/contexts/liff';

export default function QR() {
  const { client } = useLiff();
  const context = client?.getContext();
  const userId = context?.userId || '';
  return (
    <div>
      <div className="flex justify-center gap-2">
        <Image
          src={getImageURL('/profile/icon_ticket.svg')}
          height={16}
          width={16}
          alt="icon_ticket"
        />
        <h2 className="text-center text-white">Your QR-Code</h2>
      </div>
      <div className="mt-4">
        <QRCode value={userId} className="bg-white p-4" />
      </div>
    </div>
  );
}
