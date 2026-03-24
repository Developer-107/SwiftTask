'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { User } from '../../types/globalTypes';
import { ChevronDownIcon } from '@radix-ui/themes';
import { useState } from 'react';

interface Props {
  users: User[];
  value?: number;
  onChange: (userId: number) => void;
}

export default function Dropdown({ users, value, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const selectedUser = users.find(u => u.id === value);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="font-medium w-45 flex gap-2 items-center justify-between p-1 px-4
             border border-gray-300 rounded-full bg-white text-xs cursor-pointer
             hover:bg-[#edf5f7] hover:text-[#002761] hover:border-[#002761]
             focus:outline-none focus:ring-0 focus:ring-[#002761] focus:ring-offset-0">
        {selectedUser?.name ? (selectedUser.name.length < 22 ? selectedUser?.name : selectedUser?.name.slice(0, 19) + "...") : 'Select user'}
        <ChevronDownIcon fontSize={16} className={`transform transition-transform duration-500 ${!open ? "rotate-0" : "rotate-180"} `} />

      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="font-medium bg-white border w-45 border-gray-300 rounded-lg shadow px-2 p-1"
        sideOffset={5}
      >
        {users.map(user => (
          <DropdownMenu.Item
            key={user.id}
            onSelect={() => onChange(user.id)}
            className={`my-1 p-2 px-3 text-xs cursor-pointer rounded-full
              hover:bg-gray-100 hover:border-[#002761]
              focus:outline-none focus:ring-0 focus:ring-[#002761] ${
                value === user.id ? "bg-[#edf5f7] text-[#002761]" : ""
              }`}
          >
            {user.name.length < 25 ? user.name : user.name.slice(0, 22) + "..." }
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}