import React from "react";
import { Link, useParams } from "react-router-dom";
import { SERVICES } from "../data/services.js";

export default function LayananDetail() {
  const { slug } = useParams();
  const svc = SERVICES.find((s) => s.slug === slug);

  if (!svc) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">Layanan tidak ditemukan</h1>
        <Link
          to="/"
          className="mt-4 inline-block text-[var(--rs-primary)] font-semibold"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-800 [--rs-primary:#F47A1F] [--rs-primary-600:#E06700] [--rs-primary-700:#B55300] [--rs-accent:#118A58] [--rs-accent-700:#0B6A44]">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link to="/" className="text-[var(--rs-primary)] font-semibold">
          ← Kembali
        </Link>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
          {svc.title}
        </h1>
        <p className="mt-2 text-slate-600">{svc.excerpt}</p>

        <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200">
          <img
            src={svc.image}
            alt={svc.title}
            loading="lazy"
            width="1200"
            height="600"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Conten dummy—silakan ganti */}
        <div className="prose max-w-none mt-6">
          <p>
            Layanan <strong>{svc.title}</strong> RS Nindhita didukung tenaga
            medis kompeten, peralatan memadai, dan alur yang ramah pasien.
            Silakan hubungi admin untuk informasi jadwal & prosedur.
          </p>
          <ul>
            <li>Jam layanan mengikuti jadwal operasional RS.</li>
            <li>Pendaftaran dilakukan di loket (tanpa booking online).</li>
            <li>Siapkan identitas & kartu asuransi (jika ada).</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
