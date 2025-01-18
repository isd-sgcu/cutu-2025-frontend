import Image from 'next/image';
import { getImageURL } from '@/utils/image';

export default function QR() {
  return (
    <div>
      <div className="flex justify-center gap-2">
        <Image
          src={getImageURL('/profile/icon_ticket.svg')}
          height={16}
          width={16}
          alt="icon_ticket"
        />
        <h2 className="text-center text-white">Your QR-Code</h2>
      </div>
      <div className="mt-4">
        <Image
          src={getImageURL('/profile/QRcode.svg')}
          height={250}
          width={250}
          alt="QR"
        />
      </div>
    </div>
  );
}
