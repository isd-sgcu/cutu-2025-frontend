export const UserTable = ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">UID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">ชื่อ</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 sm:table-cell">เบอร์โทรศัพท์</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 sm:table-cell">เข้างานล่าสุด</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {children}
        </tbody>
      </table>
    </div>
  );