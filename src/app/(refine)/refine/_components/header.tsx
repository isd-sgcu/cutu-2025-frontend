// components/DashboardHeader.tsx
'use client';
import Link from 'next/link';
import { ChevronLeft, Users } from 'lucide-react';

export const DashboardHeader = ({
  total,
  children,
}: {
  total: number;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl bg-white p-6 shadow-sm">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <Link
          href="/staff/qr"
          className="group mb-4 flex items-center gap-2 text-gray-700 hover:text-pink-600"
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <h1 className="text-2xl font-semibold text-gray-900">
            แดชบอร์ดลงทะเบียน
          </h1>
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-5 w-5" />
          <span>
            ผู้ลงทะเบียนทั้งหมด: <strong className="text-pink-600">{total}</strong> คน
          </span>
        </div>
      </div>
      <div className="mt-4 flex gap-3 md:mt-0">{children}</div>
    </div>
  </div>
);