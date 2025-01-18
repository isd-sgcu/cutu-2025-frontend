'use client';
import { useState } from 'react';
import { getImageURL } from '@/utils/image';
import Image from 'next/image';
import { useLiff } from '@/contexts/liff';
import ConfirmModal from './ConfirmModal';
// import ErrorModal from './ErrorModal';
// import AlreadyModal from './AlreadyModal';

export default function QRButton() {
  const { client } = useLiff();
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const [modalType, setModalType] = useState<
    'confirm' | 'error' | 'already' | null
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
        setModalType('error');
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('QR Scan failed:', err);
      setModalType('error');
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
          <Image
            src={getImageURL('/staff/qr.png')}
            width={24}
            height={24}
            alt="scan"
          />
          <p className="mt-1">คลิกเพื่อสแกน</p>
        </div>
      </div>
      {isModalOpen && modalType === 'confirm' && (
        <ConfirmModal
          userInfo={qrCodeValue}
          scanAgain={openQRScanner}
          closeFn={() => setIsModalOpen(false)}
        />
      )}
      {/* {modalType === 'error' && <ErrorModal onClose={closeModal} />}
      {modalType === 'already' && <AlreadyModal onClose={closeModal} />} */}
    </div>
  );
}
