'use client';

import Background from '@/components/staff/qr/background';
import Top from './_components/top';
import Detail from './_components/detail';
import Load from '@/components/loading/loading';
import { useGetUsers } from './api/user';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth';

export default function Page() {
  const [name, setName] = useState('');
  const { token } = useAuth();
  const {
    isLoading,
    refetch,
    data: users,
  } = useGetUsers(token?.accessToken || '', name);

  function handleSearch() {
    refetch();
  }

  return (
    <div className="item-center relative flex min-h-screen w-full flex-col pt-8">
      {isLoading ? (
        <Load />
      ) : (
        <>
          <Top />
          <Background />
          <div className="mt-4"></div>
          <Detail
            name={name}
            setName={setName}
            users={users}
            handleSearch={handleSearch}
          />
        </>
      )}
    </div>
  );
}
