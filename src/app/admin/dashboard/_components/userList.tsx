import React from 'react';
import Header from './table/header';
import UserRow from './table/userRow';
import { User } from '@/schema/user';
import Spinner from './spinner';

interface UserListProps {
  users: User[];
  isLoading: boolean;
}

export default function UserList({ users, isLoading }: UserListProps) {
  return (
    <div>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        users
          .filter(user => user.role != 'member')
          .map(user => <UserRow key={user.id} user={user} />)
      )}
    </div>
  );
}
