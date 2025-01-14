'use client';
import { getImageURL } from '@/utils/image';
import Image from 'next/image';
import { useEffect } from 'react';
import liff from '@line/liff';
import { config } from '@/app/config';

export default function QRButton() {
  useEffect(() => {
    liff
      .init({ liffId: config.liffId })
      .catch(err => console.error('LIFF Initialization failed:', err));
  }, []);
  const openQRScanner = async () => {
    if (!liff.isInClient()) {
      alert('Please use this feature inside the LINE app.');
      return;
    }
    try {
      const result = await liff.scanCodeV2();
      alert(`Scanned QR Code: ${result.value}`);
    } catch (err) {
      console.error('QR Scan failed:', err);
    }
  };
  return (
    <div className="mt-6 flex justify-center">
      <Image
        onClick={openQRScanner}
        src={getImageURL('/staff/qr.png')}
        alt="edit"
        width={306}
        height={311}
      />
    </div>
  );
}
