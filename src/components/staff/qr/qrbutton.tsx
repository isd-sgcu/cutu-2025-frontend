import { getImageURL } from '@/utils/image';
import Image from 'next/image';

export default function QRButton() {
  return (
    <div className="mt-6 flex justify-center">
      <Image
        src={getImageURL('/staff/qr.png')}
        alt="edit"
        width={306}
        height={311}
      />
    </div>
  );
}
