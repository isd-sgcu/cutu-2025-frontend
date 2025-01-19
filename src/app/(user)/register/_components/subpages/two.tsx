import Label from '../label';
import TextInput from '../textInput';
import DropdownInput from '../dropdownInput';
import ImageInput from '../imageinput';
import CheckBox from '../policy/checkbox';
import { Button } from '@/components/ui/button';

import { SubmitHandler, useForm } from 'react-hook-form';
import { User, UserSchema } from '../../schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import DateInput from '../dateInput';

import { useEffect } from 'react';
import ComboBox from '../comboBox';
import { studies } from '../../_data/studies';
import { universities } from '../../_data/universities';
import { faculties } from '../../_data/faculties';
import { sizes } from '../../_data/size';

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

  console.log(errors);
  console.log(watch());

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
      {/* fullname */}
      <div className="relative space-y-1">
        <Label isRequired>ชื่อ-นามสกุล (ไม่มีคำนำหน้า)</Label>
        <TextInput {...register('fullname')} />
        {errors.fullname && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.fullname.message}
          </p>
        )}
      </div>

      {/* email */}
      <div className="relative space-y-1">
        <Label isRequired>อีเมล</Label>
        <TextInput {...register('email')} />
        {errors.email && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* tel */}
      <div className="relative space-y-1">
        <Label isRequired>หมายเลขโทรศัพท์</Label>
        <TextInput {...register('tel')} />
        {errors.tel && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.tel.message}
          </p>
        )}
      </div>

      {/* study */}
      <div className="relative space-y-1">
        <Label isRequired>การศึกษา</Label>
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

      {/* university */}
      {/* TODO: optimize here, there are 390 universties in list */}
      {watch('study') && (
        <div className="relative space-y-1">
          <Label isRequired>
            {watch('study') == 'กำลังศึกษาอยู่'
              ? 'มหาวิทยาลัย'
              : 'มหาวิทยาลัยที่จบการศึกษา'}
          </Label>
          <ComboBox
            value={watch('university') || ''}
            setValue={updateField('university')}
            placeholder="กรุณาเลือก"
            choices={[...universities]}
            searchText="ค้นหามหาวิทยาลัย"
            emptyText="ไม่มีข้อมูล"
          />
        </div>
      )}

      {/* status */}
      <div className="relative space-y-1">
        <Label isRequired>สถานะ</Label>
        <TextInput value={watch('status') || ''} readOnly />
        {errors.status && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.status.message}
          </p>
        )}
      </div>

      {/* graduate year && graduate faculty*/}
      {watch('study') == 'จบการศึกษาแล้ว' &&
        watch('university') == 'จุฬาลงกรณ์มหาวิทยาลัย' && (
          <div className="flex justify-between gap-4">
            <div className="relative flex-1 space-y-2">
              <Label isRequired>ปีที่สำเร็จการศึกษา</Label>
              <ComboBox
                value={watch('graduateYear')}
                setValue={updateField('graduateYear')}
                placeholder="2544"
                emptyText="ไม่มีข้อมูล"
                searchText="ค้นหาปีที่สำเร็จการศึกษา"
                choices={Array.from({ length: 101 }, (_, i) =>
                  (2468 + i).toString(),
                )}
              />
              {errors.graduateYear && (
                <p className="absolute right-0 text-right text-sm text-red-500">
                  {errors.graduateYear.message}
                </p>
              )}
            </div>

            <div className="relative flex-1 space-y-2">
              <Label isRequired>คณะที่สำเร็จการศึกษา</Label>
              <ComboBox
                value={watch('graduateFaculty')}
                setValue={updateField('graduateFaculty')}
                placeholder="กรุณาเลือก"
                emptyText="ไม่มีข้อมูล"
                searchText="ค้นหาคณะที่สำเร็จการศึกษา"
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

      {/* birthDate */}
      <div className="relative space-y-1">
        <Label isRequired>วันเกิด</Label>
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

      {/* size */}
      <div className="relative space-y-1">
        <Label isRequired>ขนาดเสื้อ</Label>
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

      {/* foodAllegy */}
      <div className="relative space-y-1">
        <Label>ข้อจำกัดด้านอาหาร</Label>
        <TextInput {...register('foodAllegy')} />
        {errors.foodAllegy && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.foodAllegy.message}
          </p>
        )}
      </div>

      {/* disease */}
      <div className="relative space-y-1">
        <Label>โรคประจำตัว</Label>
        <TextInput {...register('disease')} />
        {errors.disease && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.disease.message}
          </p>
        )}
      </div>

      {/* drugAllegy */}
      <div className="relative space-y-1">
        <Label>การแพ้ยา</Label>
        <TextInput {...register('drugAllegy')} />
        {errors.drugAllegy && (
          <p className="absolute right-0 text-right text-sm text-red-500">
            {errors.drugAllegy.message}
          </p>
        )}
      </div>

      {/* idCardImg */}
      <div className="relative space-y-1">
        <Label isRequired>อัปโหลดรูปด้านหน้าบัตรประชาชน</Label>
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

      {/* confirm */}
      <div
        onClick={() => setValue('isConfirm', !watch('isConfirm'))}
        className="flex gap-2 pt-8"
      >
        <CheckBox isChecked={!!watch('isConfirm')} />
        <Label isRequired>ข้าพเจ้ายืนยันว่าข้อมูลข้างต้นมีความถูกต้อง</Label>
      </div>

      {/* submit */}
      <div className="flex justify-center">
        <Button className="text-lg" disabled={!watch('isConfirm')}>
          <input type="submit" value={'ยืนยันการลงทะเบียน'} />
        </Button>
      </div>
    </form>
  );
}
