// components/CheckInList.tsx
'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';
import { User } from '../libs/interface';

export const CheckInList = ({
  checkIns,
  page,
  pageSize,
  setPage,
}: {
  checkIns: User[];
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
}) => {
  const totalPages = Math.ceil(checkIns.length / pageSize);
  const paginatedCheckIns = checkIns.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <span className="text-sm font-medium text-gray-700">
          เช็คอินวันนี้: {checkIns.length} คน
        </span>
      </div>

      <ul className="divide-y divide-gray-200">
        {paginatedCheckIns.map(user => (
          <li
            key={user.id}
            className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
          >
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm font-semibold text-pink-600">
              {dayjs(user.lastEntered).format('HH:mm')}
            </div>
          </li>
        ))}
      </ul>

      {checkIns.length > pageSize && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              หน้า {page} จาก {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};