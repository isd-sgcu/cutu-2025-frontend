'use client';
import { useState } from 'react';
import { getImageURL } from '@/utils/image';
import Image from 'next/image';
import { useLiff } from '@/contexts/liff';
import ConfirmModal from '../confirm/ConfirmModal';

export default function QRButton() {
  const { client } = useLiff();
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

  const openQRScanner = async () => {
    if (!client?.isInClient()) {
      alert('Please use this feature inside the LINE app.');
      return;
    }
    try {
      const result = await client.scanCodeV2();
      setQrCodeValue(result.value);
      // alert(`Scanned QR Code: ${result.value}`);
    } catch (err) {
      console.error('QR Scan failed:', err);
    }
  };

  return (
    <div className="mt-6 flex justify-center">
      <div
        onClick={openQRScanner}
        className="mt-6 h-12 w-72 rounded-full bg-white px-4 py-2 text-lg text-dark-pink"
      >
        <div className="aspect-ratio flex flex-row justify-center gap-2">
          <Image
            src={getImageURL('/staff/qr.png')}
            alt="edit"
            width={20}
            height={21}
          />
          <p className="mt-1">คลิกเพื่อสแกน</p>
        </div>
      </div>
      {qrCodeValue && <ConfirmModal userinfo={qrCodeValue} isOpen={true} />}
    </div>
  );
}
