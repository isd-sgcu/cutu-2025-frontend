import React from 'react';
import Header from './table/header';
import UserRow from './table/userRow';
import { User } from '@/schema/user';
import Spinner from './spinner';
import { useAuth } from '@/contexts/auth';

interface UserListProps {
  users: User[];
  isLoading: boolean;
}

export default function UserList({ users, isLoading }: UserListProps) {
  const { user: me } = useAuth();

  return (
    <div>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        users
          .filter(
            user => user.role != 'member' && (!me?.id || me.id != user.id),
          )
          .map(user => <UserRow key={user.id} user={user} />)
      )}
    </div>
  );
}
