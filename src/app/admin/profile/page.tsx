import Background from '@/components/staff/qr/background';
import Top from './_components/Top';
import Buttons from './_components/buttons';

export default function page() {
  return (
    <div className="relative min-h-screen w-full">
      <Top />
      <Background />
      <Buttons />
    </div>
  );
}
