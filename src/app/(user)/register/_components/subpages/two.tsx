import { User } from '@/types/user';

import Label from '../label';
import TextInput from '../textInput';
import DropdownInput from '../dropdownInput';
import ImageInput from '../imageinput';
import { Button } from '@/components/ui/button';

interface TwoProps {
  user: User;
  updateField: <T extends keyof User>(field: T) => (value: User[T]) => void;
  updateStep: (nextStep: number) => void;
}

export default function Two({ user, updateField, updateStep }: TwoProps) {
  // TODO: validate form
  const isValid = true;

  return (
    <ul className="w-full space-y-4 py-8">
      <li className="space-y-2">
        <Label isRequired text="ชื่อ-นามสกุล (ไม่มีคำนำหน้า)" />
        <TextInput value={user.fullname} setValue={updateField('fullname')} />
      </li>

      <li className="space-y-2">
        <Label isRequired text="อีเมล" />
        <TextInput value={user.email} setValue={updateField('email')} />
      </li>

      <li className="space-y-2">
        <Label isRequired text="หมายเลขโทรศัพท์" />
        <TextInput value={user.tel} setValue={updateField('tel')} />
      </li>

      <li className="space-y-2">
        <Label isRequired text="การศีกษา" />
        <DropdownInput
          value={user.study}
          setValue={updateField('study')}
          placeholder="กำลังศึกษาอยู่"
          choices={['กำลังศึกษาอยู่', 'จบการศึกษาแล้ว']}
        />
      </li>

      {user.study && (
        <li className="space-y-2">
          <Label
            isRequired
            text={
              user.study == 'กำลังศึกษาอยู่'
                ? 'มหาวิทยาลัย'
                : 'มหาวิทยาลัยที่จบการศึกษา'
            }
          />
          <DropdownInput
            value={user.university}
            setValue={updateField('university')}
            placeholder="จุฬาลงกรณ์มหาวิทยาลัย"
            choices={[
              'จุฬาลงกรณ์มหาวิทยาลัย',
              'มหาวิทยาลัยธรรมศาสตร์',
              'มหาวิทยาลัยรามคำแหง',
              'มหาวิทยาลัยเกษตรศาสตร์',
              'มหาวิทยาลัยขอนแก่น',
            ]}
          />
        </li>
      )}

      <li className="space-y-2">
        <Label isRequired text="สถานะ" />
        <TextInput value={user.status} setValue={updateField('status')} />
      </li>

      <li className="space-y-2">
        <Label isRequired text="ขนาดเสื้อ" />
        <DropdownInput
          value={user.size}
          setValue={updateField('size')}
          placeholder="กรุณาเลือก"
          choices={['s', 'm', 'xl', '2xl']}
        />
      </li>

      <li className="space-y-2">
        <Label text="ข้อจำกัดด้านอาหาร" />
        <TextInput
          value={user.foodAllegy}
          setValue={updateField('foodAllegy')}
        />
      </li>

      <li className="space-y-2">
        <Label text="โรคประจำตัว" />
        <TextInput value={user.disease} setValue={updateField('disease')} />
      </li>

      <li className="space-y-2">
        <Label text="การแพ้ยา" />
        <TextInput
          value={user.drugAllegy}
          setValue={updateField('drugAllegy')}
        />
      </li>

      <li className="space-y-2">
        <Label isRequired text="อัปโหลดรูปด้านหน้าบัตรประชาชน" />
        <ImageInput
          value={user.idCardImg}
          setValue={updateField('idCardImg')}
        />
      </li>

      <div className="text-center">
        <Button
          onClick={() => updateStep(3)}
          variant={isValid ? 'filled' : 'disabled'}
          className="text-lg"
        >
          ต่อไป
        </Button>
      </div>
    </ul>
  );
}
