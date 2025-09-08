import React from "react";
import ServiceLayout from "../ServiceLayout.jsx";

export default function RadiologiPage() {
  return (
    <ServiceLayout
      nav="about"
      title="Instalasi Radiologi"
      subtitle="Layanan pencitraan diagnostik dengan standar proteksi radiasi dan pelaporan cepat."
      heroBadges={["Rontgen", "USG", "Proteksi Radiasi"]}
    >
      <section className="reveal">
        <h2>Layanan</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            ["Rontgen (X-Ray)", "Thoraks, ekstremitas, tulang belakang, dll."],
            [
              "Ultrasonografi (USG)",
              "Abdomen, obstetri/ginekologi, soft tissue.",
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

      <section id="persiapan" className="mt-8 reveal">
        <h2>Persiapan & Keselamatan</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3>Proteksi Radiasi</h3>
            <p className="text-sm text-slate-700 mt-1">
              Apron timah, kolimasi, dan ALARA diterapkan untuk menurunkan
              paparan.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3>Persiapan USG</h3>
            <p className="text-sm text-slate-700 mt-1">
              Beberapa USG perlu puasa/menahan BAK; ikuti instruksi dari
              petugas.
            </p>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
