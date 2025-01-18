'use client';

import { ReactNode, useState } from 'react';

import Progress from './_components/progress';
import One from './_components/subpages/one';
import Two from './_components/subpages/two';
import Three from './_components/subpages/three';
import Top from './_components/top';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [step, setStep] = useState(1);
  const [isTerm, setIsTerm] = useState(false);
  const [isPDPA, setIsPDPA] = useState(false);
  const router = useRouter();

  function getPage(): ReactNode {
    switch (step) {
      case 2:
        return <Two nextStep={nextStep} />;
      case 3:
        return <Three />;
      default:
        return (
          <One
            nextStep={nextStep}
            isPDPA={isPDPA}
            isTerm={isTerm}
            setIsPDPA={setIsPDPA}
            setIsTerm={setIsTerm}
          />
        );
    }
  }

  function nextStep() {
    if (step == 3) {
      router.push('/prepare-before-event');
    } else {
      setStep(step + 1);
    }
  }

  function backStep() {
    if (step == 2) {
      setStep(1);
    } else {
      router.push('/');
    }
  }

  return (
    <div className="min-h-screen w-full">
      <Top
        backgroundPath="/(user)/register/bg.jpg"
        back={step <= 2 ? 'กลับ' : 'กลับเข้าสู่หน้าหลัก'}
        header="ลงทะเบียน"
        onBack={backStep}
      />
      <div className="flex flex-col items-center p-6">
        <Progress step={step} />
        {getPage()}
      </div>
    </div>
  );
}
