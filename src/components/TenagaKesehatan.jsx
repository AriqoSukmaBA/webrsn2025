import { useEffect, useState } from "react";

function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target); // ambil angka dari "100+" jadi 100
    if (start === end) return;

    let duration = 4000; // durasi animasi (ms)
    let stepTime = Math.abs(Math.floor(duration / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {target.includes("+") && "+"}
    </span>
  );
}

export default function TenagaKesehatan() {
  const data = [
    { angka: "17+", label: "Dokter Sub/Spesialis" },
    { angka: "6+", label: "Dokter Umum" },
    { angka: "50+", label: "Perawat & Bidan" },
    { angka: "50+", label: "Tenaga Medis Lain" },
  ];

  return (
    <section className="py-16 bg-[var(--rs-primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6 text-center">
        {data.map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white/10 shadow flex flex-col items-center"
          >
            <div className="text-3xl font-extrabold">
              <Counter target={item.angka} />
            </div>
            <div className="mt-2 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
