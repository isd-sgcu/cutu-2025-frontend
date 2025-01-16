import React from 'react';
import Image from 'next/image';
import { getImageURL } from '@/utils/image';

interface ConfirmModalProps {
  userInfo: string | null;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ userInfo, onClose }) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="flex h-64 w-[300px] flex-col items-center justify-center rounded-md bg-white">
        <div className="text-28s mb-4 font-normal">Confirm!</div>

        <Image
          src={getImageURL('/staff/confirm.svg')}
          width={36}
          height={36}
          alt="confirm"
        />
        <div className="mt-4 text-lg">สแกนสำเร็จ ยินดีต้อนรับ</div>
        <div className="text-lg font-semibold text-dark-pink">{userInfo}</div>
        <button
          onClick={onClose}
          className="mt-4 flex h-10 w-32 items-center justify-center rounded-lg bg-dark-pink text-white"
        >
          สแกนต่อ
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
