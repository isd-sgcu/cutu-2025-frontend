'use client';

import { useState } from 'react';
import DropdownInput from './_components/dropdownInput';
import Label from './_components/label';
import Progress from './_components/progress';
import ImageInput from './_components/imageinput';

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
    </div>
  );
}
