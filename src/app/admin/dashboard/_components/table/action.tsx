import React from 'react';

import { Ellipsis } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';

import ActionList from './actionList';
import { useDeleteUser } from '../../api/user';
import { useAuth } from '@/contexts/auth';

export default function Action({ id }: { id: string }) {
  const { token } = useAuth();
  const { mutate: deleteUser } = useDeleteUser(id, token?.accessToken || '');

  const actions = [
    {
      imageURL: '/admin/dashboard/circle-x.svg',
      className: 'bg-error',
      text: 'Remove',
      fn: deleteUser,
    },
    {
      imageURL: '/admin/dashboard/profile.svg',
      className: 'bg-dark-pink',
      text: 'Change to Staff',
      fn: () => {},
    },
    {
      imageURL: '/admin/dashboard/crown.svg',
      className: 'bg-dark-blue',
      text: 'Change to Admin',
      fn: () => {},
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
