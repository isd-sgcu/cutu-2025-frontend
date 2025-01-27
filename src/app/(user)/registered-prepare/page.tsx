import Header from '@/components/registered-prepare/Header';
import Footer from '@/components/homepage/footer';
import Background from '@/components/profile/Background';

export default function Page() {
  return (
    <div className="min-h-screen w-full">
      <Background />
      <Header />
      <Footer />
    </div>
  );
}
