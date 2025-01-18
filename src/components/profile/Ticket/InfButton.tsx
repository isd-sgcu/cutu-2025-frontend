import Link from 'next/link';
import Image from 'next/image';
import { getImageURL } from '@/utils/image';

export default function InfButton() {
  return (
    <Link
      href={'user/edit'}
      className="mt-2 flex h-9 w-52 items-center justify-center rounded-full border-[1px] border-white bg-gradient-to-r from-[#313051] from-20% via-[#607494] to-[#99C5E4]"
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
  );
}
