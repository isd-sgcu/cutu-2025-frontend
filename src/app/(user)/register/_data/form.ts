import { User } from '@/types/user';
import TextInput from '../_components/textInput';
import { JSX } from 'react';

export type UserField = {
  label: string;
  input: JSX.ElementType;
  field: keyof User;
  isRequired: boolean;
};

export const UserFields: UserField[] = [
  {
    label: 'ชื่อ-นามสกุล (ไม่มีคำนำหน้า)',
    input: TextInput,
    field: 'fullname',
    isRequired: true,
  },
];
