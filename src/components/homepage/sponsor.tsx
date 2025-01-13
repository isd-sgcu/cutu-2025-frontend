'use client';
import { useRef } from 'react';
import { sponsors } from '@/const/sponsors';
import { getImageURL } from '@/utils/image';
import Image from 'next/image';

export default function Sponsors() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByItems = (items: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const itemWidth = container.scrollWidth / Math.ceil(sponsors.length / 2); // Calculate the width of 4 items (columns in a row)
      const scrollDistance = items * itemWidth; // Total scroll distance for items
      container.scrollLeft += scrollDistance;
    }
  };

  return (
    <section className="px-3 py-4">
      <h2 className="text-center text-2xl font-bold">ผู้สนับสนุนของเรา</h2>
      <div className="relative mt-4 flex items-center">
        {/* Left Navigation Button */}
        <button
          className="group mb-2 h-8 w-8"
          onClick={() => scrollByItems(-3)}
        >
          <div className="relative grid scale-75 justify-items-center gap-1.5">
            <span className="h-0.5 w-6 translate-y-3 rotate-45 rounded-full bg-black" />
            <span className="h-0.5 w-6 -translate-y-3 -rotate-45 rounded-full bg-black" />
          </div>
        </button>

        {/* Sponsors Content */}
        <div
          ref={scrollRef}
          className="scroll-container flex gap-8 overflow-x-auto px-5"
        >
          {Array.from({ length: Math.ceil(sponsors.length / 8) }, (_, i) => (
            <div
              key={i}
              className="grid min-w-[300px] grid-cols-4 grid-rows-2 gap-4"
            >
              {sponsors.slice(i * 8, i * 8 + 8).map(({ image, name }, idx) => (
                <div
                  key={idx}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-gray-300"
                >
                  <div className="flex h-full items-center justify-center">
                    <Image
                      src={getImageURL(image)}
                      alt={name}
                      width={35}
                      height={35}
                      className="rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button className="group h-8 w-8" onClick={() => scrollByItems(3)}>
          <div className="relative mb-2 grid scale-75 justify-items-center gap-1.5">
            <span className="h-0.5 w-6 translate-y-3 -rotate-45 rounded-full bg-black" />
            <span className="h-0.5 w-6 -translate-y-3 rotate-45 rounded-full bg-black" />
          </div>
        </button>
      </div>
      <div className="border-1 mx-4 mt-4 border border-b border-black"></div>
    </section>
  );
}
