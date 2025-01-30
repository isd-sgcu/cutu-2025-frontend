/* eslint-disable @next/next/no-img-element */
'use client';
import { useOne, useUpdate, useDelete } from '@refinedev/core';
import { User } from '../../../interface';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';

export default function UserDetails({ id }: { id: string }) {
  const router = useRouter();
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Radix Dialog State
  const { data, isError, isLoading } = useOne<User>({
    resource: 'users',
    id: id,
  });

  const { mutate: updateUser } = useUpdate();
  const { mutate: deleteUser } = useDelete();
  const user = data?.data;

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditingValue(value);
  };

  const handleSave = () => {
    if (editingField && user) {
      updateUser(
        {
          resource: 'users',
          id: user.id,
          values: { [editingField]: editingValue },
        },
        {
          onSuccess: () => {
            setEditingField(null);
          },
        },
      );
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditingValue('');
  };

  const handleDeleteUser = () => {
    if (user) {
      deleteUser(
        {
          resource: 'users',
          id: user.id,
        },
        {
          onSuccess: () => {
            setIsDialogOpen(false); // Close dialog on success
            router.push('/admin/refine/dashboard'); // Redirect to the users list page
          },
        },
      );
    }
  };

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (isError)
    return <div className="p-4 text-center text-error">Error loading user</div>;
  if (!user) return <div className="p-4 text-center">User not found</div>;

  const renderInfoRow = (label: string, field: keyof User, editable = true) => (
    <div className="mb-2 flex items-center justify-between">
      <span className="font-medium text-dark-gray">{label}</span>
      {editingField === field ? (
        <div className="flex items-center gap-2">
          <input
            className="w-full rounded-md border p-1 text-sm"
            value={editingValue}
            onChange={e => setEditingValue(e.target.value)}
            autoFocus
          />
          <button
            className="rounded bg-dark-green px-2 py-1 text-sm text-white"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="rounded bg-gray-300 px-2 py-1 text-sm text-dark-gray"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className={`text-sm text-dark-blue ${
            editable ? 'hover:underline' : ''
          }`}
          onClick={() => editable && handleEdit(field, user[field] as string)}
        >
          {user[field] || 'N/A'}
        </button>
      )}
    </div>
  );

  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-light-gray p-4">
      {/* Citizen Card Modal */}
      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative mx-4 max-w-md rounded-2xl bg-white p-6"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute right-4 top-4 text-2xl text-dark-blue hover:text-mid-blue"
            >
              &times;
            </button>
            <div className="overflow-hidden rounded-lg border-2 border-mid-blue">
              <img
                src={user.imageUrl}
                alt="Citizen Card"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Citizen Card Thumbnail */}
          <button
            onClick={() => setIsImageOpen(true)}
            className="group relative h-20 w-32 overflow-hidden rounded-lg border-2 border-mid-blue shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <img
              src={user.imageUrl}
              alt="Citizen Card Preview"
              className="h-full w-full object-cover"
            />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-dark-blue">{user.name}</h1>
            <p className="text-sm text-dark-gray">{user.uid}</p>
            <span className="text-xs mt-1 inline-block rounded-full bg-dark-green px-2 py-1 text-white">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Personal Info Section */}
      <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-dark-blue">
          Personal Information
        </h2>
        {renderInfoRow('Email', 'email')}
        {renderInfoRow('Phone', 'phone')}
        {renderInfoRow('Status', 'status')}
        {renderInfoRow('Registered', 'registeredAt', false)}
      </div>

      {/* University Info Section */}
      <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-dark-blue">
          University Details
        </h2>
        {renderInfoRow('University', 'university')}
        {renderInfoRow('Faculty', 'faculty')}
        {renderInfoRow('Education', 'education')}
        {renderInfoRow('Graduated Year', 'graduatedYear')}
      </div>

      {/* Additional Info Section */}
      <div className="mb-20 rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-dark-blue">
          Additional Information
        </h2>
        {renderInfoRow('Jersey Size', 'sizeJersey')}
        {renderInfoRow('Food Restrictions', 'foodLimitation')}
        {user.chronicDisease &&
          renderInfoRow('Chronic Disease', 'chronicDisease')}
        {user.drugAllergy && renderInfoRow('Drug Allergy', 'drugAllergy')}
      </div>

      {/* Delete Button with Confirmation Dialog */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild>
          <button className="fixed bottom-4 left-1/2 w-full max-w-md -translate-x-1/2 rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-600">
            Delete User
          </button>
        </Dialog.Trigger>
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
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Delete User Account
                </Dialog.Title>

                <Dialog.Description className="text-center text-sm text-gray-600">
                  This will permanently delete {user.name} account and all
                  associated data.
                  <br />
                  This action cannot be undone.
                </Dialog.Description>

                <div className="mt-4 flex w-full gap-3">
                  <Dialog.Close asChild>
                    <button className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    onClick={handleDeleteUser}
                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
