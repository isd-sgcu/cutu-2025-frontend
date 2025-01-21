'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

import { getImageURL } from '@/utils/image';
import { useRouter } from 'next/navigation';

interface BackWarningProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  callBackPath: string;
}

export default function BackWarning({
  isOpen,
  setIsOpen,
  callBackPath,
}: BackWarningProps) {
  const router = useRouter();

  function handleConfirm() {
    router.push(callBackPath);
  }

  function handlerCancel() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] max-w-md rounded-lg p-0 py-4">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col items-center rounded-md text-xl">
          <Image
            src={getImageURL('/(user)/register/question-mark.svg')}
            width={100}
            height={100}
            alt="warning"
          />
          <h1 className="mt-8 text-center font-bold">
            ท่านต้องการกลับไปยังหน้าหลักหรือไม่?
          </h1>
          <p className="text-center text-xl">
            ระบบจะยังไม่บันทึกข้อมูลที่ท่านได้กรอกไว้
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="filled"
              className="text-xl"
              onClick={handlerCancel}
            >
              ยกเลิก
            </Button>
            <Button
              variant="outline"
              className="text-xl"
              onClick={handleConfirm}
            >
              ตกลง
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
