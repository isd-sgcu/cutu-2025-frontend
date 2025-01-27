import { useEffect } from 'react';

import Label from '../label';
import TextInput from '../textInput';
import DropdownInput from '../dropdownInput';
import ImageInput from '../imageinput';
import CheckBox from '../policy/checkbox';
import ComboBox from '../comboBox';
import { ErrorMsg, ErrorMsgFloat } from '../errorMsg';
import RegisterLayout from '../RegisterLayout';
import { Button } from '@/components/ui/button';

import { SubmitHandler, UseFormReturn } from 'react-hook-form';

import { useLiff } from '@/contexts/liff';
import { useAuth } from '@/contexts/auth';
import toast from 'react-hot-toast';
import { RegisterForm } from '@/schema/register';
import { educationsMap } from '@/const/educations';
import { universities } from '@/const/universities';
import { faculties } from '@/const/faculties';
import { sizeJersey } from '@/const/size';
import { statusMap } from '@/const/status';

interface TwoProps {
  setStep: (value: number) => void;
  form: UseFormReturn<RegisterForm>;
}

export default function Two({ setStep, form }: TwoProps) {
  const { client } = useLiff();
  const { register: sendRegister, registerError } = useAuth();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const user = watch();

  const onSubmit: SubmitHandler<RegisterForm> = async data => {
    const context = client?.getContext();
    const userId = context?.userId;
    if (!userId) {
      console.error('Failed submit register form: userId is undefined');
      return;
    }

    const toastId = toast.loading('กำลังส่ง');
    const resp = await sendRegister({
      ...data,
      id: userId,
    });
    if (resp.success) {
      onNext();
      toast.success('ลงทะเบียนสำเร็จ');
    } else {
      toast.error(resp.error.message);
    }
    toast.dismiss(toastId);
  };

  const updateField = (field: keyof RegisterForm) => {
    return (value: RegisterForm[keyof RegisterForm]) => {
      setValue(field, value);
    };
  };

  useEffect(() => {
    let status: RegisterForm['status'];

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
        status = 'chula_student';
      } else {
        status = 'general_student';
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

        {/* age */}
        <div className="relative space-y-1">
          <Label isRequired>อายุ</Label>
          <TextInput {...register('age')} />
          <ErrorMsgFloat>{errors.age?.message}</ErrorMsgFloat>
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
          <TextInput {...register('chronicDisease')} />
          <ErrorMsgFloat>{errors.chronicDisease?.message}</ErrorMsgFloat>
        </div>

        {/* drugAllegy */}
        <div className="relative space-y-1">
          <Label>การแพ้ยา</Label>
          <TextInput {...register('drugAllergy')} />
          <ErrorMsgFloat>{errors.drugAllergy?.message}</ErrorMsgFloat>
        </div>

        {/* idCardImg */}
        <div className="relative space-y-1">
          <Label isRequired>อัปโหลดรูปด้านหน้าบัตรประชาชน</Label>
          <ImageInput value={user.image} setValue={updateField('image')} />
          <ErrorMsgFloat>{errors.image?.message}</ErrorMsgFloat>
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
        <div className="flex flex-col items-center justify-center gap-2">
          <Button className="text-lg" disabled={!user.isConfirm}>
            <input type="submit" value={'ยืนยันการลงทะเบียน'} />
          </Button>
          <ErrorMsg className="text-base">{registerError?.message}</ErrorMsg>
        </div>
      </form>
    </RegisterLayout>
  );
}
