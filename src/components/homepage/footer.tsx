import { getImageURL } from '@/utils/image';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <section className="bg-black p-2">
      <div className="flex flex-row items-center justify-center gap-2 text-sm">
        <p className="text-white">Powered by</p>
        <Link className="flex" href={'https://www.instagram.com/isd.sgcu/'}>
          <Image
            alt="isdlogo"
            src={getImageURL('/homepage/isd.svg')}
            width={24}
            height={15}
          />
        </Link>
        <div className="flex">
          <Image
            alt="sgculogo"
            src={getImageURL('/homepage/sgcu.svg')}
            width={23}
            height={15}
          />
        </div>
      </div>
    </section>
  );
}
