import Condition from './condition';
import Content from './content';
import Topic from './topic';

interface PolicyProps {
  topic: string;
  content: string;
  condition: string;
  isAccepted: boolean;
  SetIsAccepted: (isAccepted: boolean) => void;
}

export default function Policy({
  topic,
  content,
  condition,
  isAccepted,
  SetIsAccepted,
}: PolicyProps) {
  return (
    <div className="space-y-2">
      <Topic topic={topic} />
      <Content content={content} />
      <Condition
        condition={condition}
        isAccepted={isAccepted}
        SetIsAccepted={SetIsAccepted}
      />
    </div>
  );
}
