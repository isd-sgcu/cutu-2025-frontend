'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FileInputProps {
  value: File | null;
  setValue: (value: File) => void;
}

export default function ImageInput({ value, setValue }: FileInputProps) {
  const [base64, setBase64] = useState<string>('');

  useEffect(() => {
    // update base64
    if (value) {
      const reader = new FileReader();
      reader.onload = () => {
        setBase64(reader.result as string);
      };

      reader.onerror = () => {
        console.error('error convert to base64');
      };

      reader.readAsDataURL(value);
    }
  }, [value]);

  function handleOnChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setValue(e.target.files[0]);
    }
  }

  return (
    <div className="relative flex aspect-[17/10] w-full items-center justify-center rounded-xl border border-dark-gray transition hover:opacity-70">
      <input
        type="file"
        accept=".jpeg,.jpg,.webp,.png,.svg"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={handleOnChangeImage}
      />
      {base64 ? (
        <Image
          src={base64}
          alt="id-card-img"
          fill
          className="pointer-events-none object-contain p-2"
        />
      ) : (
        <Button className="px-8">อัปโหลด</Button>
      )}
    </div>
  );
}
