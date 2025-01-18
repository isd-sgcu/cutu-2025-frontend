import Image from 'next/image';
import { getImageURL } from '@/utils/image';

export default function TicketBG() {
  return (
    <div className="mx-auto items-center pt-2">
      <Image
        src={getImageURL('/profile/Ticket.svg')}
        height={757}
        width={348}
        alt="Background"
      />
    </div>
  );
}
