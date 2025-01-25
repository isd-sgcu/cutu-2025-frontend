'use client';

import { useEffect } from 'react';

import TextInput from '../../register/_components/textInput';
import DropdownInput from '../../register/_components/dropdownInput';
import ComboBox from '../../register/_components/comboBox';
import Label from '../../register/_components/label';
import { Button } from '@/components/ui/button';
import { ErrorMsg, ErrorMsgFloat } from '../../register/_components/errorMsg';
import Image from 'next/image';
import DateInput from '../../register/_components/dateInput';

import { zodResolver } from '@hookform/resolvers/zod';
import { sizeJersey } from '@/const/size';
import { faculties } from '@/const/faculties';
import { EditForm, EditSchema } from '@/schema/edit';
import { educationsMap } from '@/const/educations';
import { universities } from '@/const/universities';
import { statusMap } from '@/const/status';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/auth';
import { useLiff } from '@/contexts/liff';
import toast from 'react-hot-toast';

export default function Form() {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditForm>({
    resolver: zodResolver(EditSchema),
  });

  const { editError, edit, isEditing } = useAuth();
  const { client } = useLiff();

  const user = watch();

  const onSubmit: SubmitHandler<EditForm> = async data => {
    const context = client?.getContext();
    const userId = context?.userId;
    if (!userId) {
      const error = new Error('Failed edit: userId is undefined');
      console.error(error);
      return;
    }

    const toastId = toast.loading('รอสักครู่');
    const resp = await edit({ ...data, id: userId });
    if (resp.success) {
      toast.success('บันทึกการแก้ไขสำเร็จ');
    } else {
      toast.error('บันทึกการแก้ไขไม่สำเร็จ');
    }

    toast.dismiss(toastId);
  };

  const updateField = (field: keyof EditForm) => {
    return (value: EditForm[keyof EditForm]) => {
      setValue(field, value);
    };
  };

  useEffect(() => {
    let status: EditForm['status'];

    // set default value
    if (
      !!user.education &&
      !!user.university &&
      (user.education != 'graduated' ||
        user.university != 'จุฬาลงกรณ์มหาวิทยาลัย')
    ) {
      setValue('graduatedYear', '9999');
      setValue('faculty', 'ไม่ระบุ');
    }

    // set status
    if (user.education == 'studying') {
      if (user.university == 'จุฬาลงกรณ์มหาวิทยาลัย') {
        status = 'cu_student';
      } else {
        status = 'student';
      }
    } else {
      if (user.university == 'จุฬาลงกรณ์มหาวิทยาลัย') {
        status = 'alumni';
      } else {
        status = 'general_public';
      }
    }

    setValue('status', status);
  }, [user.education, user.university, setValue]);

  return (
    <div className="w-full flex-1 bg-white">
      <form
        className="w-full space-y-4 px-6 py-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* name */}
        <div className="relative space-y-1">
          <Label isRequired>ชื่อ-นามสกุล (ไม่มีคำนำหน้า)</Label>
          <TextInput {...register('name')} />
          <ErrorMsgFloat>{errors.name?.message}</ErrorMsgFloat>
        </div>

        {/* email */}
        <div className="relative space-y-1">
          <Label isRequired>อีเมล</Label>
          <TextInput {...register('email')} />
          <ErrorMsgFloat>{errors.email?.message}</ErrorMsgFloat>
        </div>

        {/* phone */}
        <div className="relative space-y-1">
          <Label isRequired>หมายเลขโทรศัพท์</Label>
          <TextInput {...register('phone')} />
          <ErrorMsgFloat>{errors.phone?.message}</ErrorMsgFloat>
        </div>

        {/* education */}
        <div className="relative space-y-1">
          <Label isRequired>การศึกษา</Label>
          <DropdownInput
            value={educationsMap[user.education]}
            setValue={val => setValue('education', educationsMap[val])}
            placeholder="กำลังศึกษาอยู่"
            choices={Object.keys(educationsMap).map(key => key)}
          />
          <ErrorMsgFloat>{errors.education?.message}</ErrorMsgFloat>
        </div>

        {/* university */}
        {user.education && (
          <div className="relative space-y-1">
            <Label isRequired>
              {user.education == 'studying'
                ? 'มหาวิทยาลัย'
                : 'มหาวิทยาลัยที่จบการศึกษา'}
            </Label>
            <ComboBox
              value={user.university || ''}
              setValue={updateField('university')}
              placeholder="กรุณาเลือก"
              choices={[...universities]}
              searchText="ค้นหามหาวิทยาลัย"
              emptyText="ไม่มีข้อมูล"
            />
            <ErrorMsgFloat>{errors.university?.message}</ErrorMsgFloat>
          </div>
        )}

        {/* status */}
        <div className="relative space-y-1">
          <Label isRequired>สถานะ</Label>
          <TextInput value={statusMap[user.status] || ''} readOnly />
          <ErrorMsgFloat>{errors.status?.message}</ErrorMsgFloat>
        </div>

        {/* graduate year && graduate faculty*/}
        {user.education == 'graduated' &&
          user.university == 'จุฬาลงกรณ์มหาวิทยาลัย' && (
            <div className="flex justify-between gap-4">
              <div className="relative w-1/2 space-y-2">
                <Label isRequired>ปีที่สำเร็จการศึกษา</Label>
                <ComboBox
                  value={user.graduatedYear}
                  setValue={updateField('graduatedYear')}
                  placeholder="2544"
                  emptyText="ไม่มีข้อมูล"
                  searchText="ค้นหาปีที่สำเร็จการศึกษา"
                  choices={Array.from(
                    {
                      length: 101,
                    },
                    (_, i) => (2468 + i).toString(),
                  )}
                />
                <ErrorMsgFloat>{errors.graduatedYear?.message}</ErrorMsgFloat>
              </div>

              <div className="relative w-1/2 space-y-2">
                <Label isRequired>คณะที่สำเร็จการศึกษา</Label>
                <ComboBox
                  value={user.faculty}
                  setValue={updateField('faculty')}
                  placeholder="กรุณาเลือก"
                  emptyText="ไม่มีข้อมูล"
                  searchText="ค้นหาคณะที่สำเร็จการศึกษา"
                  choices={[...faculties]}
                />
                <ErrorMsgFloat>{errors.faculty?.message}</ErrorMsgFloat>
              </div>
            </div>
          )}

        {/* birthDate */}
        <div className="relative space-y-1">
          <Label isRequired>วันเกิด</Label>
          <DateInput
            value={user.birthdate}
            setValue={updateField('birthdate')}
          />
          <ErrorMsgFloat>{errors.birthdate?.message}</ErrorMsgFloat>
        </div>
        {/* size */}
        <div className="relative space-y-1">
          <Label isRequired>ขนาดเสื้อ</Label>
          <DropdownInput
            value={user.sizeJersey}
            setValue={updateField('sizeJersey')}
            placeholder="กรุณาเลือก"
            choices={[...sizeJersey]}
          />
          <ErrorMsgFloat>{errors.sizeJersey?.message}</ErrorMsgFloat>
        </div>

        {/* foodAllegy */}
        <div className="relative space-y-1">
          <Label>ข้อจำกัดด้านอาหาร</Label>
          <TextInput {...register('foodLimitation')} />
          <ErrorMsgFloat>{errors.foodLimitation?.message}</ErrorMsgFloat>
        </div>

        {/* disease */}
        <div className="relative space-y-1">
          <Label>โรคประจำตัว</Label>
          <TextInput {...register('disease')} />
          <ErrorMsgFloat>{errors.disease?.message}</ErrorMsgFloat>
        </div>

        {/* drugAllegy */}
        <div className="relative space-y-1">
          <Label>การแพ้ยา</Label>
          <TextInput {...register('drugAllegy')} />
          <ErrorMsgFloat>{errors.drugAllegy?.message}</ErrorMsgFloat>
        </div>

        {/* submit */}
        <div className="flex flex-col items-center justify-center gap-2 pt-4">
          <Button
            className="flex items-center justify-center gap-2 px-16 text-lg"
            disabled={isEditing}
          >
            <Image
              src={'/(user)/profile/save-icon.svg'}
              alt="save-icon"
              width={16}
              height={16}
            />
            <input type="submit" value={'บันทึกการแก้ไข'} />
          </Button>
          <ErrorMsg className="text-base">{editError?.message}</ErrorMsg>
        </div>
      </form>
    </div>
  );
}
