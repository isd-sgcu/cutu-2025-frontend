import Link from 'next/link';
import Image from 'next/image';
import { getImageURL } from '@/utils/image';

export default function Edit() {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex gap-2">
        <Image
          src={getImageURL('/profile/id_icon.svg')}
          height={24}
          width={24}
          alt="id_icon"
        />
        <p className="text-center font-medium text-white">บัญชีของฉัน</p>
      </div>
      <Link
        href={'user/edit'}
        className="flex h-12 w-[272px] justify-center rounded-full bg-white text-lg text-dark-pink"
      >
        <div className="flex flex-row items-center justify-center gap-1">
          <Image
            src={getImageURL('/profile/edit_icon.svg')}
            alt="edit"
            width={24}
            height={24}
          />
          <p>แก้ไขข้อมูลส่วนตัว</p>
        </div>
      </Link>
    </div>
  );
}
