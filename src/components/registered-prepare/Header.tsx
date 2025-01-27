import Image from 'next/image';
import { getImageURL } from '@/utils/image';
import Link from 'next/link';

export default function header() {
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
      <div className="relative flex flex-col items-center justify-center gap-1 text-center tracking-normal text-white">
        <h1 className="text-[18px] font-semibold leading-5">
          CU-TU Unity Football 75<sup>th</sup>
        </h1>
        <h2 className="text-[12px] font-normal leading-4">
          ฟุตบอลประเพณีธรรมศาสตร์-จุฬาฯ ครั้งที่ 75
        </h2>
        <Link
          href={'user/information'}
          className="mt-6 flex h-8 w-52 items-center justify-center rounded-full border-[1px] border-white bg-gradient-to-r from-[#313051] from-20% via-[#607494] to-[#99C5E4]"
        >
          <div className="flex flex-row items-center gap-2">
            <Image
              src={getImageURL('/profile/information_icon.svg')}
              height={24}
              width={24}
              alt="information_icon"
            />
            <p className="text-sm font-semibold leading-4 text-white">
              วิธีการเตรียมตัวก่อนวันงาน
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
