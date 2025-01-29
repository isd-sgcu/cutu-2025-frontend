import Footer from '@/components/homepage/footer';
import BG from '@/components/profile/Background';
import Header from '@/components/profile/Header';
import Ticket from '@/components/profile/Ticket/Ticket';
import Protect from '@/components/protect';

export default function page() {
  return (
    <div>
      <Protect roles={['member', 'staff', 'admin']}>
        <BG />
        <Header />
        <Ticket />
        <div className="mt-8">
          <Footer />
        </div>
      </Protect>
    </div>
  );
}
