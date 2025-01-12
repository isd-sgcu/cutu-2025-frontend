'use client';

import { useEffect, useState } from 'react';
import { TimerConfig } from '@/const/timer';

export default function Countdown() {
  const { targetDate } = TimerConfig;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const timeUnits = ['days', 'hours', 'minutes', 'seconds'] as const; // Explicitly type the keys

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initialize immediately
    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [targetDate]);

  return (
    <section className="bg-light-pink p-4 text-center">
      {/* Top Text */}
      <p className="text-base font-light">สิ้นสุดการลงทะเบียนในอีก...</p>

      {/* Countdown */}
      <div className="flex items-center justify-center space-x-2">
        {timeUnits
          .map((key, index) => (
            <div key={index} className="text-center">
              <h2 className="text-3xl font-semibold leading-tight">
                {timeLeft[key]} {/* Access timeLeft using strongly typed key */}
              </h2>
              <p className="text-sm font-light">
                {['วัน', 'ชั่วโมง', 'นาที', 'วินาที'][index]}
              </p>
            </div>
          ))
          .flatMap((item, i) =>
            i === 0 // Pipe separator after "days"
              ? [
                  item,
                  <div
                    key={`separator-${i}`}
                    className="mb-5 text-3xl font-normal"
                  >
                    |
                  </div>,
                ]
              : i < 3 // Colon separator for "hours", "minutes", "seconds"
                ? [
                    item,
                    <div
                      key={`separator-${i}`}
                      className="mb-5 text-3xl font-normal"
                    >
                      :
                    </div>,
                  ]
                : [item],
          )}
      </div>
    </section>
  );
}
