import Label from '../label';
import TextInput from '../textInput';
import DropdownInput from '../dropdownInput';
import ImageInput from '../imageinput';
import CheckBox from '../policy/checkbox';
import { Button } from '@/components/ui/button';

import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { User } from '../../schema/user';
import DateInput from '../dateInput';

import { useEffect } from 'react';
import ComboBox from '../comboBox';
import { studies } from '../../_data/studies';
import { universities } from '../../_data/universities';
import { faculties } from '../../_data/faculties';
import { sizes } from '../../_data/size';
import ErrorMsg from '../errorMsg';
import RegisterLayout from '../RegisterLayout';

interface TwoProps {
  setStep: (value: number) => void;
  form: UseFormReturn<User>;
}

export default function Two({ setStep, form }: TwoProps) {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const user = watch();

  const onSubmit: SubmitHandler<User> = data => {
    console.log(data);
    onNext();
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

  function onBack() {
    setStep(1);
  }

  function onNext() {
    setStep(3);
  }

  return (
    <RegisterLayout
      step={2}
      onBack={onBack}
      bgPath="/user/register/bg.jpg"
      backMsg="กลับ"
    >
      <form className="w-full space-y-4 py-8" onSubmit={handleSubmit(onSubmit)}>
        {/* fullname */}
        <div className="relative space-y-1">
          <Label isRequired>ชื่อ-นามสกุล (ไม่มีคำนำหน้า)</Label>
          <TextInput {...register('fullname')} />
          <ErrorMsg message={errors.fullname?.message} />
        </div>

        {/* email */}
        <div className="relative space-y-1">
          <Label isRequired>อีเมล</Label>
          <TextInput {...register('email')} />
          <ErrorMsg message={errors.email?.message} />
        </div>

        {/* tel */}
        <div className="relative space-y-1">
          <Label isRequired>หมายเลขโทรศัพท์</Label>
          <TextInput {...register('tel')} />
          <ErrorMsg message={errors.tel?.message} />
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
          <ErrorMsg message={errors.study?.message} />
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
            <ErrorMsg message={errors.university?.message} />
          </div>
        )}

        {/* status */}
        <div className="relative space-y-1">
          <Label isRequired>สถานะ</Label>
          <TextInput value={user.status || ''} readOnly />
          <ErrorMsg message={errors.status?.message} />
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
                <ErrorMsg message={errors.graduateYear?.message} />
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
                <ErrorMsg message={errors.graduateFaculty?.message} />
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
          <ErrorMsg message={errors.birthdate?.message} />
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
          <ErrorMsg message={errors.size?.message} />
        </div>

        {/* foodAllegy */}
        <div className="relative space-y-1">
          <Label>ข้อจำกัดด้านอาหาร</Label>
          <TextInput {...register('foodAllegy')} />
          <ErrorMsg message={errors.foodAllegy?.message} />
        </div>

        {/* disease */}
        <div className="relative space-y-1">
          <Label>โรคประจำตัว</Label>
          <TextInput {...register('disease')} />
          <ErrorMsg message={errors.disease?.message} />
        </div>

        {/* drugAllegy */}
        <div className="relative space-y-1">
          <Label>การแพ้ยา</Label>
          <TextInput {...register('drugAllegy')} />
          <ErrorMsg message={errors.drugAllegy?.message} />
        </div>

        {/* idCardImg */}
        <div className="relative space-y-1">
          <Label isRequired>อัปโหลดรูปด้านหน้าบัตรประชาชน</Label>
          <ImageInput
            value={user.idCardImg}
            setValue={updateField('idCardImg')}
          />
          <ErrorMsg message={errors.idCardImg?.message} />
        </div>

        {/* confirm */}
        <div
          onClick={() => setValue('isConfirm', !user.isConfirm)}
          className="flex gap-2 pt-8"
        >
          <CheckBox isChecked={!!user.isConfirm} />
          <Label isRequired>ข้าพเจ้ายืนยันว่าข้อมูลข้างต้นมีความถูกต้อง</Label>
        </div>

        {/* submit */}
        <div className="flex justify-center">
          <Button className="text-lg" disabled={!user.isConfirm}>
            <input type="submit" value={'ยืนยันการลงทะเบียน'} />
          </Button>
        </div>
      </form>
    </RegisterLayout>
  );
}
