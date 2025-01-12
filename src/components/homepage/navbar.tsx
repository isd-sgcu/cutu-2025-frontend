'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getImageURL } from '@/utils/image';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { title: 'หน้าหลัก', link: '/' },
    { title: 'สิทธิประโยชน์', link: '#benefits' },
    { title: 'รีวิว', link: '#reviews' },
    { title: 'ติดต่อเรา', link: '#contacts' },
    { title: 'ลงทะเบียน', link: '/register' },
  ];

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

      <div
        className={`absolute top-28 z-40 w-full bg-white py-4 transition-all duration-500 ease-in-out ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-5 opacity-0'
        }`}
      >
        <div className="mx-7 mb-2 w-full border-b border-gray-300" />
        <ul className="flex h-full flex-col items-center justify-center px-7 py-1 text-lg text-dark-pink">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="w-full cursor-pointer text-2xl font-semibold text-black hover:text-pink-500"
            >
              {item.title}
              <div className="my-2 border-b border-gray-300" />
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
}
