import Background from '@/components/staff/qr/gradientbg';
import QRButton from '@/components/staff/qr/qrbutton';
import TopPart from '@/components/staff/qr/toppart';
import Edit from '@/components/staff/qr/editbutton';
export default function Home() {
  return (
    <main className="relative h-screen">
      <Background />
      <div className="relative flex flex-col items-center pt-32">
        <TopPart />
        <QRButton />
        <Edit />
      </div>
    </main>
  );
}
