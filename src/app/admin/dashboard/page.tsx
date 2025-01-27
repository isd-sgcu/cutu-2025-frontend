'use client';

import Background from '@/components/staff/qr/background';
import Top from './_components/top';
import Detail from './_components/detail';
import Protect from '@/components/protect';

export default function Page() {
  return (
    <Protect roles={['admin']}>
      <div className="item-center relative flex min-h-screen w-full flex-col pt-8">
        <Top />
        <Background />
        <div className="mt-4"></div>
        <Detail />
      </div>
    </Protect>
  );
}
