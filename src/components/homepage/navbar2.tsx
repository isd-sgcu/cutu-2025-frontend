'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getImageURL } from '@/utils/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 flex w-full items-center justify-between bg-gradient-to-b from-dark-pink via-20% to-white to-60%">
      <div className="relative ml-5 mt-12 h-16 w-10">
        <Image src={getImageURL('/homepage/Logo.svg')} fill alt="logo" />
      </div>

      <button
        className="group mr-5 mt-12 h-8 w-8"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="relative grid justify-items-center gap-1.5">
          <span
            className={`h-0.5 w-6 rounded-full bg-black transition-transform duration-300 ${
              isMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 rounded-full bg-black transition-transform duration-300 ${
              isMenuOpen ? 'scale-x-0' : ''
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 rounded-full bg-black transition-transform duration-300 ${
              isMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          ></span>
        </div>
      </button>

      <nav
        className={`absolute inset-x-0 top-32 bg-red-600 bg-opacity-90 transition-all duration-300 ${
          isMenuOpen ? 'z-40 opacity-100' : 'z-0 opacity-0'
        }`}
      >
        <ul
          className={`${
            isMenuOpen ? 'h-56' : 'h-0'
          } flex w-full flex-col space-y-6 text-lg text-dark-pink transition-all duration-300`}
        >
          <li className="cursor-pointer">หน้าหลัก</li>
          <li className="cursor-pointer">สิทธิประโยชน์</li>
          <li className="cursor-pointer">รีวิว</li>
          <li className="cursor-pointer">ติดต่อเรา</li>
          <li className="cursor-pointer">ลงทะเบียน</li>
        </ul>
      </nav>
    </header>
  );
}
