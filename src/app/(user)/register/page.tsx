'use client';

import { useState } from 'react';
import DropdownInput from './_components/dropdownInput';
import Label from './_components/label';
import Progress from './_components/progress';
import ImageInput from './_components/imageinput';
import Policy from './_components/policy';

const choices = [
  'จุฬาลงกรณ์มหาวิทยาลัย',
  'มหาวิทยาลัยธรรมศาสตร์',
  'มหาวิทยาลัยรามคำแหง',
  'มหาวิทยาลัยเกษตรศาสตร์',
  'มหาวิทยาลัยขอนแก่น',
];

export default function Page() {
  const [value, setValue] = useState(choices[0]);
  const [file, setFile] = useState<File | null>(null);
  const [isAccept, setIsAccept] = useState(false);
  return (
    <div className="p-6">
      <Progress step={1} className="mx-auto" />
      <Label isRequired text="ชื่อ-นามสกุล" />
      <DropdownInput
        choices={choices}
        value={value}
        setValue={setValue}
        placeholder="เลือกมหาลัย"
      />
      <ImageInput value={file} setValue={setFile} />
      <Policy
        topic="นโยบายคุ้มครองข้อมูลส่วนบุคคล"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id."
        consent="ข้าพเจ้ายอมรับนโยบายคุ้มครองข้อมูลส่วนบุคคล"
        isAccepted={isAccept}
        SetIsAccepted={setIsAccept}
        isRequired
      />
    </div>
  );
}
