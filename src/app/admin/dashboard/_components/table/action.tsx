import React from 'react';

import { Ellipsis } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';

import ActionList from './actionList';

const actions = [
  {
    imageURL: '/admin/dashboard/circle-x.svg',
    className: 'bg-error',
    text: 'Remove',
  },
  {
    imageURL: '/admin/dashboard/profile.svg',
    className: 'bg-dark-pink',
    text: 'Change to Staff',
  },
  {
    imageURL: '/admin/dashboard/crown.svg',
    className: 'bg-dark-blue',
    text: 'Change to Admin',
  },
];

export default function Action() {
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
