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
    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="text-sm text-gray-500">
        แสดง {(current - 1) * pageSize + 1} -{' '}
        {Math.min(current * pageSize, totalItems)} จาก {totalItems}
      </div>
      
      <div className="flex items-center gap-2">
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
}) => (
  <>
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
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrent(i + 1)}
          className={`rounded-lg px-3 py-1 text-sm ${
            current === i + 1
              ? 'bg-pink-600 text-white'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {i + 1}
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
  </>
);

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
      onChange={(e) => setPageSize(Number(e.target.value))}
      className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-sm"
    >
      {[10, 20, 30, 40, 50].map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  </div>
);