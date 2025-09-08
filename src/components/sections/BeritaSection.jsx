// src/components/sections/BeritaSection.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";

/**
 * Berita & Edukasi (lokal, tanpa fetch)
 * - Kategori: Edukasi / Pengumuman
 * - Filter tag + pencarian
 * - QuickView Modal (baca ringkas) + ZOOM fullscreen
 * - Desain gen-Z
 */

/* ---------- DATA LOKAL: cover DIISI ---------- */
const ARTICLES = [
  {
    id: "edukasi-demam-anak",
    type: "Edukasi",
    title: "Pertolongan Pertama Saat Anak Demam",
    date: "2025-08-20",
    tags: ["Anak", "Demam", "Rawat Jalan"],
    excerpt:
      "Demam adalah reaksi tubuh melawan infeksi. Ketahui kapan cukup kompres-minum, dan kapan harus ke IGD.",
    cover: "/assets/berita/demam-anak.jpg",
    body: [
      "Cek suhu dengan termometer. Jika ≥ 38°C, berikan cairan lebih banyak.",
      "Kompres hangat (bukan dingin), pakaikan pakaian tipis.",
      "Konsultasi ke dokter bila demam >3 hari, anak tampak lemas, kejang, sesak napas, atau tidak mau minum.",
    ],
  },
  {
    id: "edukasi-hipertensi",
    type: "Edukasi",
    title: "Hipertensi: 5 Kebiasaan Kecil yang Efeknya Besar",
    date: "2025-08-17",
    tags: ["Dewasa", "Hipertensi", "Gaya Hidup"],
    excerpt:
      "Kurangi garam, jalan 30 menit, tidur cukup, kelola stres, dan rutin kontrol tekanan darah.",
    cover: "/assets/berita/hipertensi.jpg",
    body: [
      "Pantau tekanan darah di rumah tiap minggu.",
      "Batasi garam <5 gram/hari, perbanyak sayur & buah.",
      "Obat harus sesuai resep—jangan berhenti sendiri.",
    ],
  },
  {
    id: "edukasi-igd",
    type: "Edukasi",
    title: "Kapan Harus ke IGD? Kenali Tanda Darurat",
    date: "2025-08-10",
    tags: ["IGD", "Darurat"],
    excerpt:
      "Sesak berat, nyeri dada, penurunan kesadaran, kejang, perdarahan hebat—ini tanda ke IGD segera.",
    cover: "/assets/berita/igd-darurat.png",
    body: [
      "Bawa identitas & kartu jaminan (jika ada).",
      "Ikuti alur triase—petugas menilai tingkat kegawatan.",
      "Utamakan keselamatan, jangan menyetir sendiri jika tidak stabil.",
    ],
  },
  {
    id: "edukasi-asi",
    type: "Edukasi",
    title: "Kunci Sukses ASI Eksklusif 6 Bulan",
    date: "2025-08-05",
    tags: ["Ibu & Anak", "ASI", "Laktasi"],
    excerpt:
      "Peletakan latch yang benar, skin-to-skin, dan dukungan keluarga adalah pondasi utama.",
    cover: "/assets/berita/asi.png",
    body: [
      "Berikan ASI on-demand, hindari dot di awal bila tidak perlu.",
      "Minta bantuan konselor laktasi bila terasa nyeri atau bayi sulit melekat.",
      "Cegah mastitis dengan manajemen pompa & posisi yang tepat.",
    ],
  },
  {
    id: "edukasi-imunisasi",
    type: "Edukasi",
    title: "Panduan Imunisasi Dasar & Lanjutan",
    date: "2025-07-28",
    tags: ["Imunisasi", "Anak", "Pencegahan"],
    excerpt:
      "Lihat jadwal imunisasi dan tips persiapan sebelum datang ke poli anak.",
    cover: "/assets/berita/imunisasi.png",
    body: [
      "Bawa buku KIA, catat vaksin yang sudah & belum.",
      "Pastikan anak sehat (tidak demam tinggi) saat imunisasi.",
      "Efek samping ringan seperti demam ringan adalah wajar.",
    ],
  },
  {
    id: "pengumuman-mobile-jkn",
    type: "Pengumuman",
    title: "Pendaftaran Rawat Jalan Kini Bisa dari Mobile JKN",
    date: "2025-08-18",
    tags: ["Rawat Jalan", "Mobile JKN", "Digital"],
    excerpt:
      "Antrean lebih singkat! Daftar mandiri melalui aplikasi Mobile JKN lalu check-in di loket.",
    cover: "/assets/berita/mobile-jkn.jpg",
    body: [
      "Unduh Mobile JKN (BPJS), pilih RS Nindhita & poli tujuan.",
      "Datang sesuai jam, siapkan NIK & kartu.",
      "Bantuan tersedia di meja informasi lobby.",
    ],
  },
  {
    id: "pengumuman-campak",
    type: "Pengumuman",
    title: "Waspada Campak",
    date: "2025-09-08",
    tags: ["Waspada", "Campak"],
    excerpt:
       "Kasus Campak di Sampang capai 653 orang, Segera Periksa jika Ada Tanda-Tanda Seperti Diatas",
    cover: "/assets/berita/campak.jpeg",
    body: [
      "Gejala Umum :",
      "Demam tinggi ()>= 38^C), Ruam Merah, Batuk, Pilek, dan Mata Merah ",
      "Segera bawa ke RS Nindhita.",
    ],
  },
  {
    id: "edukasi-diabetes",
    type: "Edukasi",
    title: "Perawatan Kaki pada Diabetes",
    date: "2025-08-12",
    tags: ["Diabetes", "Perawatan Diri"],
    excerpt:
      "Cek kaki setiap hari, gunakan alas kaki yang tepat, dan segera rawat luka kecil.",
    cover: "/assets/berita/diabetes-kaki.png",
    body: [
      "Cuci & keringkan kaki terutama sela jari.",
      "Hindari memotong kuku terlalu pendek.",
      "Kontrol gula darah—penyembuhan luka butuh gula stabil.",
    ],
  },
  {
    id: "pengumuman-lab",
    type: "Pengumuman",
    title: "Informasi Puasa untuk Pemeriksaan Laboratorium",
    date: "2025-08-09",
    tags: ["Laboratorium", "Persiapan"],
    excerpt:
      "Beberapa tes (gula darah puasa, lipid) memerlukan puasa 8–12 jam. Air putih diperbolehkan.",
    cover: "/assets/berita/puasa-lab.png",
    body: [
      "Hindari kopi/teh/manis saat puasa lab.",
      "Minum obat sesuai instruksi dokter.",
      "Datang tepat waktu agar proses cepat.",
    ],
  },
];

/* ---------- UI HELPERS ---------- */
const TABS = ["Semua", "Edukasi", "Pengumuman"];

const Gradient = () => (
  <div className="h-full w-full bg-[radial-gradient(120%_120%_at_0%_0%,#FFE8D1_0%,#FFD0A6_40%,#FFB071_70%,#fff_100%)]" />
);

function classNames(...a) {
  return a.filter(Boolean).join(" ");
}

/* ---------- QUICK VIEW MODAL (dengan ZOOM) ---------- */
function Modal({ open, onClose, article }) {
  const ref = useRef(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && (zoom ? setZoom(false) : onClose?.());
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, zoom, onClose]);

  if (!open || !article) return null;

  const tgl = new Date(article.date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* Modal ringkas */}
      <div
        className="fixed inset-0 z-[80] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-3"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
      >
        <div
          ref={ref}
          className="w-full max-w-2xl overflow-hidden snap-start rounded-3xl bg-white shadow-2xl ring-1 ring-orange-100 animate-[fadeIn_.2s_ease]"
        >
          {/* COVER: tidak dipotong, tetap proporsional */}
          <div className="relative w-full bg-white">
            {article.cover ? (
              <>
                <img
                  src={article.cover}
                  alt=""
                  className="w-full h-auto max-h-[280px] object-contain bg-white"
                  onClick={() => setZoom(true)}
                />
                <button
                  type="button"
                  onClick={() => setZoom(true)}
                  className="absolute right-3 bottom-3 rounded-full bg-black/45 text-white text-xs px-2.5 py-1.5 hover:bg-black/60"
                >
                  Perbesar
                </button>
              </>
            ) : (
              <div className="h-40 w-full">
                <Gradient />
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 text-xs">
              <span
                className={classNames(
                  "inline-flex items-center rounded-full px-2 py-0.5 font-semibold",
                  article.type === "Edukasi"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-emerald-100 text-emerald-700"
                )}
              >
                {article.type}
              </span>
              <time className="text-slate-500">{tgl}</time>
            </div>

            <h3 className="mt-1 text-xl font-extrabold text-slate-900">
              {article.title}
            </h3>
            <p className="mt-2 text-slate-700">{article.excerpt}</p>

            <ul className="mt-4 list-disc pl-5 space-y-1 text-slate-700">
              {article.body?.map((p, i) => (
                <li key={i} className="leading-relaxed">
                  {p}
                </li>
              ))}
            </ul>

            {article.tags?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded-full border px-2 py-1 text-slate-600 border-slate-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="btn-ripple rounded-xl bg-[var(--rs-primary)] px-4 py-2 font-semibold text-white hover:bg-[var(--rs-primary-700)]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ZOOM fullscreen */}
      {zoom && article.cover && (
        <div
          className="fixed inset-0 z-[90]"
          onClick={() => setZoom(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative z-[91] h-full w-full flex items-center justify-center p-4">
            <img
              src={article.cover}
              alt={article.title || ""}
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <button
              type="button"
              className="absolute top-4 right-4 rounded-full bg-white/90 text-slate-900 px-3 py-1.5 text-sm font-semibold hover:bg-white"
              onClick={() => setZoom(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- UTAMA ---------- */
export default function BeritaSection() {
  const [tab, setTab] = useState("Semua");
  const [tag, setTag] = useState("Semua");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [limit, setLimit] = useState(6);

  // Kumpulan tag unik
  const allTags = useMemo(() => {
    const s = new Set();
    ARTICLES.forEach((a) => a.tags?.forEach((t) => s.add(t)));
    return ["Semua", ...Array.from(s)];
  }, []);

  // Filter + sort
  const items = useMemo(() => {
    return ARTICLES.filter((a) => (tab === "Semua" ? true : a.type === tab))
      .filter((a) => (tag === "Semua" ? true : a.tags?.includes(tag)))
      .filter((a) =>
        q.trim()
          ? (a.title + " " + a.excerpt + " " + (a.tags || []).join(" "))
              .toLowerCase()
              .includes(q.toLowerCase())
          : true
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [tab, tag, q]);

  // Inject util CSS kecil (ripple + keyframes)
  useEffect(() => {
    if (document.getElementById("news-style")) return;
    const style = document.createElement("style");
    style.id = "news-style";
    style.textContent = `
      @keyframes fadeIn { from{opacity:0; transform:translateY(6px)} to{opacity:1; transform:none} }
      .btn-ripple{position:relative;overflow:hidden}
      .btn-ripple:active::after{content:'';position:absolute;inset:auto;left:var(--x,50%);top:var(--y,50%);width:12px;height:12px;border-radius:999px;background:rgba(255,255,255,.6);transform:translate(-50%,-50%);animation:ripple .6s ease-out forwards}
      @keyframes ripple { 0%{opacity:.6; transform:translate(-50%,-50%) scale(0)} 100%{opacity:0; transform:translate(-50%,-50%) scale(12)} }
    `;
    document.head.appendChild(style);
  }, []);

  const handleOpen = (a) => {
    setActive(a);
    setOpen(true);
  };

  return (
    <section id="berita" className="max-w-7xl mx-auto px-4 py-16">
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Berita & Edukasi Kesehatan
          </h2>
          <p className="mt-1 text-slate-600">
            Kurasi informasi kesehatan dan pengumuman layanan dari RS Nindhita.
          </p>
        </div>

        {/* Cari */}
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari artikel, tag, topik…"
            className="w-64 rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/60"
          />
        </div>
      </header>

      {/* Tabs kategori */}
      <div className="flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={classNames(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              tab === t
                ? "bg-orange-600 text-white shadow"
                : "bg-orange-100 text-orange-800 hover:bg-orange-200"
            )}
          >
            {t}
          </button>
        ))}

        {/* Tag filter */}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={classNames(
                "rounded-full border px-3 py-1.5 text-xs transition",
                tag === t
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-700"
              )}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid artikel */}
      <div className="mt-6 grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-6 overflow-x-auto snap-x no-scrollbar -mx-4 px-4 md:grid-flow-row md:auto-cols-auto md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:mx-0 md:px-0">
        {items.slice(0, limit).map((a) => {
          const tgl = new Date(a.date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          return (
            <article
              key={a.id}
              className="group animate-[fadeIn_.25s_ease] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-orange-100"
            >
              {/* Visual */}
              <div className="relative h-40 w-full overflow-hidden">
                {a.cover ? (
                  <img
                    src={a.cover}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <Gradient />
                )}
                <span
                  className={classNames(
                    "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow",
                    a.type === "Edukasi"
                      ? "bg-white/90 text-orange-700"
                      : "bg-white/90 text-emerald-700"
                  )}
                >
                  {a.type}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <time className="text-xs font-semibold tracking-wide text-slate-500">
                  {tgl}
                </time>
                <h3 className="mt-1 text-base md:text-lg font-extrabold text-slate-900">
                  {a.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-700">
                  {a.excerpt}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {a.tags?.slice(0, 3).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTag(t)}
                      className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600 hover:border-orange-300 hover:text-orange-700"
                    >
                      #{t}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                      e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
                      handleOpen(a);
                    }}
                    className="btn-ripple inline-flex items-center gap-1 rounded-xl bg-[var(--rs-primary)] px-3 py-2 text-sm font-semibold text-white hover:bg-[var(--rs-primary-700)]"
                  >
                    Baca ringkas
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M13 5l7 7-7 7v-4H4v-6h9z" />
                    </svg>
                  </button>

                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-orange-700 hover:text-orange-800"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpen(a);
                    }}
                  >
                    Selengkapnya
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M13 5l7 7-7 7v-4H4v-6h9z" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-orange-200 bg-orange-50 p-10 text-center text-orange-800">
          Tidak ada artikel yang cocok dengan filter saat ini.
        </div>
      )}

      {/* Load more */}
      {items.length > limit && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setLimit((n) => n + 6)}
            className="btn-ripple rounded-2xl border border-orange-300 bg-white px-5 py-3 font-semibold text-orange-700 hover:bg-orange-50"
          >
            Tampilkan lainnya
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)} article={active} />
    </section>
  );
}
