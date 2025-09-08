import React, { useRef, useState } from "react";
import ServiceLayout from "../ServiceLayout.jsx";

/** Kartu dengan efek tilt halus */
function TiltCard({ children }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
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

export default function GiziPage() {
  return (
    <ServiceLayout
      title="Instalasi Gizi"
      subtitle="Layanan gizi klinik untuk pasien rawat jalan & rawat inap: penilaian status gizi, dietetik, serta edukasi personal."
      heroBadges={["Nutrition Care Process", "Edukasi & Dietetik", "Kolaborasi Klinis"]}
    >
      {/* Layanan Utama */}
      <section className="reveal" aria-label="layanan-utama">
        <h2>Layanan Utama</h2>
        <div className="not-prose grid md:grid-cols-3 gap-4">
          {[
            ["Konseling Gizi Rawat Jalan", "Konsultasi individual: obesitas, diabetes, hipertensi, kolesterol, asam urat, anak & laktasi."],
            ["Dietetik Rawat Inap", "Penentuan kebutuhan energi/protein, perencanaan menu diet, monitoring & evaluasi harian."],
            ["Penilaian Status Gizi", "Assesment (SGA/MUST/NRS), antropometri, riwayat makan & kondisi klinis untuk intervensi tepat."],
            ["Terapi Nutrisi Enteral/Parenteral", "Kolaborasi dengan dokter untuk TNE/TPN sesuai indikasi & keamanan pasien."],
            ["Edukasi Pasien & Keluarga", "Materi visual & lembar diet praktis agar mudah diterapkan di rumah."],
            ["Perencanaan Menu", "Standardisasi menu RS, siklus menu, uji organoleptik & kontrol mutu dapur gizi."],
          ].map(([t, d]) => (
            <TiltCard key={t}>
              <div className="rounded-3xl border border-orange-200 bg-white/80 backdrop-blur-sm p-5 hover:shadow-md transition">
                <div className="text-[11px] font-semibold tracking-wide text-orange-700 uppercase mb-1">
                  Instalasi Gizi
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t}</h3>
                <p className="mt-1 text-sm text-slate-700">{d}</p>
                <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Alur Layanan */}
      <section className="mt-10 reveal" aria-label="alur">
        <h2>Alur Layanan Konseling</h2>
        <ol className="not-prose grid md:grid-cols-4 gap-4">
          {[
            ["1. Registrasi", "Daftar di loket / via WA & pilih 'Konseling Gizi'."],
            ["2. Assesment", "Pengukuran, riwayat makan, & penilaian klinis."],
            ["3. Intervensi", "Penentuan kebutuhan & perencanaan diet."],
            ["4. Edukasi & Kontrol", "Materi pulang + jadwal kontrol bila diperlukan."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
              <h3 className="font-semibold text-slate-900">{t}</h3>
              <p className="text-sm text-slate-700 mt-1">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Varian Diet */}
      <section className="mt-10 reveal" aria-label="jenis-diet">
        <h2>Jenis Diet yang Tersedia</h2>
        <div className="not-prose flex flex-wrap gap-2">
          {[
            "Diabetes (DM)", "Rendah Garam (Hipertensi)", "Rendah Lemak/Kolesterol",
            "Rendah Purin (Asam Urat)", "Rendah Protein (Ginjal)", "Liver",
            "Lunak/Cair", "Balita & Anak", "Laktasi", "Malnutrisi",
          ].map((d) => (
            <span
              key={d}
              className="rounded-full border border-orange-300 bg-orange-50 text-orange-700 text-xs px-3 py-1"
            >
              {d}
            </span>
          ))}
        </div>
      </section>

      {/* Jadwal & Kontak */}
      <section id="jadwal" className="mt-10 reveal" aria-label="jadwal">
        <h2>Jadwal & Lokasi</h2>
        <div className="not-prose grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Jam Konseling</h3>
            <ul className="mt-2 text-sm text-slate-700 space-y-1">
              <li>Senin–Jumat: 08.00–14.00</li>
              <li>Sabtu: 08.00–12.00</li>
              <li>Minggu/Libur: sesuai kebutuhan klinis rawat inap</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5">
            <h3 className="font-semibold">Lokasi</h3>
            <p className="text-sm text-slate-700 mt-1">
              Gedung Pelayanan, lantai 1 — ruang Konseling Gizi / Dapur Gizi RS Nindhita.
            </p>
            <a
              href="https://wa.me/6281232780511"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-2xl bg-[var(--rs-accent)] text-white font-semibold hover:bg-[var(--rs-accent-700)]"
            >
              Tanya via WhatsApp
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M3 21l1.5-4A8.5 8.5 0 1 1 21 12a8.5 8.5 0 0 1-12.5 7.5L3 21z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10 reveal" aria-label="faq">
        <h2>Pertanyaan Umum</h2>
        <div className="not-prose space-y-3">
          <FAQItem
            q="Apakah perlu rujukan dokter untuk konseling gizi?"
            a="Tidak selalu. Untuk kasus klinis tertentu (misal TPN/TNE) konsultasi akan dikoordinasikan dengan dokter penanggung jawab."
          />
          <FAQItem
            q="Berapa lama sesi konseling?"
            a="Rata-rata 20–40 menit, tergantung kompleksitas kondisi & kebutuhan edukasi."
          />
          <FAQItem
            q="Apakah ada materi diet yang bisa dibawa pulang?"
            a="Ya, kami sediakan leaflet/menu contoh agar mudah diterapkan di rumah."
          />
        </div>
      </section>
    </ServiceLayout>
  );
}
