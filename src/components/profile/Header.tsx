import Image from 'next/image';
import { getImageURL } from '@/utils/image';

export default function header() {
  const username = 'Yang';

  return (
    <div>
      <div className="relative mt-24 flex flex-col items-center justify-center">
        <div className="relative h-16 w-11">
          <Image
            src={getImageURL('/profile/Logo.svg')}
            className="opacity-100"
            fill
            alt="Logo"
          />
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center gap-1">
        <h1 className="text-center text-[18px] font-semibold leading-5 tracking-normal text-white">
          CU-TU Unity Football 75<sup>th</sup>
        </h1>
        <h2 className="text-center text-[12px] font-normal leading-4 tracking-normal text-white">
          ฟุตบอลประเพณีธรรมศาสตร์-จุฬาฯ ครั้งที่ 75
        </h2>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <h1 className="text-center text-[20px] font-medium leading-6 tracking-normal text-white">
          Welcome, <span>{username}</span>
        </h1>
      </div>
    </div>
  );
}
