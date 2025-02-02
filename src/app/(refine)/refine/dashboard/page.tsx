'use client';
import { useTable } from '@refinedev/core';
import { ChevronLeft } from 'lucide-react';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '../libs/interface';
import { SearchBar } from './_components/searchBar';
import { UserTable } from './_components/userTable';
import { UserTableRow } from './_components/userTableRow';
import { Pagination } from './_components/pagination';
import { ExportButton } from './_components/exportButton'; // Add this import

const DataTable = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'name' | 'uid'>('name');
  const PAGE_SIZE = 15;

  const { tableQuery, current, setCurrent, pageSize, setPageSize } =
    useTable<User>({
      resource: 'users',
      pagination: {
        mode: 'server',
        current: 1,
        pageSize: PAGE_SIZE,
      },
    });

  const filteredData = useMemo(() => {
    if (!tableQuery.data?.data) return [];
    return tableQuery.data.data.filter(user =>
      user[searchBy].toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [tableQuery.data, searchTerm, searchBy]);

  const paginatedData = useMemo(() => {
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, current, pageSize]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link
            href="/refine/dashboard"
            className="group flex items-center gap-2 text-gray-700 hover:text-pink-600"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <h1 className="text-xl font-semibold sm:text-2xl">
              ข้อมูลผู้ลงทะเบียนทั้งหมด
            </h1>
          </Link>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <SearchBar
              searchTerm={searchTerm}
              searchBy={searchBy}
              setSearchTerm={setSearchTerm}
              setSearchBy={setSearchBy}
            />
            <ExportButton data={filteredData} /> {/* Add ExportButton here */}
          </div>
        </div>

        <UserTable>
          {paginatedData.map(user => (
            <UserTableRow
              key={user.id}
              user={user}
              onClick={() => router.push(`/refine/users/${user.id}`)}
            />
          ))}
        </UserTable>

        <Pagination
          current={current}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          setCurrent={setCurrent}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default DataTable;