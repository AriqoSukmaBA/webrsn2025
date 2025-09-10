// src/components/sections/FasilitasSection.jsx
import React from "react";
import ScrollReveal from "../anim/ScrollReveal.jsx";

/** ====== Data fasilitas ======
 * Edit/urutkan sesukamu.
 * Simpan gambar di public/assets/fasilitas/
 * - vvip-1.jpg, vvip-2.jpg, vvip-3.jpg
 * - vip-1.jpg, vip-2.jpg, ...
 */
const ITEMS = [
  {
    id: "vvip",
    name: "Kamar VVIP",
    img: "/assets/fasilitas/vvip.jpg",
    gallery: [
      "/assets/fasilitas/vvip.jpg",
      "/assets/fasilitas/vvip-1.jpg",
      "/assets/fasilitas/vvip-2.jpg",
    ],
    desc:
      "Kamar luas, sofa-bed pendamping, pantry mini, kamar mandi dalam, privasi maksimal.",
    tag: "Premium",
  },
  {
    id: "vip",
    name: "Kamar VIP",
    img: "/assets/fasilitas/vip.jpg",
    gallery: [
      "/assets/fasilitas/vip.jpg",
      "/assets/fasilitas/vip-1.jpg",
      "/assets/fasilitas/vip-2.jpg",
    ],
    desc:
      "Nyaman untuk keluarga. Dilengkapi TV, AC, dan kamar mandi dalam.",
    tag: "Nyaman",
  },
  {
    id: "kelas1",
    name: "Kamar Kelas 1",
    img: "/assets/fasilitas/kelas-1.jpg",
    gallery: [
      "/assets/fasilitas/kelas1-1.jpg",
      "/assets/fasilitas/kelas1-2.jpg",
      "/assets/fasilitas/kelas-1.jpg",
    ],
    desc: "2 tempat tidur per kamar. Tenang dan representatif.",
    tag: "2 Bed",
  },
  {
    id: "kelas2",
    name: "Kamar Kelas 2",
    img: "/assets/fasilitas/kelas-2.jpg",
    gallery: [
      "/assets/fasilitas/kelas-2.jpg",
      "/assets/fasilitas/kelas2-1.jpg",
      "/assets/fasilitas/kelas2-2.jpg",
    ],
    desc:
      "3 tempat tidur, sirkulasi udara & kebersihan terjaga.",
    tag: "3 Bed",
  },
  {
    id: "kelas3",
    name: "Kamar Kelas 3",
    img: "/assets/fasilitas/kelas-3.jpg",
    gallery: [
      "/assets/fasilitas/kelas-3.jpg",
      "/assets/fasilitas/kelas3-1.jpg",
      "/assets/fasilitas/kelas3-2.jpg",
    ],
    desc:
      "Pilihan ekonomis dengan standar keselamatan yang sama.",
    tag: "Hemat",
  },
  {
    id: "mushola",
    name: "Mushola",
    img: "/assets/fasilitas/mushola.jpg",
    gallery: [
      "/assets/fasilitas/mushola.jpg",
      "/assets/fasilitas/mushola-1.jpg",
      "/assets/fasilitas/mushola-2.jpg",
    ],
    desc: "Ruang ibadah bersih setiap lantai. Mukena & sajadah tersedia.",
    tag: "Ibadah",
  },
  {
    id: "ruang-tunggu",
    name: "Ruang Tunggu",
    img: "/assets/fasilitas/ruang-tunggu.jpg",
    gallery: [
      "/assets/fasilitas/ruang-tunggu.jpg",
      "/assets/fasilitas/ruangtunggu-1.jpg",
      "/assets/fasilitas/ruangtunggu-2.jpg",
    ],
    
    desc:
      "Lega & nyaman, dekat loket informasi dan kiosk antrian.",
    tag: "Nyaman",
  },
   {
    id: "ambulance",
    name: "Ambulance dan Pemulasaran Jenazah",
    img: "/assets/fasilitas/ambulance.jpg",
    gallery: [
      "/assets/fasilitas/ambulance.jpg",
      "/assets/fasilitas/ambulance-1.jpg",
      "/assets/fasilitas/ambulance-2.jpg",
    ],
    
    desc:
      "Ambulance selau siap 24 Jam.",
    tag: "24 Jam",
  },
    {
    id: "isolasi",
    name: "Ruang Isolasi",
    img: "/assets/fasilitas/isolasi.jpg",
    gallery: [
      "/assets/fasilitas/isolasi.jpg",
      "/assets/fasilitas/isolasi-1.jpg",
      "/assets/fasilitas/isolasi-2.jpg",
    ],
    
    desc:
      "ruangan khusus yang didesain untuk merawat pasien dengan penyakit menular guna mencegah penyebaran infeksi kepada pasien lain, petugas kesehatan, dan pengunjung.",
    tag: "khusus",
  },
  
];

const FallbackGradient = () => (
  <div className="h-full w-full bg-[radial-gradient(120%_120%_at_0%_0%,#FFE8D1_0%,#FFD0A6_40%,#FFB071_70%,#fff_100%)]" />
);

/* ====== Modal Galeri (max 3 foto) ====== */
function GalleryModal({ open, onClose, item, startIndex = 0 }) {
  const [idx, setIdx] = React.useState(startIndex);
  const wrapRef = React.useRef(null);
  const startX = React.useRef(null);

  const pics = React.useMemo(() => {
    const arr =
      (item?.gallery && item.gallery.length
        ? item.gallery
        : (item?.img ? [item.img] : [])) || [];
    return arr.slice(0, 3); // batas 3
  }, [item]);

  React.useEffect(() => {
    if (!open) return;
    setIdx(startIndex);
  }, [open, startIndex]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % pics.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + pics.length) % pics.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, pics.length, onClose]);

  if (!open || !item) return null;

  const onTouchStart = (e) => {
    startX.current = e.touches?.[0]?.clientX ?? null;
  };
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? startX.current;
    const delta = endX - startX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) setIdx((i) => (i + 1) % pics.length);
      else setIdx((i) => (i - 1 + pics.length) % pics.length);
    }
    startX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={wrapRef}
        className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden bg-black/30 ring-1 ring-white/10"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-white"
        >
          Tutup
        </button>

        {/* Caption */}
        <div className="absolute left-0 right-0 top-3 mx-auto w-max px-3 py-1.5 rounded-full bg-white/85 text-xs font-semibold text-slate-900">
          {item.name} · {idx + 1}/{pics.length}
        </div>

        {/* Nav */}
        {pics.length > 1 && (
          <>
            <button
              onClick={() => setIdx((i) => (i - 1 + pics.length) % pics.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 text-slate-900 hover:bg-white"
              aria-label="Sebelumnya"
              title="Sebelumnya"
            >
              ‹
            </button>
            <button
              onClick={() => setIdx((i) => (i + 1) % pics.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 text-slate-900 hover:bg-white"
              aria-label="Berikutnya"
              title="Berikutnya"
            >
              ›
            </button>
          </>
        )}

        {/* Image area */}
        <div className="h-full w-full grid place-items-center">
          {pics[idx] ? (
            <img
              src={pics[idx]}
              alt={item.name}
              className="max-h-[78vh] max-w-[95%] object-contain rounded-md shadow-2xl"
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="h-full w-full grid place-items-center">
              <FallbackGradient />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ====== Kartu ====== */
function Card({ f, onOpen }) {
  return (
    <article
      className="group relative overflow-hidden snap-start rounded-3xl border border-slate-200 bg-white shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:shadow-xl hover:ring-orange-100 cursor-pointer"
      onClick={onOpen}
      aria-label={f.name}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" ? onOpen() : null)}
    >
      {/* ambience */}
      <div
        className="pointer-events-none absolute -inset-10 -z-10 opacity-0 blur-2xl transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 10% 10%, rgba(244,122,31,.20), transparent 60%)",
        }}
      />

      {/* Visual */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {f.img ? (
          <img
            src={f.img}
            alt={f.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <FallbackGradient />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/0 via-black/0 to-black/5" />
        {f.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-orange-700 shadow">
            {f.tag}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-extrabold text-slate-900">{f.name}</h3>
        {f.desc && (
          <p className="mt-1 text-sm leading-relaxed text-slate-700 line-clamp-2">
            {f.desc}
          </p>
        )}
        <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
      </div>
    </article>
  );
}

export default function FasilitasSection() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(null);

  // dekor mesh halus
  return (
    <section id="fasilitas" className="relative max-w-7xl mx-auto px-4 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(40% 30% at 10% 10%, rgba(255,180,120,.18), transparent 70%), radial-gradient(30% 40% at 90% 20%, rgba(255,140,60,.12), transparent 70%)",
        }}
      />

      <ScrollReveal from="up">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Fasilitas
        </h2>
      </ScrollReveal>
      <ScrollReveal from="up" delay={80}>
        <p className="mt-2 text-slate-600">
          Pilihan kamar rawat & sarana penunjang yang nyaman—dirancang untuk
          pengalaman pasien dan keluarga yang lebih baik.
        </p>
      </ScrollReveal>

      <div className="mt-6 grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-5 overflow-x-auto snap-x no-scrollbar -mx-4 px-4 md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:overflow-visible md:mx-0 md:px-0">
        {ITEMS.map((f, i) => (
          <ScrollReveal key={f.id} from="up" delay={i * 70}>
            <Card
              f={f}
              onOpen={() => {
                setActive(f);
                setOpen(true);
              }}
            />
          </ScrollReveal>
        ))}
      </div>

      {/* Modal Galeri */}
      <GalleryModal
        open={open}
        onClose={() => setOpen(false)}
        item={active}
        startIndex={0}
      />
    </section>
  );
}
