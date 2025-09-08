import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RadiologiPage from "./pages/Radiologi";
export default function RadiologiPage() {
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const navH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
        ) || 0;
      const y = el.getBoundingClientRect().top + window.scrollY - (navH + 12);
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const Card = ({ children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {children}
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Banner/Header */}
      <section className="relative bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10 sm:py-14">
          <nav className="text-orange-100/90 text-sm mb-3">
            <Link to="/" className="hover:underline">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span>Penunjang Medik</span>
            <span className="mx-2">/</span>
            <span className="font-semibold">Instalasi Radiologi</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Instalasi Radiologi
          </h1>
          <p className="mt-2 text-orange-50 max-w-3xl">
            Layanan Radio Diagnostik & Pencitraan (Imaging) terkini untuk
            menunjang diagnosis yang presisi dan penanganan pasien yang optimal.
          </p>
        </div>
        <div
          className="absolute inset-0 bg-[url('/assets/hero-radiologi.jpg')] opacity-10 bg-cover bg-center"
          aria-hidden
        ></div>
      </section>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 mb-12">
        {/* Konten kiri */}
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <div className="p-6 sm:p-8">
              <h2 id="overview" className="text-2xl font-bold text-slate-900">
                Layanan Radiologi RS Nindhita
              </h2>
              <p className="mt-3 text-slate-700 leading-relaxed">
                Sebagai bagian integral dari layanan Penunjang Medik, Instalasi
                Radiologi RS Nindhita berkomitmen memberikan layanan{" "}
                <strong>Radio Diagnostik dan Pencitraan (Imaging)</strong>{" "}
                berbasis teknologi mutakhir dengan tim profesional. Kami
                menyediakan fasilitas modern untuk memastikan kebutuhan
                diagnostik terpenuhi dengan presisi tinggi.
              </p>
              <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-1">
                <li>
                  Teknologi pencitraan terkini & standar keselamatan radiasi.
                </li>
                <li>Tenaga medis dan radiografer tersertifikasi.</li>
                <li>
                  Sistem <em>PACS</em> untuk manajemen dan distribusi citra yang
                  cepat & aman.
                </li>
              </ul>
            </div>
          </Card>

          {/* MRI */}
          <Card>
            <div className="p-6 sm:p-8">
              <h3 id="mri" className="text-xl font-bold text-orange-700">
                MRI (Magnetic Resonance Imaging)
              </h3>
              <p className="mt-2 text-slate-700">
                Memberikan gambaran detail organ, tulang, dan jaringan lunak
                tanpa radiasi ionisasi.
              </p>
              <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-1">
                <li>
                  Resolusi tinggi untuk otak, tulang belakang, muskuloskeletal.
                </li>
                <li>Paket skrining neuro, ortopedi, onkologi.</li>
              </ul>
            </div>
          </Card>

          {/* MSCT */}
          <Card>
            <div className="p-6 sm:p-8">
              <h3 id="msct" className="text-xl font-bold text-orange-700">
                MSCT (Multi Slice CT Scan)
              </h3>
              <p className="mt-2 text-slate-700">
                Pemindaian cepat untuk evaluasi trauma, kardiovaskular, dan
                onkologi.
              </p>
            </div>
          </Card>

          {/* Angiografi */}
          <Card>
            <div className="p-6 sm:p-8">
              <h3 id="angio" className="text-xl font-bold text-orange-700">
                Angiografi Kateter (Cath Lab)
              </h3>
              <p className="mt-2 text-slate-700">
                Tindakan diagnostik & intervensi pembuluh darah.
              </p>
            </div>
          </Card>

          {/* X-Ray */}
          <Card>
            <div className="p-6 sm:p-8">
              <h3 id="xray" className="text-xl font-bold text-orange-700">
                X-Ray
              </h3>
              <p className="mt-2 text-slate-700">
                Pencitraan dasar untuk evaluasi tulang dan paru.
              </p>
            </div>
          </Card>

          {/* Mobile X-Ray */}
          <Card>
            <div className="p-6 sm:p-8">
              <h3 id="mobile" className="text-xl font-bold text-orange-700">
                Mobile Unit X-Ray
              </h3>
              <p className="mt-2 text-slate-700">
                Layanan X-Ray portabel untuk pasien rawat inap/ICU.
              </p>
            </div>
          </Card>

          {/* Panoramic */}
          <Card>
            <div className="p-6 sm:p-8">
              <h3 id="panoramic" className="text-xl font-bold text-orange-700">
                Dental Panoramic
              </h3>
              <p className="mt-2 text-slate-700">
                Pencitraan rahang & gigi menyeluruh.
              </p>
            </div>
          </Card>

          {/* Mammografi */}
          <Card>
            <div className="p-6 sm:p-8">
              <h3 id="mammografi" className="text-xl font-bold text-orange-700">
                Mammografi
              </h3>
              <p className="mt-2 text-slate-700">
                Skrining kanker payudara dengan deteksi dini.
              </p>
            </div>
          </Card>

          {/* USG */}
          <Card>
            <div className="p-6 sm:p-8">
              <h3 id="usg" className="text-xl font-bold text-orange-700">
                Ultrasonografi (USG)
              </h3>
              <p className="mt-2 text-slate-700">
                Tanpa radiasi, aman untuk kebidanan dan organ abdomen.
              </p>
            </div>
          </Card>

          {/* PACS */}
          <Card>
            <div className="p-6 sm:p-8">
              <h3 id="pacs" className="text-xl font-bold text-orange-700">
                PACS (Picture Archiving and Communication System)
              </h3>
              <p className="mt-2 text-slate-700">
                Penyimpanan dan distribusi citra digital yang cepat dan
                terintegrasi.
              </p>
            </div>
          </Card>

          {/* ESWL */}
          <Card>
            <div className="p-6 sm:p-8">
              <h3 id="eswl" className="text-xl font-bold text-orange-700">
                ESWL (Extracorporeal Shock Wave Lithotripsy)
              </h3>
              <p className="mt-2 text-slate-700">
                Terapis gelombang kejut untuk batu saluran kemih tanpa operasi.
              </p>
            </div>
          </Card>
        </div>

        {/* Sidebar kanan */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h,64px)+16px)]">
            <div className="bg-orange-700 text-white px-4 py-3 rounded-t-xl font-semibold">
              Tentang Radiologi
            </div>
            <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-slate-200 divide-y">
              {[
                { id: "overview", label: "Sekilas Radiologi" },
                { id: "mri", label: "MRI" },
                { id: "msct", label: "MSCT" },
                { id: "angio", label: "Angiografi Kateter" },
                { id: "xray", label: "X-Ray" },
                { id: "mobile", label: "Mobile Unit X-Ray" },
                { id: "panoramic", label: "Dental Panoramic" },
                { id: "mammografi", label: "Mammografi" },
                { id: "usg", label: "Ultrasonografi" },
                { id: "pacs", label: "PACS" },
                { id: "eswl", label: "ESWL" },
              ].map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block px-4 py-3 hover:bg-orange-50 text-slate-700"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <div className="font-semibold text-orange-800">
                Informasi & Pendaftaran
              </div>
              <div className="text-sm text-orange-900 mt-1">
                Senin–Sabtu 07.00–20.00 WIB
              </div>
              <div className="mt-2 flex gap-2">
                <a
                  href="tel:+6282132780511"
                  className="px-3 py-2 rounded-lg bg-orange-600 text-white text-sm hover:bg-orange-700"
                >
                  Telepon
                </a>
                <a
                  href="https://wa.me/6282132780511"
                  className="px-3 py-2 rounded-lg border border-orange-600 text-orange-700 text-sm hover:bg-orange-100"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
