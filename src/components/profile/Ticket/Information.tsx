'use client';

import { useAuth } from '@/contexts/auth';

export default function Inf() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-[12px] text-white">
      <p>
        #<span>{user?.uid}</span>
      </p>
      <p>
        <span>{user?.name}</span>
      </p>
      <div className="mt-[5px] h-[1px] w-[245px] bg-white" />
      <div className="mt-3 flex flex-col items-center">
        <div className="flex">
          <p>15 กุมภาพันธ์ 2568 | 13.00 น. เป็นต้นไป</p>
        </div>
        <div className="flex">
          <p>สนามศุภชลาศัย สนามกีฬาแห่งชาติ</p>
        </div>
      </div>
    </div>
  );
}
