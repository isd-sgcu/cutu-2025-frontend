/* eslint-disable @next/next/no-img-element */
'use client';
import { useOne, useDelete } from '@refinedev/core';
import { User, FieldEntry } from '../../../libs/interface';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';

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
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState('');
  const { data, isError, isLoading } = useOne<User>({
    resource: 'users',
    id: id,
  });

  const { data: imageData, isError: isImageError } = useOne({
    resource: 'users/image',
    id: id,
  });

  const { mutate: deleteUser } = useDelete();
  const user = data?.data;

  useEffect(() => {
    if (isImageError) {
      setImageError('คุณไม่มีสิทธิ์เข้าถึงภาพนี้');
      setImage(null);
    } else if (imageData?.data?.url) {
      setImage(imageData.data.url);
      setImageError('');
    }
  }, [imageData, isImageError]);

  const handleDeleteUser = () => {
    if (user) {
      deleteUser(
        {
          resource: 'users',
          id: user.id,
        },
        {
          onSuccess: () => router.push('/users'),
          onError: () => setIsPermissionDialogOpen(true),
        },
      );
    }
  };

  const createField = (label: string, field: keyof User): FieldEntry => ({
    label,
    field,
  });

  const renderSection = (title: string, fields: FieldEntry[]) => (
    <div className="border-t border-gray-100 pt-4">
      <h3 className="mb-3 text-lg font-semibold text-gray-800">{title}</h3>
      <div className="space-y-3">
        {fields.map(({ label, field }) => {
          const value = user?.[field];
          let displayValue = value || 'N/A';

          if (field === 'registeredAt') {
            displayValue = formatThaiDate(value as string);
          } else if (field === 'graduatedYear') {
            displayValue = (parseInt(value as string) + 543).toString();
          } else if (field === 'status') {
            displayValue = value as string;
            // Add this condition for isAcrophobic
          } else if (field === 'isAcrophobic') {
            displayValue = value ? 'ใช่' : 'ไม่';
          }

          return (
            <div key={field} className="flex justify-between">
              <span className="text-gray-600">{label}</span>
              <span className="text-right text-gray-800">{displayValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (isLoading) return <div className="p-4 text-center">กำลังโหลด...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้
      </div>
    );
  if (!user) return <div className="p-4 text-center">ไม่พบผู้ใช้</div>;

  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-gray-50 p-4">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.push('/refine/dashboard')}
          className="flex items-center space-x-2 rounded-lg bg-white px-4 py-2 shadow-sm transition-all hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-700">กลับ</span>
        </button>
      </header>

      {/* Image Preview */}
      <section className="mb-6">
        <div
          onClick={() => setIsImageOpen(true)}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
        >
          {imageError ? (
            <div className="flex h-full flex-col items-center justify-center space-y-2 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-sm">{imageError}</span>
            </div>
          ) : (
            image && (
              <img
                src={image}
                alt="Citizen Card Preview"
                className="h-full w-full object-cover"
              />
            )
          )}
        </div>
      </section>

      {/* Profile Information */}
      <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <div className="mt-2 flex items-center space-x-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              {user.role}
            </span>
            <span className="text-sm text-gray-500">{user.uid}</span>
          </div>
        </div>

        <div className="space-y-4">
          {renderSection('ข้อมูลส่วนตัว', [
            createField('อีเมล', 'email'),
            createField('เบอร์โทรศัพท์', 'phone'),
            createField('สถานะ', 'status'),
            createField('วันที่ลงทะเบียน', 'registeredAt'),
          ])}

          {renderSection('ข้อมูลการศึกษา', [
            createField('มหาวิทยาลัย', 'university'),
            createField('คณะ', 'faculty'),
            createField('ระดับการศึกษา', 'education'),
            createField('ปีที่จบการศึกษา', 'graduatedYear'),
          ])}

          {renderSection('ข้อมูลเพิ่มเติม', [
            createField('ขนาดเสื้อ', 'sizeJersey'),
            createField('ข้อจำกัดด้านอาหาร', 'foodLimitation'),
            createField('กลัวความสูงไหม', 'isAcrophobic'),
            ...(user.chronicDisease
              ? [createField('โรคประจำตัว', 'chronicDisease')]
              : []),
            ...(user.drugAllergy
              ? [createField('อาการแพ้ยา', 'drugAllergy')]
              : []),
          ])}
        </div>
      </section>

      {/* Delete Button and Dialogs */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 to-transparent pb-4 pt-8">
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger asChild>
            <button className="mx-auto flex w-[calc(100%-2rem)] items-center justify-center space-x-2 rounded-xl bg-red-500 px-6 py-3 text-white shadow-lg transition-all hover:bg-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>ลบผู้ใช้</span>
            </button>
          </Dialog.Trigger>

          {/* Delete Confirmation Dialog */}
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Content className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-red-100 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>

                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    ลบบัญชีผู้ใช้
                  </Dialog.Title>

                  <Dialog.Description className="text-center text-sm text-gray-600">
                    การดำเนินการนี้จะลบบัญชีผู้ใช้ {user.name}{' '}
                    และข้อมูลทั้งหมดที่เกี่ยวข้องอย่างถาวร
                    <br />
                    การกระทำนี้ไม่สามารถยกเลิกได้
                  </Dialog.Description>

                  <div className="mt-4 flex w-full gap-3">
                    <Dialog.Close asChild>
                      <button className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        ยกเลิก
                      </button>
                    </Dialog.Close>
                    <button
                      onClick={handleDeleteUser}
                      className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      ยืนยันการลบ
                    </button>
                  </div>
                </div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Image Modal */}
      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="relative mx-4 w-full max-w-2xl rounded-2xl bg-white p-4">
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="overflow-hidden rounded-xl border-2 border-gray-200">
              {image ? (
                <img
                  src={image}
                  alt="Citizen Card"
                  className="h-auto w-full object-contain"
                />
              ) : (
                <div className="flex h-96 items-center justify-center text-red-500">
                  {imageError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Permission Error Dialog */}
      <Dialog.Root
        open={isPermissionDialogOpen}
        onOpenChange={setIsPermissionDialogOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Content className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-yellow-100 rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-yellow-600 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  ไม่มีสิทธิ์ในการลบผู้ใช้
                </Dialog.Title>

                <Dialog.Description className="text-center text-sm text-gray-600">
                  คุณไม่มีสิทธิ์ในการลบผู้ใช้นี้
                  <br />
                  กรุณาติดต่อผู้ดูแลระบบหากคุณคิดว่านี่เป็นข้อผิดพลาด
                </Dialog.Description>

                <div className="mt-4 w-full">
                  <Dialog.Close asChild>
                    <button className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300">
                      ปิด
                    </button>
                  </Dialog.Close>
                </div>
              </div>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
