'use client';
import { useState } from 'react';
import { useLiff } from '@/contexts/liff';
import Modal from './Modal';
import { ScanLine } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { scanQR } from '@/utils/qr';

export default function QrButton() {
  const { client } = useLiff();
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'confirm' | 'invalid' | 'already'>(
    'invalid',
  );
  const [userInfo, setUserInfo] = useState<string>();
  const [time, setTime] = useState<string>();

  const openQRScanner = async () => {
    if (!client?.isInClient()) {
      alert('Please use this feature inside the LINE app.');
      return;
    }

    if (!token?.accessToken) {
      console.error('Failed scaning QR: no accessToken');
      return;
    }

    const scanResult = await client.scanCodeV2();
    const userId = scanResult.value;

    if (!userId) {
      console.error('Failed scaning QR: No userId');
      return;
    }

    const { modalType, time, userInfo } = await scanQR(
      userId,
      token.accessToken,
    );

    setIsModalOpen(true);
    setModalType(modalType);
    setTime(time);
    setUserInfo(userInfo);
  };

  return (
    <div className="mt-12 flex cursor-pointer justify-center">
      <div className="flex h-12 w-72 flex-row justify-center rounded-full bg-white px-4 py-2 text-lg text-dark-pink">
        <ScanLine size={26} className="mr-2 mt-1" />
        <p className="mt-1" onClick={openQRScanner}>
          คลิกเพื่อสแกน
        </p>
      </div>
      {isModalOpen && modalType != null && (
        <Modal
          userInfo={userInfo}
          time={time}
          scanAgain={openQRScanner}
          closeFn={() => setIsModalOpen(false)}
          modalType={modalType}
        />
      )}
    </div>
  );
}
