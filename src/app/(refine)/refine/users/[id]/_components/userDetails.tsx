'use client';
import { useOne } from '@refinedev/core';
import { User, FieldEntry } from '../../../libs/interface';
import { useRouter } from 'next/navigation';

const formatThaiDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setFullYear(date.getFullYear());
  return date.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function UserDetails({ id }: { id: string }) {
  const router = useRouter();
  const { data, isError, isLoading } = useOne<User>({
    resource: 'users',
    id: id,
  });

  const user = data?.data;

  const createField = (label: string, field: keyof User): FieldEntry => ({
    label,
    field,
  });

  const renderSection = (title: string, fields: FieldEntry[]) => (
    <div className="border-t border-dark-blue/20 pt-6">
      <h3 className="mb-4 text-2xl font-semibold text-dark-blue">{title}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map(({ label, field }) => {
          const value = user?.[field];
          let displayValue = value || 'N/A';

          if (field === 'registeredAt') {
            displayValue = formatThaiDate(value as string);
          } else if (field === 'graduatedYear') {
            displayValue = (parseInt(value as string) + 543).toString();
          } else if (field === 'isAcrophobic') {
            displayValue = value ? 'ใช่' : 'ไม่';
          }

          return (
            <div key={field} className="space-y-1">
              <dt className="text-base font-medium text-dark-gray">{label}</dt>
              <dd className="text-xl text-dark-blue">
                {displayValue}
              </dd>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (isLoading) return <div className="p-4 text-center">กำลังโหลด...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-error">
        เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้
      </div>
    );
  if (!user) return <div className="p-4 text-center">ไม่พบผู้ใช้</div>;

  return (
    <div className="relative mx-auto min-h-screen max-w-4xl bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
        <button
          onClick={() => router.push('/refine/dashboard')}
          className="flex items-center space-x-2 text-dark-pink transition-colors hover:text-dark-blue"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xl">กลับสู่หน้าหลัก</span>
        </button>
      </header>

      {/* Profile Information */}
      <section className="rounded-xl bg-white p-8 shadow-[0_4px_20px_rgba(223,114,159,0.15)]">
        <div className="mb-8 border-b border-light-pink pb-6">
          <div className="flex flex-col items-start space-y-3">
            <h1 className="text-3xl font-bold text-gradient-pirple">{user.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="rounded-lg bg-dark-pink px-4 py-2 text-base font-medium text-white">
                {user.role}
              </span>
              <span className="rounded-lg bg-dark-blue px-4 py-2 text-base font-medium text-light-pink">
                {user.uid}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {renderSection('ข้อมูลส่วนตัว', [
            createField('อีเมล', 'email'),
            createField('เบอร์โทรศัพท์', 'phone'),
            createField('สถานะ', 'status'),
            createField('วันที่ลงทะเบียน', 'registeredAt'),
          ])}

          {/* {renderSection('ข้อมูลการศึกษา', [
            createField('มหาวิทยาลัย', 'university'),
            createField('คณะ', 'faculty'),
            createField('ระดับการศึกษา', 'education'),
            createField('ปีที่จบการศึกษา', 'graduatedYear'),
          ])} */}

          {renderSection('ข้อมูลสุขภาพ', [
            createField('ข้อจำกัดด้านอาหาร', 'foodLimitation'),
            createField('กลัวความสูง', 'isAcrophobic'),
            createField('โรคประจำตัว', 'chronicDisease'),
            createField('อาการแพ้ยา', 'drugAllergy'),
          ])}
        </div>
      </section>
    </div>
  );
}