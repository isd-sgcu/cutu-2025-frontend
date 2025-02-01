import { Search } from 'lucide-react';

export const SearchBar = ({
  searchTerm,
  searchBy,
  setSearchTerm,
  setSearchBy,
}: {
  searchTerm: string;
  searchBy: 'name' | 'uid';
  setSearchTerm: (value: string) => void;
  setSearchBy: (value: 'name' | 'uid') => void;
}) => (
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
    <select
      value={searchBy}
      onChange={(e) => setSearchBy(e.target.value as 'name' | 'uid')}
      className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-pink-500 focus:ring-pink-500 sm:rounded-r-none"
    >
      <option value="name">ชื่อ</option>
      <option value="uid">UID</option>
    </select>
    <div className="relative flex-1">
      <input
        type="text"
        placeholder={searchBy === 'name' ? 'ค้นหาด้วยชื่อ...' : 'ค้นหาด้วย UID...'}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 pl-10 text-sm focus:border-pink-500 focus:ring-pink-500 sm:rounded-l-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
    </div>
  </div>
);