import React from 'react';
import Header from './table/header';
import UserRow, { UserRowProps } from './table/userRow';

interface UserListProps {
  users: UserRowProps[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div>
      <Header />
      {users.map(user => (
        <UserRow key={user.UID} {...user} />
      ))}
    </div>
  );
}
