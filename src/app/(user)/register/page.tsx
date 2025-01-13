'use client';

import Label from './_components/label';
import Progress from './_components/progress';

export default function Page() {
  return (
    <div className="p-6">
      <Progress step={1} className="mx-auto" />
      <Label isRequired text="ชื่อ-นามสกุล" />
    </div>
  );
}
