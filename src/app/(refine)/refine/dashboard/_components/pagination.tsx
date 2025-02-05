import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  current,
  totalPages,
  pageSize,
  totalItems,
  setCurrent,
  setPageSize,
}: {
  current: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  setCurrent: (page: number) => void;
  setPageSize: (size: number) => void;
}) => {
  const hasNext = current < totalPages;
  const hasPrev = current > 1;

  return (
    <div className="mt-6 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="whitespace-nowrap text-sm text-gray-500">
        Showing {(current - 1) * pageSize + 1} -{' '}
        {Math.min(current * pageSize, totalItems)} of {totalItems}
      </div>

      <div className="flex w-full items-center justify-center sm:w-auto">
        <PaginationControls
          current={current}
          totalPages={totalPages}
          hasPrev={hasPrev}
          hasNext={hasNext}
          setCurrent={setCurrent}
        />
      </div>

      <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
    </div>
  );
};

const PaginationControls = ({
  current,
  totalPages,
  hasPrev,
  hasNext,
  setCurrent,
}: {
  current: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  setCurrent: (page: number) => void;
}) => {
  const getPageNumbers = () => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, current - 2);
    let end = Math.min(totalPages, current + 2);

    if (current <= 3) {
      end = maxVisible;
    } else if (current >= totalPages - 2) {
      start = totalPages - 4;
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-1">
      {/* Mobile-only buttons */}
      <div className="flex sm:hidden">
        <button
          onClick={() => setCurrent(current - 1)}
          disabled={!hasPrev}
          className="rounded-lg bg-white p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="flex items-center px-3 text-sm text-gray-500">
          {current} / {totalPages}
        </div>

        <button
          onClick={() => setCurrent(current + 1)}
          disabled={!hasNext}
          className="rounded-lg bg-white p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop buttons */}
      <div className="hidden sm:flex items-center gap-1">
        <button
          onClick={() => setCurrent(1)}
          disabled={!hasPrev}
          className="rounded-lg bg-white p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => setCurrent(current - 1)}
          disabled={!hasPrev}
          className="rounded-lg bg-white p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrent(page)}
              className={`rounded-lg px-3 py-1 text-sm ${
                current === page
                  ? 'bg-pink-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrent(current + 1)}
          disabled={!hasNext}
          className="rounded-lg bg-white p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => setCurrent(totalPages)}
          disabled={!hasNext}
          className="rounded-lg bg-white p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        >
          Last
        </button>
      </div>
    </div>
  );
};

const PageSizeSelect = ({
  pageSize,
  setPageSize,
}: {
  pageSize: number;
  setPageSize: (size: number) => void;
}) => (
  <div className="flex items-center gap-2">
    <span>แสดงต่อหน้า:</span>
    <select
      value={pageSize}
      onChange={e => setPageSize(Number(e.target.value))}
      className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-sm"
    >
      {[10, 20, 30, 40, 50].map(size => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  </div>
);
