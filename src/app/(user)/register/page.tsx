'use client';

// TODO: validate field
// TODO: add error message

import { ReactNode, useState } from 'react';

import { User } from '@/types/user';

import Progress from './_components/progress';
import One from './_components/subpages/one';
import Two from './_components/subpages/two';
import Three from './_components/subpages/three';

export default function Page() {
  const [step, setStep] = useState(1);
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
      setUser({ ...user, [field]: value });
    };
  }

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
        return (
          <One
            isAcceptPDPA={user.isAcceptPDPA}
            isAcceptTermAndCondition={user.isAcceptTermAndCondition}
            setisAcceptPDPA={updateField('isAcceptPDPA')}
            setisAcceptTermAndCondition={updateField(
              'isAcceptTermAndCondition',
            )}
            updateStep={updateStep}
          />
        );
      case 2:
        return (
          <Two user={user} updateField={updateField} updateStep={updateStep} />
        );
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
