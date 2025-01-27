import TextInput from '@/app/(user)/register/_components/textInput';
import { useAuth } from '@/contexts/auth';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAddStaff } from '../api/user';

export default function AddRole() {
  const [phone, setPhone] = useState('');
  const { token } = useAuth();
  const { mutateAsync: addStaff } = useAddStaff(token?.accessToken || '');
  const { user } = useAuth();

  function onAddStaff() {
    if (phone == user?.phone) {
      toast.error('You cannot add yourself as a staff member', {
        duration: 5000,
      });
      return;
    }
    const resp = addStaff({ phone });
    toast.promise(resp, {
      loading: 'Adding staff',
      success: 'Adding staff successful',
      error: 'No user found with that phone number',
    });
  }

  return (
    <div className="flex items-center justify-center gap-4 border-b-2 border-b-light-pink px-6 py-4">
      <TextInput
        className="rounded-full border-light-gray shadow-none placeholder:text-center placeholder:text-dark-gray"
        placeholder="add phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <button
        className="flex items-center gap-2 text-nowrap rounded-full border border-dark-pink px-4 py-1.5 text-sm text-dark-pink"
        onClick={onAddStaff}
      >
        <UserPlus />
        Add Role
      </button>
    </div>
  );
}
