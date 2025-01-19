'use client';
import { useState } from 'react';
import { useLiff } from '@/contexts/liff';
import Modal from './Modal';
import { ScanLine } from 'lucide-react';

export default function QrButton() {
  const { client } = useLiff();

  // TODO: Define the file path
  // TODO: Read the existing file content

  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const [modalType, setModalType] = useState<
    'confirm' | 'invalid' | 'already' | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openQRScanner = async () => {
    if (!client?.isInClient()) {
      alert('Please use this feature inside the LINE app.');
      return;
    }
    try {
      const result = await client.scanCodeV2();
      const value = result.value;

      if (value) {
        setQrCodeValue(value);
        setIsModalOpen(true);
        setModalType('confirm');
      } else if (value === 'taken') {
        setModalType('already');
        setIsModalOpen(true);
      } else {
        setModalType('invalid');
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('QR Scan failed:', err);
      setModalType('invalid');
    }
  };

  return (
    <div className="mt-12 flex justify-center">
      <div className="flex h-12 w-72 flex-row justify-center rounded-full bg-white px-4 py-2 text-lg text-dark-pink">
        <ScanLine size={26} className="mr-2 mt-1" />
        <p className="mt-1">คลิกเพื่อสแกน</p>
      </div>
      {isModalOpen && modalType != null && (
        <Modal
          userInfo={qrCodeValue}
          scanAgain={openQRScanner}
          closeFn={() => setIsModalOpen(false)}
          modalType={modalType}
        />
      )}
    </div>
  );
}
