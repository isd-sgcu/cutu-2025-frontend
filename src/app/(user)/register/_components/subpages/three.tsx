import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import QRCode from 'react-qr-code';

export default function Three() {
  return (
    <main className="py-8 space-y-6">
      {/* seccess message */}
      <section className="flex flex-col items-center space-y-1">
        <div className="flex size-[70px] items-center justify-center rounded-full bg-dark-green">
          <Check strokeWidth={4} className="text-white" size={40} />
        </div>
        <div className="text-2xl font-bold text-dark-green">
          ลงทะเบียนสำเร็จ!
        </div>
      </section>

      {/* warning */}
      <section>
        <div className="text-center">
          กรุณาบันทึก QR-Code ด้านล่าง
          <br />
          สำหรับแสดงต่อเจ้าหน้าที่ในวันงาน
          <br />
          <span className="text-red-500 underline">
            กรุณาอย่าส่งต่อให้ผู้อื่น
          </span>
        </div>
      </section>

      {/* message */}
      <section className="text-center text-lg font-bold">
        โปรดศึกษาวิธีการเตรียมตัวก่อนวันงานด้านล่าง
      </section>

      {/* QR code */}
      <section className="flex flex-col items-center">
        <QRCode value="qr-code" className="size-[200px]" />
      </section>

      {/* save buttons */}
      <section className="flex flex-col items-center gap-4">
        <Button
          variant="outline"
          className="min-w-40 border-[3px] text-base font-light hover:bg-dark-pink hover:text-white transition-colors"
        >
          บันทึกไปยังโทรศัพท์
        </Button>
        <Button
          variant="outline"
          className="min-w-40 border-[3px] text-base font-light hover:bg-dark-pink hover:text-white transition-colors"
        >
          บันทึกไปยังอีเมล
        </Button>
      </section>

      <section className="flex justify-center">
        <Link href={'/prepare-before-event'}>
          <Button className="px-6 text-base">วิธีการเตรียมตัวก่อนวันงาน</Button>
        </Link>
      </section>
    </main>
  );
}
