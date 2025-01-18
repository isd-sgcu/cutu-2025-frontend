'use server';
import { useState } from 'react';
import { useLiff } from '@/contexts/liff';
import ConfirmModal from './ConfirmModal';
import { ScanLine } from 'lucide-react';
import fs from 'fs';
import path from 'path';
// import ErrorModal from './ErrorModal';
// import AlreadyModal from './AlreadyModal';

export default function QRButton() {
  const { client } = useLiff();

  // Define the file path
  const filePath = path.join(__dirname, 'qrCodeValue.json');

  // Read the existing file content
  let existingValues: string[] = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    const fileContent = JSON.parse(data);
    existingValues = fileContent.values || [];
  }

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

        // Check if the value already exists
        if (!existingValues.includes(value)) {
          // Add the new value
          existingValues.push(value);

          // Write the updated content back to the file
          fs.writeFileSync(
            filePath,
            JSON.stringify({ values: existingValues }, null, 2),
          );
        }
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
          <ScanLine size={26} className="mt-1" />
          <p className="mt-1">คลิกเพื่อสแกน</p>
        </div>
      </div>
      {isModalOpen && modalType === 'confirm' && (
        <ConfirmModal
          userInfo={qrCodeValue}
          scanAgain={openQRScanner}
          closeFn={() => setIsModalOpen(false)}
          modalType={modalType}
        />
      )}
      {/* {modalType === 'error' && <ErrorModal onClose={closeModal} />}
      {modalType === 'already' && <AlreadyModal onClose={closeModal} />} */}
    </div>
  );
}
