import Background from '@/components/staff/qr/background';
import TopPart from '@/components/staff/qr/toppart';
import Edit from '@/components/staff/qr/editbutton';
import QrButton from '@/components/staff/qr/qrbutton';
import Refine from '@/components/staff/qr/refineButton';
export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Background />
      <div className="relative flex flex-col items-center pt-32">
        <TopPart />
        <QrButton />
        <Edit />
        <Refine />
      </div>
    </main>
  );
}
