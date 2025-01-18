'use client';

import { ReactNode, useState } from 'react';

import Progress from './_components/progress';
import One from './_components/subpages/one';
import Two from './_components/subpages/two';
import Three from './_components/subpages/three';

export default function Page() {
  const [step, setStep] = useState(2);

  function nextStep() {
    if (step == 3) {
      return;
    }
    setStep(step + 1);
  }

  function getPage(): ReactNode {
    switch (step) {
      case 2:
        return <Two nextStep={nextStep} />;
      case 3:
        return <Three />;
      default:
        return <One nextStep={nextStep} />;
    }
  }

  return (
    <div className="flex flex-col items-center p-6">
      <Progress step={step} />
      {getPage()}
    </div>
  );
}
