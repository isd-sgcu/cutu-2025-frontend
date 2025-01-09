import { getImageURL } from '@/utils/image';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="relative flex aspect-[394/103] items-center justify-between p-4">
        <Image
          src={getImageURL('/(user)/register/bg.jpg')}
          alt="background"
          fill
          className="-z-10 brightness-50"
        />
        <div>
          <div className="flex gap-2 font-[400] text-white">
            <ChevronLeft />
            กลับ
          </div>
          <div className="text-2xl font-[700] text-white">ลงทะเบียน</div>
        </div>
      </div>
      {children}
    </div>
  );
}
