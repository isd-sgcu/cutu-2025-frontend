import Footer from '@/components/homepage/footer';
import BG from '@/components/profile/Background';
import Header from '@/components/profile/Header';
import Ticket from '@/components/profile/Ticket/Ticket';

export default function page() {
  return (
    <div>
      <BG />
      <Header />
      <Ticket />
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
