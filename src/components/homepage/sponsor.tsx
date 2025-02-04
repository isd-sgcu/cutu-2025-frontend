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
      const itemWidth = container.clientWidth; // Width of the visible container
      const scrollDistance = items * itemWidth; // Scroll by the width of the container
      container.scrollBy({ left: scrollDistance, behavior: 'smooth' }); // Smooth scrolling
    }
  };

  return (
    <section className="px-3 py-4">
      <h2 className="text-center text-2xl font-bold">ผู้สนับสนุนของเรา</h2>
      <div className="relative mt-4 flex items-center">
        {/* Left Navigation Button */}
        <button
          className="group mb-2 h-8 w-8"
          onClick={() => scrollByItems(-1)} // Scroll left by one image
        >
          <div className="relative grid scale-75 justify-items-center gap-1.5">
            <span className="h-0.5 w-6 translate-y-3 rotate-45 rounded-full bg-black" />
            <span className="h-0.5 w-6 -translate-y-3 -rotate-45 rounded-full bg-black" />
          </div>
        </button>

        {/* Sponsors Content */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex h-full w-full overflow-x-scroll"
        >
          {sponsors.map(({ image, name }, sponsorIndex) => (
            <div
              key={sponsorIndex}
              className="h-44 w-full shrink-0 overflow-hidden" // Ensure each image takes full width
            >
              <div className="relative h-full w-full">
                <Image src={getImageURL(image)} alt={name} fill />
              </div>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button className="group h-8 w-8" onClick={() => scrollByItems(1)}>
          {' '}
          {/* Scroll right by one image */}
          <div className="relative mb-2 grid scale-75 justify-items-center gap-1.5">
            <span className="h-0.5 w-6 translate-y-3 -rotate-45 rounded-full bg-black" />
            <span className="h-0.5 w-6 -translate-y-3 rotate-45 rounded-full bg-black" />
          </div>
        </button>
      </div>
      <div className="mx-4 mt-4 border border-b border-black"></div>
    </section>
  );
}
