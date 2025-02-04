import Markdown from '../markdown/markdown';

interface ContentProps {
  content: string;
}

export default function Content({ content }: ContentProps) {
  return (
    <div className="h-64 overflow-y-auto rounded-md border-2 border-dark-gray p-2 text-base">
      <Markdown content={content} />
    </div>
  );
}
