'use client';

import Load from '@/components/loading/loading';
import { useAuth } from '@/contexts/auth';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const pages = {
  member: {
    home: '/',
    qr: '/qr',
    profile: '/edit',
  },
  staff: {
    home: '/',
    qr: '/staff/qr',
    profile: '/edit',
  },
  admin: {
    home: '/',
    qr: '/staff/qr',
    profile: '/admin/profile',
  },
};

export default function Page() {
  const { user, isInitialized } = useAuth();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 'home';

  if (!isInitialized) {
    return <Loading />;
  }

  window.location.href =
    pages[user?.role || 'member'][page as 'home' | 'qr' | 'profile'];
  return <Loading />;
}

function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Load />
    </div>
  );
}
