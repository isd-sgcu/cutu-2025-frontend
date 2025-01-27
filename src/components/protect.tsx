'use client';

import { Role } from '@/const/role';
import { useAuth } from '@/contexts/auth';
import { useRouter } from 'next/navigation';
import React from 'react';
import Load from './loading/loading';
import toast from 'react-hot-toast';

interface ProtectProps {
  roles: Role[];
  children: React.ReactNode;
  callBack?: string;
}

export default function Protect({
  roles,
  children,
  callBack = '/',
}: ProtectProps) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();

  if (!isInitialized) {
    return <Loading />;
  }

  if (!user || !roles.includes(user.role)) {
    toast.error('You cannot access this page');
    router.push(callBack);
    return <Loading />;
  }

  return children;
}

function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Load />
    </div>
  );
}
