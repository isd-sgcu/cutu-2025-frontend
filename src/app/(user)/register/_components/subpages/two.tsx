import Label from '../label';
import TextInput from '../textInput';
import DropdownInput from '../dropdownInput';
import ImageInput from '../imageinput';
import CheckBox from '../policy/checkbox';
import { Button } from '@/components/ui/button';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  faculties,
  sizes,
  studies,
  universities,
  User,
  UserSchema,
} from '../../schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import DateInput from '../dateInput';

import { useEffect } from 'react';

interface TwoProps {
  nextStep: () => void;
}

export default function Two({ nextStep }: TwoProps) {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit: SubmitHandler<User> = data => {
    console.log(data);
    nextStep();
  };

  const updateField = (field: keyof User) => {
    return (value: User[keyof User]) => {
      setValue(field, value);
    };
  };

  const study = watch('study');
  const university = watch('university');
  useEffect(() => {
    let status: User['status'];

    // set default value
    if (
      !!study &&
      !!university &&
      (study != 'จบการศึกษาแล้ว' || university != 'จุฬาลงกรณ์มหาวิทยาลัย')
    ) {
      setValue('graduateYear', '9999');
      setValue('graduateFaculty', 'ไม่ระบุ');
    }

    // set status
    if (study == 'กำลังศึกษาอยู่') {
      if (university == 'จุฬาลงกรณ์มหาวิทยาลัย') {
        status = 'นิสิตปัจจุบัน';
      } else {
        status = 'นักศึกษา';
      }
    } else {
      if (university == 'จุฬาลงกรณ์มหาวิทยาลัย') {
        status = 'นิสิตเก่า';
      } else {
        status = 'บุคคลทั่วไป';
      }
    }

    setValue('status', status);
  }, [study, university, setValue]);

  return (
    <form className="w-full space-y-4 py-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative space-y-2">
        <Label isRequired text="ชื่อ-นามสกุล (ไม่มีคำนำหน้า)" />
        <TextInput {...register('fullname')} />
        {errors.fullname && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.fullname.message}
          </p>
        )}
      </div>

      <div className="relative space-y-2">
        <Label isRequired text="อีเมล" />
        <TextInput {...register('email')} />
        {errors.email && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="relative space-y-2">
        <Label isRequired text="หมายเลขโทรศัพท์" />
        <TextInput {...register('tel')} />
        {errors.tel && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.tel.message}
          </p>
        )}
      </div>

      <div className="relative space-y-2">
        <Label isRequired text="การศีกษา" />
        <DropdownInput
          value={watch('study')}
          setValue={updateField('study')}
          placeholder="กำลังศึกษาอยู่"
          choices={[...studies]}
        />
        {errors.study && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.study.message}
          </p>
        )}
      </div>

      {watch('study') && (
        <div className="relative space-y-2">
          <Label
            isRequired
            text={
              watch('study') == 'กำลังศึกษาอยู่'
                ? 'มหาวิทยาลัย'
                : 'มหาวิทยาลัยที่จบการศึกษา'
            }
          />
          <DropdownInput
            value={watch('university')}
            setValue={updateField('university')}
            placeholder="จุฬาลงกรณ์มหาวิทยาลัย"
            choices={[...universities]}
          />
        </div>
      )}

      <div className="relative space-y-2">
        <Label isRequired text="สถานะ" />
        <TextInput value={watch('status') || ''} readOnly />
        {errors.status && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.status.message}
          </p>
        )}
      </div>

      {watch('study') == 'จบการศึกษาแล้ว' &&
        watch('university') == 'จุฬาลงกรณ์มหาวิทยาลัย' && (
          <div className="flex justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label isRequired text="ปีที่สำเร็จการศึกษา" />
              <TextInput
                {...register('graduateYear')}
                placeholder="2544"
                type="number"
              />
              {errors.graduateYear && (
                <p className="absolute right-0 text-right text-sm text-red-500">
                  {errors.graduateYear.message}
                </p>
              )}
            </div>

            <div className="flex-1 space-y-2">
              <Label isRequired text="คณะที่สำเร็จการศึกษา" />
              <DropdownInput
                value={watch('graduateFaculty')}
                setValue={updateField('graduateFaculty')}
                placeholder="กรุณาเลือก"
                choices={[...faculties]}
              />
              {errors.graduateFaculty && (
                <p className="absolute right-0 text-right text-sm text-red-500">
                  {errors.graduateFaculty.message}
                </p>
              )}
            </div>
          </div>
        )}

      <div className="relative space-y-2">
        <Label isRequired text="วันเกิด" />
        <DateInput
          value={watch('birthdate')}
          setValue={updateField('birthdate')}
        />
        {errors.birthdate && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.birthdate.message}
          </p>
        )}
      </div>

      <div className="relative space-y-2">
        <Label isRequired text="ขนาดเสื้อ" />
        <DropdownInput
          value={watch('size')}
          setValue={updateField('size')}
          placeholder="กรุณาเลือก"
          choices={[...sizes]}
        />
        {errors.size && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.size.message}
          </p>
        )}
      </div>

      <div className="relative space-y-2">
        <Label text="ข้อจำกัดด้านอาหาร" />
        <TextInput {...register('foodAllegy')} />
        {errors.foodAllegy && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.foodAllegy.message}
          </p>
        )}
      </div>

      <div className="relative space-y-2">
        <Label text="โรคประจำตัว" />
        <TextInput {...register('disease')} />
        {errors.disease && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.disease.message}
          </p>
        )}
      </div>

      <div className="relative space-y-2">
        <Label text="การแพ้ยา" />
        <TextInput {...register('drugAllegy')} />
        {errors.drugAllegy && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.drugAllegy.message}
          </p>
        )}
      </div>

      <div className="relative space-y-2">
        <Label isRequired text="อัปโหลดรูปด้านหน้าบัตรประชาชน" />
        <ImageInput
          value={watch('idCardImg')}
          setValue={updateField('idCardImg')}
        />
        {errors.idCardImg && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.idCardImg.message}
          </p>
        )}
      </div>

      <div
        onClick={() => setValue('isConfirm', !watch('isConfirm'))}
        className="flex gap-2 pt-8"
      >
        <CheckBox isChecked={!!watch('isConfirm')} />
        <Label isRequired text="ข้าพเจ้ายืนยันว่าข้อมูลข้างต้นมีความถูกต้อง" />
      </div>

      <div className="flex justify-center">
        <Button className="text-lg" disabled={!watch('isConfirm')}>
          <input type="submit" value={'ยืนยันการลงทะเบียน'} />
        </Button>
      </div>
    </form>
  );
}
