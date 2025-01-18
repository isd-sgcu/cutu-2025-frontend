import Label from '../label';
import TextInput from '../textInput';
import DropdownInput from '../dropdownInput';
import ImageInput from '../imageinput';
import CheckBox from '../policy/checkbox';
import { Button } from '@/components/ui/button';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  sizes,
  studies,
  universities,
  User,
  UserSchema,
} from '../../schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import DateInput from '../dateInput';

interface TwoProps {
  nextStep: () => void;
}

export default function Two({} /* nextStep */ : TwoProps) {
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
    // nextStep();
  };

  const updateField = (field: keyof User) => {
    return (value: User[keyof User]) => {
      setValue(field, value);
    };
  };

  return (
    <form className="w-full space-y-4 py-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label isRequired text="ชื่อ-นามสกุล (ไม่มีคำนำหน้า)" />
        <TextInput {...register('fullname')} />
        {errors.fullname && (
          <p className="text-right text-sm text-red-500">
            {errors.fullname.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label isRequired text="อีเมล" />
        <TextInput {...register('email')} />
        {errors.email && (
          <p className="text-right text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label isRequired text="หมายเลขโทรศัพท์" />
        <TextInput {...register('tel')} />
        {errors.tel && (
          <p className="text-right text-sm text-red-500">
            {errors.tel.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label isRequired text="การศีกษา" />
        <DropdownInput
          value={watch('study')}
          setValue={updateField('study')}
          placeholder="กำลังศึกษาอยู่"
          choices={[...studies]}
        />
        {errors.study && (
          <p className="text-right text-sm text-red-500">
            {errors.study.message}
          </p>
        )}
      </div>

      {watch('study') && (
        <div className="space-y-2">
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

      <div className="space-y-2">
        <Label isRequired text="สถานะ" />
        <TextInput {...register('status')} />
        {errors.status && (
          <p className="text-right text-sm text-red-500">
            {errors.status.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label isRequired text="วันเกิด" />
        <DateInput
          value={watch('birthdate')}
          setValue={updateField('birthdate')}
        />
        {errors.birthdate && (
          <p className="text-right text-sm text-red-500">
            {errors.birthdate.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label isRequired text="ขนาดเสื้อ" />
        <DropdownInput
          value={watch('size')}
          setValue={updateField('size')}
          placeholder="กรุณาเลือก"
          choices={[...sizes]}
        />
        {errors.size && (
          <p className="text-right text-sm text-red-500">
            {errors.size.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label text="ข้อจำกัดด้านอาหาร" />
        <TextInput {...register('foodAllegy')} />
        {errors.foodAllegy && (
          <p className="text-right text-sm text-red-500">
            {errors.foodAllegy.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label text="โรคประจำตัว" />
        <TextInput {...register('disease')} />
        {errors.disease && (
          <p className="text-right text-sm text-red-500">
            {errors.disease.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label text="การแพ้ยา" />
        <TextInput {...register('drugAllegy')} />
        {errors.drugAllegy && (
          <p className="text-right text-sm text-red-500">
            {errors.drugAllegy.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label isRequired text="อัปโหลดรูปด้านหน้าบัตรประชาชน" />
        <ImageInput
          value={watch('idCardImg')}
          setValue={updateField('idCardImg')}
        />
        {errors.idCardImg && (
          <p className="text-right text-sm text-red-500">
            {errors.idCardImg.message}
          </p>
        )}
      </div>

      <div onClick={() => setValue('isConfirm', !watch('isConfirm'))}>
        <div className="flex gap-2">
          <CheckBox isChecked={watch('isConfirm')} />
          <Label
            isRequired
            text="ข้าพเจ้ายืนยันว่าข้อมูลข้างต้นมีความถูกต้อง"
          />
        </div>
        {errors.isConfirm && (
          <p className="text-right text-sm text-red-500">
            {errors.isConfirm.message}
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <Button className="text-lg">
          <input type="submit" value={'ยืนยันการลงทะเบียน'} />
        </Button>
      </div>
    </form>
  );
}
