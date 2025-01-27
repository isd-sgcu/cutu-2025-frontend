'use client';

import React, { useState } from 'react';
import AddRole from './addRole';
import SearchStaff from './searchStaff';
import UserList from './userList';
import { useAuth } from '@/contexts/auth';
import { useGetUsers } from '../api/user';

export default function Detail() {
  const [name, setName] = useState('');
  const { token } = useAuth();
  const { isLoading, refetch, data } = useGetUsers(
    token?.accessToken || '',
    name,
  );

  function handleSearch() {
    refetch();
  }

  const users = data || [];

  return (
    <div className="w-full flex-1 bg-white text-base">
      <AddRole />
      <SearchStaff
        value={name}
        onChange={e => setName(e.target.value)}
        handleSearch={handleSearch}
      />
      <UserList users={users} isLoading={isLoading} />
    </div>
  );
}
