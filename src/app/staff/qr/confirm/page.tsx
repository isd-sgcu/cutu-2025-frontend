'use client';

import ConfirmModal from '@/components/staff/qr/ConfirmModal';

export default function confirm() {
  return (
    <main className="bg-2 flex h-screen w-full flex-col items-center justify-center">
      <ConfirmModal userInfo="dunk soravit 669465" isOpen={true} />
    </main>
  );
}
