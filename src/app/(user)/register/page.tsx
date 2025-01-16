'use client';

import { ReactNode, useState } from 'react';
import Progress from './_components/progress';
import { Button } from '@/components/ui/button';
import Policy from './_components/policy';
import { PDPA, termAndCondition } from './_data/policy';
import { User } from '@/types/user';
import Label from './_components/label';
import TextInput from './_components/textInput';
import DropdownInput from './_components/dropdownInput';
import ImageInput from './_components/imageinput';
import { Check } from 'lucide-react';
import QRCode from 'react-qr-code';

export default function Page() {
  const [step, setStep] = useState(3);

  function nextStep() {
    const next = Math.min(3, step + 1);
    setStep(next);
  }

  function prevStep() {
    const prev = Math.max(0, step - 1);
    setStep(prev);
  }

  function getPage(): ReactNode {
    switch (step) {
      case 1:
        return <One />;
      case 2:
        return <Two />;
      default:
        return <Three />;
    }
  }

  return (
    <div className="flex flex-col items-center p-6">
      <Progress step={step} />
      {getPage()}
      <div>
        <Button onClick={prevStep} className="mx-2">
          prev
        </Button>
        <Button onClick={nextStep} className="mx-2">
          next
        </Button>
      </div>
    </div>
  );
}

function One() {
  const [isAcceptTermAndCondition, setisAcceptTermAndCondition] =
    useState(false);
  const [isAcceptPDPA, setisAcceptPDPA] = useState(false);

  return (
    <div className="space-y-6">
      <Policy
        topic={termAndCondition.topic}
        content={termAndCondition.content}
        consent={termAndCondition.consent}
        isRequired
        isAccepted={isAcceptTermAndCondition}
        SetIsAccepted={setisAcceptTermAndCondition}
      />
      <Policy
        topic={PDPA.topic}
        content={PDPA.content}
        consent={PDPA.consent}
        isRequired
        isAccepted={isAcceptPDPA}
        SetIsAccepted={setisAcceptPDPA}
      />
    </div>
  );
}

function Two() {
  const [user, setUser] = useState<User>({
    fullname: '',
    email: '',
    tel: '',
    birthdate: new Date(),
    size: '',
    foodAllegy: '',
    disease: '',
    drugAllegy: '',
    idCardImg: null,
    isConfirmCorrectInfo: false,
    isAcceptTermAndCondition: false,
    isAcceptPDPA: false,
    study: '',
    university: '',
    status: '',
    graduatedYear: 0,
    graduatedFaculty: '',
  });

  function updateField<T extends keyof User>(
    field: T,
  ): (value: User[T]) => void {
    return (value: User[T]) => {
      const tmp = { ...user };
      tmp[field] = value;
      setUser(tmp);
    };
  }

  return (
    <ul className="mt-4 w-full space-y-4">
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
    </ul>
  );
}

function Three() {
  return (
    <main className="mt-8 space-y-6">
      {/* seccess message */}
      <section className="flex flex-col items-center space-y-1">
        <div className="bg-dark-green flex size-[70px] items-center justify-center rounded-full">
          <Check strokeWidth={4} className="text-white" size={40} />
        </div>
        <div className="text-dark-green text-2xl font-bold">
          ลงทะเบียนสำเร็จ!
        </div>
      </section>

      {/* warning */}
      <section>
        <div className="text-center">
          กรุณาบันทึก QR-Code ด้านล่าง
          <br />
          สำหรับแสดงต่อเจ้าหน้าที่ในวันงาน
          <br />
          <span className="text-red-500 underline">
            กรุณาอย่าส่งต่อให้ผู้อื่น
          </span>
        </div>
      </section>

      {/* message */}
      <section className="text-center text-lg font-bold">
        โปรดศึกษาวิธีการเตรียมตัวก่อนวันงานด้านล่าง
      </section>

      {/* QR code */}
      <section className="flex flex-col items-center">
        <QRCode value="qr-code" className="size-[200px]" />
      </section>

      {/* save buttons */}
      <section className="flex flex-col items-center gap-4">
        <Button
          variant="outline"
          className="min-w-40 border-[3px] text-base font-light"
        >
          บันทึกไปยังโทรศัพท์
        </Button>
        <Button
          variant="outline"
          className="min-w-40 border-[3px] text-base font-light"
        >
          บันทึกไปยังอีเมล
        </Button>
      </section>

      <section className="flex justify-center">
        <Button className="px-6 text-base">วิธีการเตรียมตัวก่อนวันงาน</Button>
      </section>
    </main>
  );
}
