'use client';

import { useState } from 'react';

import { PDPA, termAndCondition } from '@/const/policy';

import Policy from '../policy';
import { Button } from '@/components/ui/button';
import RegisterLayout from '../RegisterLayout';
import BackWarning from '../BackWarning';

interface OneProps {
  isTerm: boolean;
  isPDPA: boolean;
  setStep: (value: number) => void;
  setIsTerm: (value: boolean) => void;
  setIsPDPA: (value: boolean) => void;
}

export default function One({
  isPDPA,
  isTerm,
  setStep,
  setIsPDPA,
  setIsTerm,
}: OneProps) {
  const isValid = isPDPA && isTerm;
  const [isOpenModal, setIsOpenModal] = useState(false);

  function onNext() {
    if (isValid) setStep(2);
  }

  function onBack() {
    setIsOpenModal(true);
  }

  return (
    <RegisterLayout
      step={1}
      onBack={onBack}
      bgPath="/(user)/register/bg.jpg"
      backMsg="กลับ"
    >
      <BackWarning
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        callBackPath="/"
      />
      <div className="space-y-8 py-8">
        <Policy
          topic={termAndCondition.topic}
          content={termAndCondition.content}
          consent={termAndCondition.consent}
          isRequired
          isAccepted={isTerm}
          SetIsAccepted={setIsTerm}
        />

        <Policy
          topic={PDPA.topic}
          content={PDPA.content}
          consent={PDPA.consent}
          isRequired
          isAccepted={isPDPA}
          SetIsAccepted={setIsPDPA}
        />

        <div className="text-center">
          <Button
            onClick={onNext}
            variant={isValid ? 'filled' : 'disabled'}
            className="text-lg"
          >
            ต่อไป
          </Button>
        </div>
      </div>
    </RegisterLayout>
  );
}
