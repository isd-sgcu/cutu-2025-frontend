import React from 'react';
import Header from './table/header';
import UserRow from './table/userRow';
import { User } from '@/schema/user';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div>
      <Header />
      {users.map(user => (
        <UserRow key={user.id} user={user} />
      ))}
    </div>
  );
}
