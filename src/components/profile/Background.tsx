import Image from 'next/image';
import { getImageURL } from '@/utils/image';
export default function Background() {
  return (
    <div className="-z-5 fixed left-0 top-0 mx-auto min-h-screen w-full max-w-screen-sm">
      <div>
        <Image
          src={getImageURL('/profile/Background.png')}
          className="opacity-70"
          fill
          alt="Background"
        />
        <div className="-z-10 h-screen bg-gradient-to-br from-[#322C4D] from-20% via-[#EA699F] to-[#F4B0CE]"></div>
      </div>
    </div>
  );
}
