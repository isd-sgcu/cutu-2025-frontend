import Background from '@/components/staff/qr/background';
import Top from './_components/top';
import Detail from './_components/detail';

export default function page() {
  return (
    <div className="item-center relative flex min-h-screen w-full flex-col pt-8">
      <Background />
      <Top />
      <div className="mt-4"></div>
      <Detail />
    </div>
  );
}
