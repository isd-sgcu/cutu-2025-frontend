import TextInput from '@/app/(user)/register/_components/textInput';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

export default function AddRole() {
  return (
    <div className="flex items-center justify-center gap-4 border-b-2 border-b-light-pink px-6 py-4">
      <TextInput
        className="rounded-full border-light-gray shadow-none placeholder:text-center placeholder:text-dark-gray"
        placeholder="add phone number"
      />
      <Button
        className="flex items-center justify-center gap-2 text-lg"
        variant={'outline'}
      >
        <UserPlus className="hover:text-white" />
        Add Role
      </Button>
    </div>
  );
}
