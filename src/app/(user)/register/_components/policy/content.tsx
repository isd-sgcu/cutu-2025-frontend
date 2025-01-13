interface ContentProps {
  content: string;
}

export default function Content({ content }: ContentProps) {
  return (
    <div className="border-dark-gray h-64 overflow-y-auto rounded-md border-2 p-2">
      {content}
    </div>
  );
}
