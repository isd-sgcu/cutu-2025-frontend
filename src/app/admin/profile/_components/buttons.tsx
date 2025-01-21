import { PenLine, ScanLine, UserPlus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const buttons = [
  { text: 'Add Role', icon: UserPlus, href: '/admin/dashboard' },
  { text: 'Scan QR-Code', icon: ScanLine, href: '/staff/qr' },
  { text: 'แก้ไขข้อมูลส่วนตัว', icon: PenLine, href: '/edit' },
];

export default function Buttons() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {buttons.map(button => (
        <Link
          key={button.text}
          href={button.href}
          className="flex w-full max-w-80 items-center justify-center gap-2 rounded-full bg-white py-3 font-medium text-dark-pink transition hover:bg-dark-pink hover:text-white"
        >
          {<button.icon />}
          {button.text}
        </Link>
      ))}
    </div>
  );
}
