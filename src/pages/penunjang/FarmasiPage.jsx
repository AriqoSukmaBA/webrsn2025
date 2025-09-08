import React from "react";
import ServiceLayout from "../ServiceLayout.jsx";

export default function FarmasiPage() {
  return (
    <ServiceLayout
      nav="about"
      title="Instalasi Farmasi"
      subtitle="Pengelolaan obat yang aman, efektif, dan terjangkau dengan layanan konseling obat."
      heroBadges={["Obat Tepat", "E-Resep", "Konseling Obat"]}
    >
      <section className="reveal">
        <h2>Layanan</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            [
              "Peracikan & Dispensing",
              "Peracikan sesuai standar, double-check nama obat/dosis/etiket.",
            ],
            [
              "Obat Resep & Non Resep",
              "Layanan obat resep dokter dan OTC sesuai indikasi.",
            ],
            [
              "Manajemen Stok",
              "Penyimpanan suhu-terkendali & FEFO, keamanan narkotika/psikotropika.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5"
            >
              <h3 className="font-semibold">{t}</h3>
              <p className="text-sm text-slate-700 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="konseling" className="mt-8 reveal">
        <h2>Konseling Obat</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          {[
            [
              "Cara Pakai & Efek Samping",
              "Waktu minum, interaksi makanan/obat, kewaspadaan efek samping.",
            ],
            [
              "Adherence",
              "Tips tidak lupa minum obat & monitoring terapi kronis.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5"
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
