import { cn } from '@/lib/utils';
import { getImageURL } from '@/utils/image';
import Image from 'next/image';

interface ActionListProps extends React.ComponentPropsWithoutRef<'div'> {
  imageURL: string;
  text: string;
}

export default function ActionList({
  imageURL,
  className,
  text,
  ...props
}: ActionListProps) {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-2 p-1 px-2 text-white hover:opacity-50',
        className,
      )}
      {...props}
    >
      <Image src={getImageURL(imageURL)} alt="icon" width={20} height={20} />
      {text}
    </div>
  );
}
