import Benefits from '@/components/homepage/benefits';
import Footer from '@/components/homepage/footer';
import Hero from '@/components/homepage/hero';
import Navbar from '@/components/homepage/navbar';
import Reviews from '@/components/homepage/review';
import Sponsors from '@/components/homepage/sponsor';
import Countdown from '@/components/homepage/timer';
export default function Homepage() {
  return (
    <div>
      <Navbar />
      <div className="mt-4" />
      <Hero />
      <Countdown />
      <Benefits />
      <Reviews />
      <Sponsors />
      <Footer />
    </div>
  );
}
