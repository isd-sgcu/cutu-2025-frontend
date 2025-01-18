import React from 'react';
import Image from 'next/image';
import { getImageURL } from '@/utils/image';

interface ConfirmModalProps {
  modalType: 'confirm' | 'invalid' | 'already';
  userInfo: string | null;
  scanAgain: () => void;
  closeFn: () => void;
  time?: string; // Optional prop for 'already' type
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  modalType,
  userInfo,
  scanAgain,
  closeFn,
  time,
}) => {
  const modalClasses =
    'fixed inset-0 z-50 overflow-y-auto justify-center flex bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300';

  const renderContent = () => {
    switch (modalType) {
      case 'confirm':
        return (
          <>
            <div className="mb-4 mt-6 text-28s font-normal">Confirm!</div>
            <Image
              src={getImageURL('/staff/confirm.svg')}
              width={36}
              height={36}
              alt="confirm"
            />
            <div className="mt-4 text-lg">สแกนสำเร็จ ยินดีต้อนรับ</div>
            <div className="text-lg font-semibold text-dark-pink">
              {userInfo}
            </div>
            <div className="my-4 flex flex-col items-center justify-center">
              <div
                onClick={() => {
                  scanAgain();
                  closeFn();
                }}
                className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
              >
                สแกนอีกครั้ง
              </div>
            </div>
          </>
        );
      case 'invalid':
        return (
          <>
            <div className="mb-4 mt-6 text-28s font-normal">
              Invalid QR-Code
            </div>
            <Image
              src={getImageURL('/staff/disable.svg')}
              width={36}
              height={36}
              alt="invalid"
            />
            <div className="mt-4 text-lg">สแกนไม่สำเร็จ โปรดลองอีกครั้ง</div>
            <div className="my-4 flex flex-col items-center justify-center">
              <div
                onClick={() => {
                  scanAgain();
                  closeFn();
                }}
                className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
              >
                สแกนอีกครั้ง
              </div>
            </div>
          </>
        );
      case 'already':
        return (
          <>
            <div className="mb-4 mt-6 text-28s font-normal">Already taken!</div>
            <Image
              src={getImageURL('/staff/disable.svg')}
              width={36}
              height={36}
              alt="already"
            />
            <div className="mt-4 text-lg">
              ผู้ใช้สแกน QR-code นี้แล้ว เมื่อเวลา {time}
            </div>
            <div className="my-4 flex flex-col items-center justify-center">
              <div
                onClick={() => {
                  closeFn();
                }}
                className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white"
              >
                กลับ
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${modalClasses}`}>
      <div className={`flex h-full items-center shadow-lg`}>
        <div className="flex flex-row items-center justify-center">
          <div className="flex h-full w-72 flex-col items-center justify-center rounded-lg bg-white">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
