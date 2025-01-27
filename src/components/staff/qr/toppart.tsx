'use client';

import { useAuth } from '@/contexts/auth';
import { getImageURL } from '@/utils/image';
import Image from 'next/image';

export default function TopPart() {
  const { user } = useAuth();

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
        The 75th TU-CU Traditional Football Match
      </h1>
      <h2 className="mt-3 text-2xl font-medium text-white">Welcome!, Staff</h2>
      <p className="mt-1 text-white">{user?.name}</p>
    </div>
  );
}
