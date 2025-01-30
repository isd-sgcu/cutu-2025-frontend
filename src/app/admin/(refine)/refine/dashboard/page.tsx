// src/pages/data.tsx
'use client';
import { HttpError, useTable, useUpdate } from '@refinedev/core';
import { ChevronLeft, ChevronRight, Search, Save, Edit, X } from 'lucide-react';
import dayjs from 'dayjs';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { User } from '../interface';

const DataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<User>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchBy, setSearchBy] = useState<'name' | 'uid'>('name');
  const { mutate: updateRecord } = useUpdate<User>();
  const PAGE_SIZE = 20;

  const { tableQuery } = useTable<User, HttpError>({
    resource: 'users',
    pagination: { current: currentPage, pageSize: PAGE_SIZE },
  });

  const total = tableQuery?.data?.total || 0;

  // Filter data locally based on search term
  const filteredData = useMemo(() => {
    if (!tableQuery.data?.data) return [];
    return tableQuery.data.data.filter(user =>
      user[searchBy].toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [tableQuery.data, searchTerm, searchBy]);

  const startEditing = (user: User) => {
    setEditingId(user.id);
    setEditedData(user);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedData({});
  };

  const saveChanges = () => {
    if (editingId) {
      updateRecord({
        resource: 'users',
        id: editingId,
        values: editedData,
      });
      cancelEditing();
    }
  };

  const statusOptions = [
    { value: 'chula_student', label: 'นิสิตปัจจุบัน' },
    { value: 'alumni', label: 'ศิษย์เก่า' },
    { value: 'general_student', label: 'บุคคลทั่วไป' },
  ];

  const facultyOptions = ['Sci', 'Eng', 'Med', 'Arts'];
  const sizeOptions = ['S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-mid-gray p-2 sm:p-4">
      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-4 sm:mb-6 md:flex-row md:items-center md:justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-dark-pink hover:text-dark-pink/80"
          >
            <ChevronLeft className="h-5 w-5" />
            <h1 className="text-xl font-bold sm:text-2xl">
              ข้อมูลผู้ลงทะเบียนทั้งหมด
            </h1>
          </Link>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
            <select
              value={searchBy}
              onChange={e => setSearchBy(e.target.value as 'name' | 'uid')}
              className="w-full rounded-lg border border-mid-gray bg-light-pink px-4 py-2 sm:w-auto sm:rounded-r-none"
            >
              <option value="name">ชื่อ</option>
              <option value="uid">UID</option>
            </select>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={
                  searchBy === 'name' ? 'ค้นหาด้วยชื่อ...' : 'ค้นหาด้วย UID...'
                }
                className="w-full rounded-lg border border-mid-gray px-4 py-2 pl-10 focus:ring-2 focus:ring-dark-pink sm:rounded-l-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-dark-gray" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-lg border border-mid-gray">
          <table className="min-w-[800px] sm:min-w-full">
            <thead className="bg-light-pink">
              <tr>
                <th className="px-2 py-2 sm:px-4 sm:py-3">{''}</th>
                <th className="px-2 py-2 text-left sm:px-4 sm:py-3">UID</th>
                <th className="px-2 py-2 text-left sm:px-4 sm:py-3">ชื่อ</th>
                <th className="hidden px-2 py-2 text-left sm:table-cell sm:px-4 sm:py-3">
                  อีเมล
                </th>
                <th className="px-2 py-2 text-left sm:px-4 sm:py-3">สถานะ</th>
                <th className="hidden px-2 py-2 text-left sm:table-cell sm:px-4 sm:py-3">
                  คณะ
                </th>
                <th className="px-2 py-2 text-left sm:px-4 sm:py-3">
                  ขนาดเสื้อ
                </th>
                <th className="hidden px-2 py-2 text-left sm:table-cell sm:px-4 sm:py-3">
                  เข้างานล่าสุด
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(user => (
                <tr
                  key={user.id}
                  className="border-t border-mid-gray transition-colors hover:bg-mid-gray/20"
                >
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    {editingId === user.id ? (
                      <div className="flex gap-1 sm:gap-2">
                        <button
                          onClick={saveChanges}
                          className="text-dark-pink hover:text-dark-pink/80"
                          title="Save"
                        >
                          <Save className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-dark-gray hover:text-dark-gray/80"
                          title="Cancel"
                        >
                          <X className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(user)}
                        className="text-dark-gray hover:text-dark-pink"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    )}
                  </td>

                  {/* UID */}
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    <a
                      href={`/admin/refine/users/${user.id}`}
                      className="text-dark-blue"
                    >
                      <span className="text-sm text-dark-gray">{user.uid}</span>
                    </a>
                  </td>

                  {/* Name */}
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    {editingId === user.id ? (
                      <input
                        type="text"
                        value={editedData.name || ''}
                        onChange={e =>
                          setEditedData({ ...editedData, name: e.target.value })
                        }
                        className="w-full rounded border border-mid-gray px-2 py-1 text-sm focus:ring-1 focus:ring-dark-pink sm:text-base"
                      />
                    ) : (
                      <span className="text-base font-medium text-dark-blue">
                        {user.name}
                      </span>
                    )}
                  </td>

                  {/* Email (hidden on mobile) */}
                  <td className="hidden px-2 py-2 sm:table-cell sm:px-4 sm:py-3">
                    {editingId === user.id ? (
                      <input
                        type="email"
                        value={editedData.email || ''}
                        onChange={e =>
                          setEditedData({
                            ...editedData,
                            email: e.target.value,
                          })
                        }
                        className="w-full rounded border border-mid-gray px-2 py-1 text-sm focus:ring-1 focus:ring-dark-pink sm:text-base"
                      />
                    ) : (
                      <span className="text-dark-gray">{user.email}</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    {editingId === user.id ? (
                      <select
                        value={editedData.status || ''}
                        onChange={e =>
                          setEditedData({
                            ...editedData,
                            status: e.target.value,
                          })
                        }
                        className="w-full rounded border border-mid-gray px-2 py-1 text-sm focus:ring-1 focus:ring-dark-pink sm:text-base"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`text-xs inline-block rounded-full px-2 py-1 sm:px-3 sm:py-1 sm:text-sm ${
                          user.status === 'alumni'
                            ? 'bg-dark-pink text-white'
                            : user.status === 'chula_student'
                              ? 'bg-mid-blue text-white'
                              : 'bg-light-blue text-dark-blue'
                        }`}
                      >
                        {
                          statusOptions.find(o => o.value === user.status)
                            ?.label
                        }
                      </span>
                    )}
                  </td>

                  {/* Faculty (hidden on mobile) */}
                  <td className="hidden px-2 py-2 sm:table-cell sm:px-4 sm:py-3">
                    {editingId === user.id ? (
                      <select
                        value={editedData.faculty || ''}
                        onChange={e =>
                          setEditedData({
                            ...editedData,
                            faculty: e.target.value,
                          })
                        }
                        className="w-full rounded border border-mid-gray px-2 py-1 text-sm focus:ring-1 focus:ring-dark-pink sm:text-base"
                      >
                        {facultyOptions.map(faculty => (
                          <option key={faculty} value={faculty}>
                            {faculty}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-dark-gray">{user.faculty}</span>
                    )}
                  </td>

                  {/* Jersey Size */}
                  <td className="px-2 py-2 sm:px-4 sm:py-3">
                    {editingId === user.id ? (
                      <select
                        value={editedData.sizeJersey || ''}
                        onChange={e =>
                          setEditedData({
                            ...editedData,
                            sizeJersey: e.target.value,
                          })
                        }
                        className="w-full rounded border border-mid-gray px-2 py-1 text-sm focus:ring-1 focus:ring-dark-pink sm:text-base"
                      >
                        {sizeOptions.map(size => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-dark-gray">{user.sizeJersey}</span>
                    )}
                  </td>

                  {/* Last Entered (hidden on mobile) */}
                  <td className="hidden px-2 py-2 text-dark-gray sm:table-cell sm:px-4 sm:py-3">
                    {dayjs(user.lastEntered).isValid()
                      ? dayjs(user.lastEntered).format('DD/MM HH:mm')
                      : 'not entered'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:mt-6 sm:flex-row">
          <div className="text-sm text-dark-gray">
            แสดง {(currentPage - 1) * PAGE_SIZE + 1} -{' '}
            {Math.min(currentPage * PAGE_SIZE, total)} จาก {total}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 rounded-lg bg-dark-pink px-3 py-1 text-white disabled:opacity-50 sm:px-4 sm:py-2"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.ceil(total / PAGE_SIZE) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`rounded-lg px-2 py-1 text-sm sm:px-3 sm:py-1 sm:text-base ${
                    currentPage === i + 1
                      ? 'bg-dark-pink text-white'
                      : 'text-dark-gray hover:bg-mid-gray'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage >= Math.ceil(total / PAGE_SIZE)}
              className="flex items-center gap-2 rounded-lg bg-dark-pink px-3 py-1 text-white disabled:opacity-50 sm:px-4 sm:py-2"
            >
              <ChevronRight className="h-4 w-4 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
