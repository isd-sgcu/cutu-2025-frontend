import BG from '@/components/profile/Background';
import Header from '@/components/profile/Header';
import Ticket from '@/components/profile/Ticket/Ticket';

export default function page() {
  return (
    <div className="border-2">
      <BG />
      <Header />
      <Ticket />
    </div>
  );
}
