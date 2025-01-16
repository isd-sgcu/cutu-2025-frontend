import Condition from './consent';
import Content from './content';
import Topic from './topic';

interface PolicyProps {
  isRequired?: boolean;
  topic: string;
  content: string;
  consent: string;
  isAccepted: boolean;
  SetIsAccepted: (isAccepted: boolean) => void;
}

export default function Policy({
  isRequired = false,
  topic,
  content,
  consent,
  isAccepted,
  SetIsAccepted,
}: PolicyProps) {
  return (
    <div className="space-y-2">
      <Topic topic={topic} />
      <Content content={content} />
      <Condition
        value={isAccepted}
        setValue={SetIsAccepted}
        isRequired={isRequired}
        label={consent}
      />
    </div>
  );
}
