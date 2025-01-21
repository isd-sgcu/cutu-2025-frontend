import Image from 'next/image';
import { getImageURL } from '@/utils/image';

export default function header() {
  const username = 'Yang';

  return (
    <div className="relative mx-auto items-center justify-center">
      <div className="relative flex flex-col pt-14">
        <div>
          <Image
            src={getImageURL('/profile/Logo.svg')}
            className="mx-auto"
            width={60}
            height={70}
            alt="Logo"
          />
        </div>
      </div>
      <div className="relative flex flex-col gap-1 text-center tracking-normal text-white">
        <h1 className="text-[18px] font-semibold leading-5">
          CU-TU Unity Football 75<sup>th</sup>
        </h1>
        <h2 className="text-[12px] font-normal leading-4">
          ฟุตบอลประเพณีธรรมศาสตร์-จุฬาฯ ครั้งที่ 75
        </h2>
        <div className="relative mt-3 flex flex-col">
          <h1 className="text-[20px] font-semibold leading-6">
            Welcome, <span>{username}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
