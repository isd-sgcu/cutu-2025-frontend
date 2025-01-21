'use client';

import React, { useState } from 'react';
import AddRole from './addRole';
import SearchStaff from './searchStaff';
import UserList from './userList';

const roles = ['admin', 'staff'] as const;
const names = [
  'สมชาย วงศ์สวัสดิ์',
  'สมศักดิ์ ไชยสงคราม',
  'สมพงษ์ ศรีสวัสดิ์',
  'สมพร เจริญสุข',
  'สมบูรณ์ รัตนพงษ์',
  'สมจิต ทองชัย',
  'สมนึก พงษ์เทพ',
  'สมชาย ทองดี',
  'สมศรี ไชยสงคราม',
  'สมยศ วงศ์สวัสดิ์',
  'สมชาย ศรีสวัสดิ์',
  'สมชาย เจริญสุข',
];

const users = Array.from({ length: 20 }, () => ({
  UID: `#${Math.floor(Math.random() * 10000)}`,
  name: names[Math.floor(Math.random() * names.length)],
  role: roles[Math.floor(Math.random() * roles.length)],
}));

export default function Detail() {
  const [name, setName] = useState<string>('');

  return (
    <div className="w-full flex-1 bg-white text-base">
      <AddRole />
      <SearchStaff value={name} onChange={e => setName(e.target.value)} />
      <UserList users={users} />
    </div>
  );
}
