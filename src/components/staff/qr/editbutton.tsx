import { getImageURL } from '@/utils/image';
import Image from 'next/image';
import Link from 'next/link';

export default function Edit() {
  return (
    <Link
      href={'staff/edit'}
      className="mt-6 h-12 w-72 items-center justify-center rounded-full bg-white px-4 py-2 text-lg text-dark-pink"
    >
      <div className="flex flex-row justify-center gap-3">
        <Image
          src={getImageURL('/staff/edit.svg')}
          alt="edit"
          width={20}
          height={22}
        />
        <p>แก้ไขข้อมูลส่วนตัว</p>
      </div>
    </Link>
  );
}
