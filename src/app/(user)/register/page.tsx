'use client';

import { ReactNode, useState } from 'react';

import One from './_components/subpages/one';
import Two from './_components/subpages/two';
import Three from './_components/subpages/three';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserSchema } from './_schema/user';

export default function Page() {
  const [step, setStep] = useState(2);

  const [isTerm, setIsTerm] = useState(false);
  const [isPDPA, setIsPDPA] = useState(false);

  const form = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  function getPage(): ReactNode {
    switch (step) {
      case 1:
        return (
          <One
            setStep={setStep}
            isPDPA={isPDPA}
            isTerm={isTerm}
            setIsPDPA={setIsPDPA}
            setIsTerm={setIsTerm}
          />
        );
      case 2:
        return <Two setStep={setStep} form={form} />;
      case 3:
        return <Three />;
      default:
        return <div>404</div>;
    }
  }

  return <>{getPage()}</>;
}
