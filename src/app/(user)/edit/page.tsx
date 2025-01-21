import Background from '@/components/staff/qr/background';
import Top from './_components/top';
import Form from './_components/form';

export default function page() {
  return (
    <div className="relative flex min-h-screen flex-col items-center pt-16">
      <Background />
      <Top />
      <div className="mt-6"></div>
      <Form />
    </div>
  );
}
