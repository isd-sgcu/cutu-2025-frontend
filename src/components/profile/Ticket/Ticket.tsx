import BG from '@/components/profile/Ticket/TicketBG';
import QR from '@/components/profile/Ticket/Qrcode';
import Inf from '@/components/profile/Ticket/Information';
import EditButton from '@/components/profile/Ticket/InfButton';

export default function Ticket() {
  return (
    <div className="relative z-0 mx-auto flex justify-center">
      <BG />
      <div className="absolute mt-20 flex flex-col items-center">
        <QR />
        <div className="mt-2 flex flex-col items-center">
          <Inf />
          <EditButton />
        </div>
      </div>
    </div>
  );
}
