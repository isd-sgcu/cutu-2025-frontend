const reviews = [
  { image: '/review1.jpg', text: 'กิจกรรมที่ TU-CU สนุกสุดๆ' },
  { image: '/review2.jpg', text: 'ประสบการณ์ดีมาก' },
  // Add more reviews here
];

export default function Reviews() {
  return (
    <section className="bg-blue-100 p-4">
      <h2 className="text-xl font-bold text-blue-500">รีวิว</h2>
      <div className="mt-4 flex space-x-4 overflow-x-auto">
        {reviews.map(({ text }, idx) => (
          <div key={idx} className="min-w-[200px]">
            {/* <img src={image} alt={text} className="h-20 w-full object-cover" /> */}
            <p className="text-xs mt-2">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
