'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { getImageURL } from '@/utils/image';
import { benefits } from '@/const/benefits';

export default function Benefits() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const itemWidth = carousel.firstElementChild?.clientWidth || 0;
    const scrollAmount = direction === 'left' ? -itemWidth : itemWidth;

    const newScrollLeft = carousel.scrollLeft + scrollAmount;

    // Prevent scrolling past the first or last item
    const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
    const clampedScrollLeft = Math.min(Math.max(newScrollLeft, 0), maxScroll);

    carousel.scrollTo({
      left: clampedScrollLeft,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="benefits"
      className="h-80 bg-gradient-to-t from-[#EB69A0] to-[#853B5B] p-4"
    >
      <h2 className="mb-4 text-center text-2xl font-bold text-white">
        สิทธิประโยชน์
      </h2>
      <div className="relative">
        {/* Left Navigation Button */}
        <button
          onClick={() => scrollCarousel('left')}
          className="absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 scale-75 transform rounded-full bg-dark-pink font-bold text-white"
        >
          <div className="relative grid scale-50 justify-items-center gap-1.5">
            <span className="h-0.5 w-6 translate-y-3 rotate-45 rounded-full bg-white" />

            <span className="h-0.5 w-6 -translate-y-3 -rotate-45 rounded-full bg-white" />
          </div>
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto"
        >
          {benefits.map(({ title, description, image }, index) => (
            <div
              key={index}
              className="h-[227px] w-[201px] flex-shrink-0 border bg-white p-4"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={getImageURL(image)}
                  width={174}
                  height={107}
                  alt={title}
                  className="rounded"
                />
              </div>

              <h3 className="mt-2 text-base font-semibold">{title}</h3>
              <p className="mt-0.5 text-sm font-light">{description}</p>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={() => scrollCarousel('right')}
          className="absolute right-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 scale-75 transform rounded-full bg-dark-pink font-bold text-white"
        >
          <div className="relative grid scale-50 justify-items-center gap-1.5">
            <span className="h-0.5 w-6 translate-y-3 -rotate-45 rounded-full bg-white" />

            <span className="h-0.5 w-6 -translate-y-3 rotate-45 rounded-full bg-white" />
          </div>
        </button>
      </div>
    </section>
  );
}
