import React, { useEffect, useRef, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

/**
 * IGDPage.jsx — versi interaktif (tema oranye)
 * - Stats bar animasi
 * - Kartu fitur dengan efek tilt ringan
 * - Timeline alur penanganan
 * - Triage chips
 * - FAQ accordion
 */

function Stat({ label, value, suffix = "" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = Number(value);
    const dur = 900;
    const t0 = performance.now();
    const raf = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(start + (end - start) * eased));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [value]);
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-orange-200/70 bg-white/80 backdrop-blur-sm px-4 py-3">
      <div className="text-2xl font-extrabold text-slate-900">
        {n}
        {suffix}
      </div>
      <div className="text-[11px] font-semibold tracking-wide text-orange-700 uppercase mt-0.5">
        {label}
      </div>
    </div>
  );
}

function TiltCard({ children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(
      x * 6
    ).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="transition-transform will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-orange-50/50 rounded-2xl"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900">{q}</span>
        <span className="text-orange-600 font-bold">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-sm text-slate-700">{a}</div>}
    </div>
  );
}

export default function IGDPage() {
  return (
    <ServiceLayout
      title="IGD 24 Jam"
      subtitle="Emergency 24/7 dengan triase cepat, dokter jaga, dan akses penunjang terintegrasi."
      heroBadges={["Emergency 24/7", "Triase Cepat", "Dokter Jaga"]}
    >
      {/* STATS STRIP */}
      <section aria-label="statistik" className="reveal">
        <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat label="Respon < 5 menit" value={5} suffix="m" />
          <Stat label="Layanan" value={24} suffix="/7" />
          <Stat label="Bed IGD" value={10} />
          <Stat label="Dokter Jaga" value={5} />
        </div>
      </section>

      {/* FITUR UNGGULAN */}
      <section className="mt-8" aria-label="fitur unggulan">
        <h2>Kenapa IGD RS Nindhita?</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Alur Emergency Ringkas",
              desc: "Registrasi → Triase → Tindakan awal → Penunjang → Keputusan klinis.",
            },
            {
              title: "Ruang Resusitasi Lengkap",
              desc: "Ventilator, defibrillator, monitor multi-parameter, crash cart.",
            },
            {
              title: "Akses Penunjang Cepat",
              desc: "Lab, radiologi, dan farmasi IGD dalam satu koridor layanan.",
            },
             {
              title: "Ruang PONEK",
              desc: "ruang Instalasi Gawat Darurat (IGD) khusus yang menangani kasus gawat darurat obstetri dan neonatal (ibu hamil, persalinan, dan bayi baru lahir) secara komprehensif selama 24 jam.",
            },
          ].map((c) => (
            <TiltCard key={c.title}>
              <div className="rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5 hover:shadow-md transition">
                <div className="text-[11px] font-semibold tracking-wide text-orange-700 uppercase mb-1">
                  Emergency
                </div>
                <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-700">{c.desc}</p>
                <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* TRIASE */}
      <section className="mt-10" aria-label="triase">
        <h2>Sistem Triase</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            {
              k: "Merah",
              d: "Mengancam nyawa—ditangani segera.",
              cls: "bg-red-50 text-red-700 border-red-200",
            },
            {
              k: "Kuning",
              d: "Gawat tidak mengancam nyawa—prioritas.",
              cls: "bg-amber-50 text-amber-700 border-amber-200",
            },
            {
              k: "Hijau",
              d: "Tidak gawat—menunggu sesuai antrean.",
              cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
            },
            {
              k: "Hitam",
              d: "Meninggal—tidak ada tanda kehidupan.",
              cls: "bg-gray-100 text-gray-700 border-gray-300",
            }

          ].map((x) => (
            <div key={x.k} className={`rounded-2xl border p-5 ${x.cls}`}>
              <div className="text-xs font-semibold mb-1">TRIASE</div>
              <h3 className="font-semibold">{x.k}</h3>
              <p className="text-sm mt-1">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE ALUR */}
      <section className="mt-10" aria-label="alur penanganan">
        <h2>Alur Kedatangan & Penanganan</h2>
        <ol className="relative border-l-2 border-orange-200 pl-6 space-y-5">
          {[
            [
              "Registrasi & Triase",
              "Perawat menentukan prioritas (Merah/Kuning/Hijau).",
            ],
            [
              "Tindakan Awal",
              "Stabilisasi ABC, analgesia, imobilisasi sesuai indikasi.",
            ],
            [
              "Pemeriksaan Penunjang",
              "Laboratorium, radiologi, dan evaluasi lanjutan.",
            ],
            [
              "Keputusan Lanjut",
              "Rawat jalan, rawat inap, ICU/NICU/PICU, atau rujuk.",
            ],
          ].map(([t, d], i) => (
            <li key={t} className="reveal">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-orange-400" />
              <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4">
                <div className="text-xs font-semibold text-orange-700">
                  Langkah {i + 1}
                </div>
                <div className="font-semibold text-slate-900">{t}</div>
                <p className="text-sm text-slate-700 mt-1">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CHECKLIST */}
      <section className="mt-10" aria-label="checklist">
        <h2>Checklist Saat Datang ke IGD</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Dokumen</h3>
            <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
              <li>KTP / Identitas & Kartu JKN (bila ada)</li>
              <li>Surat rujukan (jika tersedia)</li>
              <li>Riwayat obat terakhir / alergi</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Kontak & Lainnya</h3>
            <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
              <li>Nomor keluarga yang bisa dihubungi</li>
              <li>Informasi penyakit sebelumnya</li>
              <li>Metode pembayaran (JKN/Umum)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10" aria-label="faq">
        <h2>Pertanyaan Umum</h2>
        <div className="not-prose space-y-3">
          <FAQItem
            q="Apakah IGD benar-benar buka 24 jam?"
            a="Ya, IGD beroperasi 24 jam setiap hari dengan dokter jaga dan perawat siap siaga."
          />
          <FAQItem
            q="Apakah harus bawa rujukan?"
            a="Untuk kasus gawat darurat tidak wajib rujukan. Rujukan diperlukan sesuai ketentuan JKN untuk klaim administrasi."
          />
          <FAQItem
            q="Bisakah keluarga mendampingi?"
            a="Pendampingan diatur oleh perawat sesuai kondisi klinis dan kebijakan kontrol infeksi."
          />
        </div>
      </section>
    </ServiceLayout>
  );
}
