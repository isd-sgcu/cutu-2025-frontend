export default function Countdown() {
  return (
    <section className="bg-light-pink p-4 text-center">
      {/* Top Text */}
      <p className="text-base font-light">สิ้นสุดการลงทะเบียนในอีก...</p>

      {/* Countdown */}
      <div className="flex items-center justify-center space-x-4">
        {['วัน', 'ชั่วโมง', 'นาที', 'วินาที']
          .map((label, index) => (
            <div key={index} className="text-center">
              <h2 className="text-2xl font-semibold leading-tight">00</h2>
              <p className="text-sm font-light">{label}</p>
            </div>
          ))
          .flatMap((item, i) =>
            i == 0
              ? [
                  item,
                  <div key="separator" className="mb-2 text-3xl font-normal">
                    |
                  </div>,
                ]
              : [item],
          )}
      </div>
    </section>
  );
}
