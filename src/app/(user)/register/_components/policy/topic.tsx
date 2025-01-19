interface TopicProps {
  topic: string;
}

export default function Topic({ topic }: TopicProps) {
  return <div className="text-lg font-[700]">{topic}</div>;
}
