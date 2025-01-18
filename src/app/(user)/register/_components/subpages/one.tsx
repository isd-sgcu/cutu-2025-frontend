'use client';

import Policy from '../policy';

import { PDPA, termAndCondition } from '../../_data/policy';
import { Button } from '@/components/ui/button';

interface OneProps {
  nextStep: () => void;
  isTerm: boolean;
  isPDPA: boolean;
  setIsTerm: (value: boolean) => void;
  setIsPDPA: (value: boolean) => void;
}

export default function One({
  nextStep,
  isPDPA,
  isTerm,
  setIsPDPA,
  setIsTerm,
}: OneProps) {
  const isValid = isTerm && isPDPA;

  return (
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
          onClick={nextStep}
          variant={isValid ? 'filled' : 'disabled'}
          className="text-lg"
        >
          ต่อไป
        </Button>
      </div>
    </div>
  );
}
