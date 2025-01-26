import Image from 'next/image';
import { getImageURL } from '@/utils/image';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className="relative z-0 flex aspect-[393/267] w-full flex-col items-center justify-center">
      <Image
        src={getImageURL('/homepage/hero.png')}
        className="brightness-50"
        fill
        alt="hero"
      />
      <div className="relative flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold tracking-widest text-white">
          75th TU-CU
        </h1>
        <p className="text-base font-semibold text-white">
          15 กุมภาพันธ์ 2568 | 13.00
        </p>
        <p className="text-base font-semibold text-white">กรีฑาสถานแห่งชาติ</p>
        <Link
          href={'/register'}
          className="mt-4 rounded-[40px] bg-gradient-to-r from-[#2D284B] to-[#EB69A0] px-4 py-2 text-base font-semibold text-white"
        >
          ลงทะเบียน
        </Link>
      </div>
    </section>
  );
}
