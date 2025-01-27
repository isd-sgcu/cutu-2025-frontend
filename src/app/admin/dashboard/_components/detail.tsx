'use client';

import React from 'react';
import AddRole from './addRole';
import SearchStaff from './searchStaff';
import UserList from './userList';
import { User } from '@/schema/user';

interface DetailProps {
  users: User[];
  name: string;
  setName: (name: string) => void;
  handleSearch: () => void;
}

export default function Detail({
  users,
  setName,
  name,
  handleSearch,
}: DetailProps) {
  return (
    <div className="w-full flex-1 bg-white text-base">
      <AddRole />
      <SearchStaff
        value={name}
        onChange={e => setName(e.target.value)}
        handleSearch={handleSearch}
      />
      <UserList users={users} />
    </div>
  );
}
