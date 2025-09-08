import React from "react";
import ServiceLayout from "../ServiceLayout.jsx";

export default function LabPage() {
  return (
    <ServiceLayout
      nav="about"
      title="Instalasi Laboratorium"
      subtitle="Pemeriksaan hematologi, kimia klinik, imunologi & mikrobiologi dengan quality control harian."
      heroBadges={["QC Harian", "Hasil Tepat Waktu"]}
    >
      <section className="reveal">
        <h2>Jenis Pemeriksaan</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            ["Hematologi", "Darah lengkap, hitung jenis, Hb, trombosit."],
            ["Kimia Klinik", "Gula darah, profil lipid, fungsi hati & ginjal."],
            [
              "Imunoserologi / Mikro",
              "CRP, Widal, HBsAg, kultur & sensitivitas.",
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
        <h2>Persiapan & Waktu Hasil</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3>Puasa (Bila Diminta)</h3>
            <p className="text-sm text-slate-700 mt-1">
              Umumnya 8–10 jam untuk pemeriksaan tertentu (mis. gula darah
              puasa, lipid).
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3>Estimasi Hasil</h3>
            <p className="text-sm text-slate-700 mt-1">
              Rutin 1×24 jam; kultur 3–5 hari; hasil darurat mengikuti kondisi
              klinis.
            </p>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
