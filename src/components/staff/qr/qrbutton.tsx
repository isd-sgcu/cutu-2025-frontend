'use client';
import { useState } from 'react';
import { useLiff } from '@/contexts/liff';
import Modal from './Modal';
import { ScanLine } from 'lucide-react';
import { apiClient } from '@/utils/axios';
import { useAuth } from '@/contexts/auth';

export default function QrButton() {
  const { client } = useLiff();
  const { token } = useAuth();
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
      const value = result.value ?? '';

      // Post the QR code result to the API
      const status = await postQrCodeToApi(value ?? '');
      setModalType(status?.toString() as 'confirm' | 'invalid' | 'already');
      setQrCodeValue(value);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error scanning QR code:', error);
      alert('Failed to scan QR code. Please try again.');
      setModalType('invalid');
      setIsModalOpen(true);
    }
  };

  const postQrCodeToApi = async (value: string) => {
    try {
      const response = await apiClient.post(
        `/users/qr/${value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        },
      );
      if (response.status === 200) {
        return 'confirm';
      } else if (response.status === 400) {
        return 'already';
      } else if (response.status === 500) {
        return 'invalid';
      } else {
        return 'invalid';
      }
    } catch (error) {
      console.error('Error posting QR code to API:', error);
      return error;
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
