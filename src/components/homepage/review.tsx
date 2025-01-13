'use client';
import { getImageURL } from '@/utils/image';
import Image from 'next/image';
import { useRef } from 'react';
import { reviews } from '@/const/reviews';
export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = document.querySelector('.scroll-container');
    if (container) {
      container.scrollTo({
        left: container.scrollLeft + 300, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-light-blue px-3 py-4">
      <h2 className="text-center text-2xl font-bold text-white">รีวิว</h2>
      <div className="relative mt-4 flex items-center">
        {/* Left Navigation Button */}
        <button className="group h-8 w-8" onClick={scrollLeft}>
          <div className="relative grid scale-75 justify-items-center gap-1.5">
            <span className="h-0.5 w-6 translate-y-3 rotate-45 rounded-full bg-white" />

            <span className="h-0.5 w-6 -translate-y-3 -rotate-45 rounded-full bg-white" />
          </div>
        </button>
        {/* Review Content */}
        <div
          ref={scrollRef}
          className="scroll-container flex w-full gap-8 overflow-x-auto px-7"
        >
          {reviews.map(({ image, name, text }, idx) => (
            <div key={idx} className="w-64 flex-shrink-0 rounded-lg">
              <div className="flex justify-center">
                <Image
                  src={getImageURL(image)}
                  alt={name}
                  width={242}
                  height={107}
                />
              </div>
              <h3 className="mt-2 text-center font-semibold">{name}</h3>
              <p className="mx-2 mt-1 text-sm text-gray-700">{text}</p>
            </div>
          ))}
        </div>{' '}
        {/* Right Navigation Button */}
        <button className="group h-8 w-8" onClick={scrollRight}>
          <div className="relative grid scale-75 justify-items-center gap-1.5">
            <span className="h-0.5 w-6 translate-y-3 -rotate-45 rounded-full bg-white" />

            <span className="h-0.5 w-6 -translate-y-3 rotate-45 rounded-full bg-white" />
          </div>
        </button>
      </div>
    </section>
  );
}
