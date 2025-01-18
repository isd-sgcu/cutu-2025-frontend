'use client';

// TODO: validate field
// TODO: add error message

import { ReactNode, useState } from 'react';

import Progress from './_components/progress';
import One from './_components/subpages/one';
import Two from './_components/subpages/two';
import Three from './_components/subpages/three';

export default function Page() {
  const [step, setStep] = useState(2);

  function updateStep(nextStep: number) {
    if (nextStep < 1 || nextStep > 3) {
      console.error('Invalid step:', nextStep);
      return;
    }

    setStep(nextStep);
  }

  function getPage(): ReactNode {
    switch (step) {
      case 1:
        return <One updateStep={updateStep} />;
      case 2:
        return <Two updateStep={updateStep} />;
      default:
        return <Three />;
    }
  }

  return (
    <div className="flex flex-col items-center p-6">
      <Progress step={step} />
      {getPage()}
    </div>
  );
}
