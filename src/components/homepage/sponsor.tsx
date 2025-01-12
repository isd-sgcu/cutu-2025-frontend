const sponsors = ['/sponsor1.jpg', '/sponsor2.jpg', '/sponsor3.jpg'];

export default function Sponsors() {
  return (
    <section className="bg-white p-4">
      <h2 className="text-xl font-bold">ผู้สนับสนุนของเรา</h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {sponsors.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt="sponsor"
            className="h-16 w-full object-contain"
          />
        ))}
      </div>
    </section>
  );
}
