import React from 'react';

import { Ellipsis } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';

import ActionList from './actionList';
import { useDeleteUser, useUpdateUserRole } from '../../api/user';
import { useAuth } from '@/contexts/auth';
import toast from 'react-hot-toast';

export default function Action({ id }: { id: string }) {
  const { token } = useAuth();
  const { mutateAsync: deleteUser } = useDeleteUser(token?.accessToken || '');
  const { mutateAsync: updateRole } = useUpdateUserRole(
    token?.accessToken || '',
  );

  function onDelete() {
    const resp = deleteUser({ id });
    toast.promise(resp, {
      success: 'Delete user success',
      error: 'Failed Delete user',
      loading: 'Deleting user',
    });
  }

  function onUpdateRole(role: 'admin' | 'staff' | 'member') {
    const resp = updateRole({ id, role });
    toast.promise(resp, {
      success: 'Update role success',
      error: 'Failed update role',
      loading: 'Updating role',
    });
  }

  const actions = [
    {
      imageURL: '/admin/dashboard/circle-x.svg',
      className: 'bg-error',
      text: 'Remove',
      fn: onDelete,
    },
    {
      imageURL: '/admin/dashboard/profile.svg',
      className: 'bg-orange-500',
      text: 'Change to member',
      fn: () => onUpdateRole('member'),
    },
    {
      imageURL: '/admin/dashboard/profile.svg',
      className: 'bg-dark-pink',
      text: 'Change to Staff',
      fn: () => onUpdateRole('staff'),
    },
    {
      imageURL: '/admin/dashboard/crown.svg',
      className: 'bg-dark-blue',
      text: 'Change to Admin',
      fn: () => onUpdateRole('admin'),
    },
  ];

  return (
    <Popover>
      <PopoverTrigger>
        <Ellipsis className="mx-auto rounded-full p-0.5 transition hover:bg-light-gray" />
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden rounded-md bg-white">
        {actions.map((action, index) => (
          <ActionList key={index} {...action} />
        ))}
      </PopoverContent>
    </Popover>
  );
}
