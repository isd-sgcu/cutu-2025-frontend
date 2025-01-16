import Background from '@/components/staff/gradientbg';
import QRButton from '@/components/staff/qr/qrbutton';
import TopPart from '@/components/staff/qr/toppart';
import Edit from '@/components/staff/qr/editbutton';
export default function Home() {
  return (
    <main>
      <Background />
      <div className="relative mt-32 flex flex-col items-center">
        <TopPart />
        <QRButton />
        <Edit />
      </div>
    </main>
  );
}
