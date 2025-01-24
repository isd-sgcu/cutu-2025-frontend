'use client';

import { useEffect } from 'react';

import TextInput from '../../register/_components/textInput';
import DropdownInput from '../../register/_components/dropdownInput';
import ComboBox from '../../register/_components/comboBox';
import Label from '../../register/_components/label';
import DateInput from '../../register/_components/dateInput';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ErrorMsgFloat } from '../../register/_components/errorMsg';

import { User, UserSchema } from '../schema/user';
import { universities } from '../../register/_data/universities';
import { faculties } from '../../register/_data/faculties';
import { studies } from '../../register/_data/studies';
import { sizes } from '../../register/_data/size';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Form() {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const user = watch();

  const onSubmit: SubmitHandler<User> = data => {
    console.log(data);
  };

  const updateField = (field: keyof User) => {
    return (value: User[keyof User]) => {
      setValue(field, value);
    };
  };

  useEffect(() => {
    let status: User['status'];

    // set default value
    if (
      !!user.study &&
      !!user.university &&
      (user.study != 'จบการศึกษาแล้ว' ||
        user.university != 'จุฬาลงกรณ์มหาวิทยาลัย')
    ) {
      setValue('graduateYear', '9999');
      setValue('graduateFaculty', 'ไม่ระบุ');
    }

    // set status
    if (user.study == 'กำลังศึกษาอยู่') {
      if (user.university == 'จุฬาลงกรณ์มหาวิทยาลัย') {
        status = 'นิสิตปัจจุบัน';
      } else {
        status = 'นักศึกษา';
      }
    } else {
      if (user.university == 'จุฬาลงกรณ์มหาวิทยาลัย') {
        status = 'นิสิตเก่า';
      } else {
        status = 'บุคคลทั่วไป';
      }
    }

    setValue('status', status);
  }, [user.study, user.university, setValue]);

  return (
    <div className="w-full flex-1 bg-white">
      <form
        className="w-full space-y-4 px-6 py-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* fullname */}
        <div className="relative space-y-1">
          <Label isRequired>ชื่อ-นามสกุล (ไม่มีคำนำหน้า)</Label>
          <TextInput {...register('fullname')} />
          <ErrorMsgFloat>{errors.fullname?.message}</ErrorMsgFloat>
        </div>

        {/* email */}
        <div className="relative space-y-1">
          <Label isRequired>อีเมล</Label>
          <TextInput {...register('email')} />
          <ErrorMsgFloat>{errors.email?.message}</ErrorMsgFloat>
        </div>

        {/* tel */}
        <div className="relative space-y-1">
          <Label isRequired>หมายเลขโทรศัพท์</Label>
          <TextInput {...register('tel')} />
          <ErrorMsgFloat>{errors.tel?.message}</ErrorMsgFloat>
        </div>

        {/* study */}
        <div className="relative space-y-1">
          <Label isRequired>การศึกษา</Label>
          <DropdownInput
            value={user.study}
            setValue={updateField('study')}
            placeholder="กำลังศึกษาอยู่"
            choices={[...studies]}
          />
          <ErrorMsgFloat>{errors.study?.message}</ErrorMsgFloat>
        </div>

        {/* university */}
        {/* TODO: optimize here, there are 390 universties in list */}
        {user.study && (
          <div className="relative space-y-1">
            <Label isRequired>
              {user.study == 'กำลังศึกษาอยู่'
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
          <TextInput value={user.status || ''} readOnly />
          <ErrorMsgFloat>{errors.status?.message}</ErrorMsgFloat>
        </div>

        {/* graduate year && graduate faculty*/}
        {user.study == 'จบการศึกษาแล้ว' &&
          user.university == 'จุฬาลงกรณ์มหาวิทยาลัย' && (
            <div className="flex justify-between gap-4">
              <div className="relative w-1/2 space-y-2">
                <Label isRequired>ปีที่สำเร็จการศึกษา</Label>
                <ComboBox
                  value={user.graduateYear}
                  setValue={updateField('graduateYear')}
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
                <ErrorMsgFloat>{errors.graduateYear?.message}</ErrorMsgFloat>
              </div>

              <div className="relative w-1/2 space-y-2">
                <Label isRequired>คณะที่สำเร็จการศึกษา</Label>
                <ComboBox
                  value={user.graduateFaculty}
                  setValue={updateField('graduateFaculty')}
                  placeholder="กรุณาเลือก"
                  emptyText="ไม่มีข้อมูล"
                  searchText="ค้นหาคณะที่สำเร็จการศึกษา"
                  choices={[...faculties]}
                />
                <ErrorMsgFloat>{errors.graduateFaculty?.message}</ErrorMsgFloat>
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
            value={user.size}
            setValue={updateField('size')}
            placeholder="กรุณาเลือก"
            choices={[...sizes]}
          />
          <ErrorMsgFloat>{errors.size?.message}</ErrorMsgFloat>
        </div>

        {/* foodAllegy */}
        <div className="relative space-y-1">
          <Label>ข้อจำกัดด้านอาหาร</Label>
          <TextInput {...register('foodAllegy')} />
          <ErrorMsgFloat>{errors.foodAllegy?.message}</ErrorMsgFloat>
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
        <div className="flex justify-center pt-4">
          <Button className="flex items-center justify-center gap-2 px-16 text-lg">
            <Image
              src={'/(user)/profile/save-icon.svg'}
              alt="save-icon"
              width={16}
              height={16}
            />
            <input type="submit" value={'บันทึกการแก้ไข'} />
          </Button>
        </div>
      </form>
    </div>
  );
}
