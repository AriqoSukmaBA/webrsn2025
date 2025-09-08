import React, { useEffect, useRef, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

const TIMELINE = [
  {
    y: "2009",
    t: "Awal Praktek",
    d: "dt. Turah, Sp.OG., M.Kes. Membuka praktek pribadi setelah menyelesaikan pendidikan di makassar.",
  },
  {
    y: "2015",
    t: "Klinik Utama Nindhita",
    d: "Praktek pribadi berkembang menjadi klinik utama Nindhita, diresmikan oleh Bupati Sampang pada 14 Maret 2015.",
  },
  {
    y: "2017",
    t: "Menjadi Rumah Sakit",
    d: "Operasional RS umum dengan IGD 24 jam.",
  },
  {
    y: "2019",
    t: "Akreditasi Tahap Awal",
    d: "Mulai mengikuti program Akreditasi Rumah Sakit untuk peningkatan mutu pelayanan.",
  },
  {
    y: "2022",
    t: "Akreditasi Lanjutan ",
    d: "Melanjutkan proses Akreditasi RS sebagai upaya berkesinambungan peningkatan kualitas dan Pengenmbangan Fasilitas berjalan seiring waktu",
  },
];

function useActiveStep() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-idx"));
            setActive(idx);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0.1 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return { active, refs };
}

export default function SejarahPage() {
  const { active, refs } = useActiveStep();

  return (
    <ServiceLayout
      title="Sejarah Singkat"
      subtitle="Perjalanan RS Nindhita dari klinik pratama hingga rumah sakit modern yang berfokus pada keselamatan pasien."
      heroBadges={["Sejak 2009", "Transformasi Digital", "Service Excellence"]}
      actions={[
        { label: "Profil Ringkas", href: "#profil", variant: "outline" },
      ]}
    >
      {/* Timeline Interaktif */}
      <section className="reveal">
        <h2>Timeline Perjalanan</h2>
        <div className="not-prose relative grid lg:grid-cols-[220px,1fr] gap-6">
          {/* rail kiri */}
          <div className="hidden lg:block">
            <div className="sticky top-28 glass rounded-2xl p-4 glow-border">
              <div className="text-xs font-bold text-orange-700">PROGRESS</div>
              <div className="mt-2 h-2 w-full rounded-full bg-orange-100 overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all"
                  style={{
                    width: `${((active + 1) / TIMELINE.length) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-3 text-sm text-slate-600">
                {active + 1} / {TIMELINE.length} tonggak
              </div>
            </div>
          </div>
          {/* steps */}
          <ol className="space-y-5">
            {TIMELINE.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.y}
                  data-idx={i}
                  ref={(el) => (refs.current[i] = el)}
                  className={`rounded-2xl border p-5 hover-lift transition ${
                    on
                      ? "border-orange-300 bg-slate-50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-orange-500 text-white font-bold">
                      {s.y.slice(2)}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-orange-700">
                        {s.y}
                      </div>
                      <div className="text-lg font-semibold text-slate-900">
                        {s.t}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-slate-700">{s.d}</p>
                  <div className="sparkline mt-3" />
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Budaya */}
      <section id="profil" className="mt-10 reveal">
        <h2>Motto & Budaya</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            [
              "Patient First",
              "Keputusan klinis selalu mengutamakan keselamatan & kenyamanan pasien.",
            ],
            [
              "Kualitas & Empati",
              "Standard klinis tinggi dengan komunikasi hangat & jelas.",
            ],
            [
              "Kolaborasi",
              "Sinergi tim medis, penunjang, dan keluarga pasien.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 glow-border"
            >
              <h3 className="font-semibold">{t}</h3>
              <p className="text-sm text-slate-700 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </ServiceLayout>
  );
}
