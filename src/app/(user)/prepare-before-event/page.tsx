'use client';

import React from 'react';
import Top from '../register/_components/top';
import { useRouter } from 'next/navigation';
import Protect from '@/components/protect';

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full">
      <Protect roles={['member', 'staff', 'admin']}>
        <Top
          backgroundPath="/user/register/bg.jpg"
          back={'กลับเข้าสู่หน้าหลัก'}
          header="วิธีการเตรียมตัวก่อนวันงาน"
          onBack={() => router.push('/')}
        />
        <div className="h-full min-h-40 w-full bg-dark-gray"></div>
      </Protect>
    </div>
  );
}
