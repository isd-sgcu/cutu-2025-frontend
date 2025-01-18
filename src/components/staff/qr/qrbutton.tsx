'use client';
import { useState } from 'react';
import { useLiff } from '@/contexts/liff';
import Modal from './Modal';
import { ScanLine } from 'lucide-react';

export default function QRButton() {
  const { client } = useLiff();

  // Define the file path

  // Read the existing file content

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
    <div className="mt-6 flex justify-center">
      <div
        onClick={openQRScanner}
        className="mt-6 h-12 w-72 rounded-full bg-white px-4 py-2 text-lg text-dark-pink"
      >
        <div
          onClick={openQRScanner}
          className="flex flex-row justify-center gap-2"
        >
          <ScanLine size={26} className="mt-1" />
          <p className="mt-1">คลิกเพื่อสแกน</p>
        </div>
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
