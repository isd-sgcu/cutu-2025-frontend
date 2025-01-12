'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { getImageURL } from '@/utils/image';

const benefits = [
  {
    title: 'คูปองอาหารฟรี',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/homepage/coupon.png',
  },
  {
    title: 'ส่วนลดร้านค้า',
    description: 'Ut et massa mi. Ut et massa mi.',
    image: '/homepage/coupon.png',
  },
  {
    title: 'บัตรกำนัล',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/homepage/coupon.png',
  },
  {
    title: 'สินค้าฟรี',
    description: 'Ut et massa mi. Ut et massa mi.',
    image: '/homepage/coupon.png',
  },
];

export default function Benefits() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const handleScroll = () => {
      if (!carousel) return;

      const itemWidth = carousel.firstElementChild?.clientWidth || 0;
      const scrollPosition = carousel.scrollLeft + carousel.offsetWidth / 2;

      const closestIndex = Math.round(scrollPosition / itemWidth);
      const newScrollLeft = closestIndex * itemWidth - carousel.offsetWidth / 2;

      // Fix for the last item edge case
      const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
      const clampedScrollLeft = Math.min(
        Math.max(newScrollLeft, 0),
        maxScrollLeft,
      );

      carousel.scrollTo({
        left: clampedScrollLeft,
        behavior: 'smooth',
      });
    };

    let timeoutId: NodeJS.Timeout | null = null;

    const handleScrollEnd = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        handleScroll();
      }, 100);
    };

    carousel.addEventListener('scroll', handleScrollEnd);

    return () => {
      carousel.removeEventListener('scroll', handleScrollEnd);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

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
    <section className="h-80 bg-dark-pink p-4">
      <h2 className="mb-4 text-center text-xl font-bold text-white">
        สิทธิประโยชน์
      </h2>
      <div className="relative">
        {/* Left Navigation Button */}
        <button
          onClick={() => scrollCarousel('left')}
          className="absolute left-0 top-1/2 z-10 h-6 w-6 transform rounded-full bg-mid-blue font-bold text-white shadow-md"
        >
          &lt;
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto"
        >
          {benefits.map(({ title, description, image }, index) => (
            <div
              key={index}
              className="h-60 w-52 flex-shrink-0 snap-center border bg-white p-4"
            >
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={getImageURL(image)}
                  width={174}
                  height={107}
                  alt={title}
                />
              </div>

              <h3 className="mt-2 text-lg font-semibold">{title}</h3>
              <p className="text-sm font-light">{description}</p>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={() => scrollCarousel('right')}
          className="absolute right-0 top-1/2 z-10 h-6 w-6 transform rounded-full bg-mid-blue font-bold text-white shadow-md"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
