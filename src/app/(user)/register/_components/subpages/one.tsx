'use client';

import Policy from '../policy';

import { PDPA, termAndCondition } from '../../_data/policy';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface OneProps {
  nextStep: () => void;
}

export default function One({ nextStep }: OneProps) {
  const [isAcceptTermAndCondition, setIsAcceptTermAndCondition] =
    useState(false);
  const [isAcceptPDPA, setIsAcceptPDPA] = useState(false);

  const isValid = isAcceptTermAndCondition && isAcceptPDPA;

  return (
    <div className="space-y-6 py-8">
      <Policy
        topic={termAndCondition.topic}
        content={termAndCondition.content}
        consent={termAndCondition.consent}
        isRequired
        isAccepted={isAcceptTermAndCondition}
        SetIsAccepted={setIsAcceptTermAndCondition}
      />

      <Policy
        topic={PDPA.topic}
        content={PDPA.content}
        consent={PDPA.consent}
        isRequired
        isAccepted={isAcceptPDPA}
        SetIsAccepted={setIsAcceptPDPA}
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
