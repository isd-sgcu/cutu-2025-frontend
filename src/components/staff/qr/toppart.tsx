import { getImageURL } from '@/utils/image';
import Image from 'next/image';

export default function TopPart() {
  const username = 'username';
  return (
    <div className="text-center">
      <div>
        <Image
          src={getImageURL('/staff/logowhite.svg')}
          alt="Logo"
          width={54}
          height={76}
          className="mx-auto mb-4"
        />
      </div>
      <h1 className="text-lg font-light text-white">
        75th CU-TU Unity Football
      </h1>
      <h2 className="mt-3 text-2xl font-medium text-white">Welcome!, Staff</h2>
      <p className="mt-1 text-white">{username}</p>
    </div>
  );
}
