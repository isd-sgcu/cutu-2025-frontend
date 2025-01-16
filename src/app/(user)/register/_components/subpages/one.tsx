'use client';

import Policy from '../policy';

import { PDPA, termAndCondition } from '../../_data/policy';
import { Button } from '@/components/ui/button';

interface OneProps {
  isAcceptTermAndCondition: boolean;
  isAcceptPDPA: boolean;
  setisAcceptTermAndCondition: (value: boolean) => void;
  setisAcceptPDPA: (value: boolean) => void;
  updateStep: (nextStep: number) => void;
}

export default function One({
  isAcceptTermAndCondition,
  isAcceptPDPA,
  setisAcceptTermAndCondition,
  setisAcceptPDPA,
  updateStep,
}: OneProps) {
  const isValid = isAcceptTermAndCondition && isAcceptPDPA;

  return (
    <div className="space-y-6 py-8">
      <Policy
        topic={termAndCondition.topic}
        content={termAndCondition.content}
        consent={termAndCondition.consent}
        isRequired
        isAccepted={isAcceptTermAndCondition}
        SetIsAccepted={setisAcceptTermAndCondition}
      />

      <Policy
        topic={PDPA.topic}
        content={PDPA.content}
        consent={PDPA.consent}
        isRequired
        isAccepted={isAcceptPDPA}
        SetIsAccepted={setisAcceptPDPA}
      />

      <div className="text-center">
        <Button
          onClick={() => updateStep(2)}
          variant={isValid ? 'filled' : 'disabled'}
          className="text-lg"
        >
          ต่อไป
        </Button>
      </div>
    </div>
  );
}
