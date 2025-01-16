import Image from 'next/image';
import { getImageURL } from '@/utils/image';

interface ConfirmModalProps {
  userInfo: string | null;
  isOpen: boolean;
  scanAgain: () => void;
}

const CongratsModal: React.FC<ConfirmModalProps> = ({
  userInfo,
  isOpen,
  scanAgain,
}) => {
  const modalClasses = `fixed inset-0 z-50 overflow-y-auto justify-center flex bg-gray-500 bg-opacity-75 transition-all ease-in-out duration-300 ${
    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`;

  return (
    <div className={`${modalClasses}`}>
      <div className={`flex h-full items-center shadow-lg`}>
        <div className="flex flex-row items-center justify-center">
          <div className="flex h-full w-72 flex-col items-center justify-center rounded-lg bg-white">
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
              {' '}
              <div
                onClick={scanAgain}
                className="flex h-10 w-32 items-center justify-center rounded-lg bg-dark-pink text-white"
              >
                สแกนต่อ
              </div>{' '}
              <div className="mt-3 flex h-10 w-32 items-center justify-center rounded-lg bg-dark-pink text-white">
                กลับ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratsModal;
