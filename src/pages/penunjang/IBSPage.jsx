import React from "react";
import ServiceLayout from "../ServiceLayout.jsx";

export default function IBSPage() {
  return (
    <ServiceLayout
      nav="about"
      title="Instalasi Bedah Sentral (IBS)"
      subtitle="Ruang operasi terpadu dengan standar steril tinggi, keselamatan pasien, dan koordinasi multidisiplin."
      heroBadges={[
        "Sterilisasi Terpusat",
        "Keselamatan Pasien",
        "Tim Bedah & Anestesi",
      ]}
    >
      {/* Layanan Utama */}
      <section className="reveal">
        <h2>Layanan Utama</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            [
              "Bedah Elektif & Cito",
              "Penjadwalan operasi elektif dan penanganan kasus cito (darurat).",
            ],
            [
              "Anestesi Aman",
              "Pilihan anestesi umum/regional, pre-assessment & monitoring ketat.",
            ],
            [
              "Sterilisasi Instrumen",
              "CSSD dengan autoclave & indikator kimia/biologi terkontrol.",
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

      {/* Alur & Persiapan */}
      <section className="mt-8 reveal">
        <h2>Alur & Persiapan Operasi</h2>
        <ol className="not-prose relative border-l border-slate-200 ml-3 space-y-5">
          {[
            [
              "Konsultasi & Indikasi",
              "Dokter penanggung jawab menjelaskan diagnosis & indikasi operasi.",
            ],
            [
              "Persetujuan Tindakan",
              "Informed consent; edukasi risiko & manfaat.",
            ],
            [
              "Pre-Assessment Anestesi",
              "Penilaian pra-anestesi: alergi, obat, puasa, pemeriksaan penunjang.",
            ],
            [
              "Hari-H Operasi",
              "Verifikasi identitas, sisi operasi, time-out WHO, monitoring intraoperatif.",
            ],
            [
              "Pemulihan (RR)",
              "Observasi nyeri, jalan napas, hemodinamik, lalu kembali ke ruang perawatan.",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--rs-primary)] text-white text-xs font-bold">
                {i + 1}
              </span>
              <div className="font-semibold">{t}</div>
              <p className="text-sm text-slate-700">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Keselamatan */}
      <section id="keselamatan" className="mt-8 reveal">
        <h2>Keselamatan Pasien</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            [
              "Surgical Safety Checklist",
              "WHO checklist: sign-in, time-out, sign-out diterapkan konsisten.",
            ],
            [
              "Pencegahan Infeksi",
              "Hand hygiene, sterilisasi ruang & instrumen, profilaksis antibiotik sesuai indikasi.",
            ],
            [
              "Traceability",
              "Pencatatan batch sterilisasi & log perangkat untuk audit mutu.",
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
