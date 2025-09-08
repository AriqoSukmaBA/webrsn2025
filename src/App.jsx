import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroSlider from "./components/HeroSlider.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import { DOCTORS, DAYS, SPECS } from "./data/doctors.js";
import LayananSection from "./components/sections/LayananSection.jsx";
import BeritaSection from "./components/sections/BeritaSection.jsx";
import FasilitasSection from "./components/sections/FasilitasSection.jsx";
import BackToTop from "./components/BackToTop.jsx";
import HoverParallaxImage from "./components/HoverParallaxImage.jsx";
import DoctorCard from "./components/DoctorCard.jsx";
import ScrollReveal from "./components/anim/ScrollReveal.jsx";
import HScroller from "./components/ui/HScroller.jsx";
import TenagaKesehatan from "./components/TenagaKesehatan.jsx";
import VisiMisiAccordion from "./components/VisiMisiAccordion.jsx";
import DoctorCarousel from "./components/ui/DoctorCarousel.jsx";
import DoctorRow from "./components/ui/DoctorRow.jsx";

const ADMIN_WA_E164 = "6285385835878";
const DOCTOR_WA_E164 = "6282132780511";

const logoSrc = "/assets/logo-nindhita.png";

export default function App() {
  const [openChat, setOpenChat] = useState(false);
  // ================== Jadwal Dokter: state & filter (DEBOUNCED) ==================
  const [q, setQ] = useState("");
  const [qDebounced, setQDebounced] = useState("");
  const [day, setDay] = useState("Semua");
  const [spec, setSpec] = useState("Semua");

  // ⬇⬇⬇ TAMBAHAN: set default --nav-h supaya offset tidak 0 saat awal load
  useEffect(() => {
    const cur = getComputedStyle(document.documentElement).getPropertyValue(
      "--nav-h"
    );
    if (!cur) {
      document.documentElement.style.setProperty("--nav-h", "64px");
    }
  }, []);
  // ⬆⬆⬆ TAMBAHAN

  // debounce 250ms
  useEffect(() => {
    const t = setTimeout(() => setQDebounced(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  const filtered = useMemo(() => {
    return DOCTORS.filter((d) => {
      const byQ = qDebounced.trim()
        ? [d.name, d.spec, d.hours, ...(d.days || [])]
            .join(" ")
            .toLowerCase()
            .includes(qDebounced.toLowerCase())
        : true;
      const byDay = day === "Semua" ? true : d.days.includes(day);
      const bySpec = spec === "Semua" ? true : d.spec === spec;
      return byQ && byDay && bySpec;
    });
  }, [qDebounced, day, spec]);

  const resetFilter = () => {
    setQ("");
    setDay("Semua");
    setSpec("Semua");
  };

  // ⬇⬇⬇ TAMBAHAN: smooth-scroll fallback untuk semua <a href="#..."> di halaman
  const onAppAnchorClick = (e) => {
    const a = e.target.closest?.('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    if (href === "#") {
      e.preventDefault();
      return;
    }
    const id = href.slice(1);

    // khusus #beranda -> scroll ke atas
    if (id === "beranda") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    e.preventDefault();
    const navH =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
      ) || 0;
    const y = el.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash?.replace("#", "");
      if (!hash) return;
      if (hash === "beranda") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(hash);
      if (!el) return;
      const navH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
        ) || 0;
      const y = el.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    // on mount (selesai paint)
    setTimeout(scrollToHash, 0);
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
  // === Smooth scroll global (jalan untuk klik <a href="#...">, back/forward, dan load dgn hash) ===
  useEffect(() => {
    const getNavH = () =>
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
      ) || 0;

    const scrollToHash = () => {
      const hash = decodeURIComponent(window.location.hash || "").replace(
        "#",
        ""
      );
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - getNavH() - 8;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    // jalan saat user klik link hash (#...), saat back/forward, dan saat pertama render
    window.addEventListener("hashchange", scrollToHash);
    // jika halaman dibuka dengan URL yg sudah ada hash
    setTimeout(scrollToHash, 0);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div
      className="min-h-screen bg-white text-slate-800 [--rs-primary:#F47A1F] [--rs-primary-600:#E06700] [--rs-primary-700:#B55300] [--rs-accent:#118A58] [--rs-accent-700:#0B6A44]"
      onClick={onAppAnchorClick}
    >
      {/* Navbar (dropdown + mobile drawer) */}
      <Navbar onOpenChat={() => setOpenChat(true)} />

      {/* ===== Beranda ===== */}
      <section id="beranda" className="scroll-mt-[calc(var(--nav-h)+12px)]">
        {/* Hero Slider (smooth, dari komponenmu) */}
        <HeroSlider />
      </section>

      {/* ===== Layanan ===== */}
      <section id="layanan" className="scroll-mt-[calc(var(--nav-h)+12px)]">
        {/* Layanan (gradient + border oranye, dari komponenmu) */}
        <LayananSection />
      </section>

      {/* Tenaga Kesehatan – stat cards warna oranye */}
      <TenagaKesehatan />

      {/* Mockup bergerak saat scroll: layanan/jadwal/beranda/chat */}
      <VisiMisiAccordion
        bgSrc="/assets/rs-nindhita-building.jpg"
        doctorSrc="/assets/direktur.png"
        doctorName="dr. Abdul Kadir Munsy, Sp.An"
      />

      {/* ================== Jadwal Dokter (searchable) ================== */}
      <section
        id="dokter"
        className="max-w-7xl mx-auto px-4 py-16 scroll-mt-[calc(var(--nav-h)+12px)]"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Jadwal Dokter
        </h2>
        <p className="mt-2 text-slate-600">
          Cari dokter berdasarkan spesialisasi dan hari praktik.
        </p>

        {/* Filter */}
        <div className="mt-5 grid md:grid-cols-4 gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            className="md:col-span-2 rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--rs-accent)]"
            placeholder="Cari: nama/spesialis/jam…"
          />
          <select
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-3"
          >
            {SPECS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-3"
          >
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          Ditemukan <span className="font-semibold">{filtered.length}</span>{" "}
          dokter.
        </div>
        {/* ===== Semua dokter satu baris scroll ===== */}
        <DoctorRow
          doctors={
            Array.isArray(filtered) && filtered.length ? filtered : DOCTORS
          }
        />

        {/* Notifikasi kedatangan (opsional) */}
        <aside
          role="alert"
          aria-live="polite"
          className="mt-8 rounded-2xl border border-[var(--rs-primary)]/30 bg-[var(--rs-primary)]/5 shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[var(--rs-primary-700)]"
              fill="currentColor"
            >
              <path d="M12 2a4 4 0 0 0-4 4v1.1C6.1 8.1 5 9.9 5 12v4l-1.3 1.3A1 1 0 0 0 4.4 19h15.2a1 1 0 0 0 .7-1.7L19 16v-4c0-2.1-1.1-3.9-3-4.9V6a4 4 0 0 0-4-4zm0 20a3 3 0 0 0 2.8-2H9.2A3 3 0 0 0 12 22z" />
            </svg>
            <h3 className="font-bold text-slate-900">Pemberitahuan Penting</h3>
          </div>

          <ol className="relative border-l border-slate-200 ml-3 space-y-5">
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--rs-primary)] text-white text-xs font-bold">
                1
              </span>
              <p className="text-slate-700">
                <span className="font-medium text-slate-900">
                  Pendaftaran Rawat Jalan di Loket RS Nindhita
                </span>
                – ambil nomor antrian di area lobby.
              </p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--rs-primary)] text-white text-xs font-bold">
                2
              </span>
              <p className="text-slate-700">
                <span className="font-medium text-slate-900">
                  Datang 10 menit lebih awal
                </span>
                – untuk verifikasi & persiapan berkas.
              </p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--rs-primary)] text-white text-xs font-bold">
                3
              </span>
              <p className="text-slate-700">
                <span className="font-medium text-slate-900">
                  Siapkan dokumen
                </span>{" "}
                – KTP Asli & Kartu Asuransi (jika ada).
              </p>
            </li>
          </ol>
        </aside>
      </section>

      {/* ===== Berita ===== */}
      <section id="berita" className="scroll-mt-[calc(var(--nav-h)+12px)]">
        {/* Berita (gradient + border oranye, dari komponenmu) */}
        <BeritaSection />
      </section>

      {/* ===== Fasilitas ===== */}
      <section id="fasilitas" className="scroll-mt-[calc(var(--nav-h)+12px)]">
        {/* Fasilitas (gradient + border oranye, dari komponenmu) */}
        <FasilitasSection />
      </section>

      {/* ================== Kontak & Google Maps ================== */}
      <section
        id="kontak"
        className="max-w-7xl mx-auto px-4 py-16 scroll-mt-[calc(var(--nav-h)+12px)]"
      >
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Hubungi Kami
            </h2>
            <p className="mt-2 text-slate-600">
              Jl. Syamsul Arifin No. 87, Rw. IV, Polagan, Sampang · Jawa Timur
            </p>
            <div className="mt-4 space-y-2 text-slate-700">
              <div>
                Telp:{" "}
                <a
                  href="tel:(+62) 82132780511"
                  className="font-semibold hover:underline"
                >
                  0853-8583-5878
                </a>
              </div>
              <div>
                WhatsApp Admin:{" "}
                <a
                  href={`https://wa.me/${ADMIN_WA_E164}`}
                  className="font-semibold hover:underline"
                >
                  0853-8583-5878
                </a>
              </div>
              <div>
                Email:{" "}
                <a
                  href="mailto:rumahsakitrsnindhita@gmail.com"
                  className="font-semibold hover:underline"
                >
                  rumahsakitrsnindhita@gmail.com
                </a>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/JAWzc8LC897GfBQu6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--rs-accent)] text-white font-semibold hover:bg-[var(--rs-accent-700)]"
            >
              Buka di Google Maps
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 p-2 bg-slate-50">
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow bg-white">
              <iframe
                title="Lokasi RS Nindhita"
                src={
                  "https://www.google.com/maps?q=" +
                  encodeURIComponent(
                    "Rumah Sakit Nindhita, Jl. Syamsul Arifin No. 87, Rw. IV, Polagan, Sampang · Jawa Timur"
                  ) +
                  "&hl=id&z=17&output=embed"
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================== Footer (modern + sosmed) ================== */}
      <footer className="relative overflow-hidden bg-slate-950 text-slate-200">
        {/* subtle top border / glow */}
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--rs-primary)]/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-2 gap-8 md:grid-cols-4 overflow-visible">

          {/* Brand + tagline */}
          <div>
            <a href="#beranda" className="inline-flex items-center gap-3">
              <img
                src="/assets/logo-nindhita1.png"
                alt="Logo RS Nindhita"
                className="h-10 w-auto"
                width="150"
                height="40"
                loading="lazy"
              />
              <span className="sr-only">RS Nindhita</span>
            </a>
            <p className="mt-4 text-slate-400 leading-relaxed">
              To Become The Hospital of Choice For The Community
            </p>

            {/* Sosial Media */}
            <div className="mt-6 flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/rs_nindhita/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram RS Nindhita"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 hover:border-[var(--rs-primary)]/60 hover:bg-white/5 transition"
                title="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-slate-300 group-hover:text-white"
                >
                  <path
                    fill="currentColor"
                    d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM17.5 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"
                  />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/p/Rumah-Sakit-Nindhita-100075966866396/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook RS Nindhita"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 hover:border-[var(--rs-primary)]/60 hover:bg-white/5 transition"
                title="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-slate-300 group-hover:text-white"
                >
                  <path
                    fill="currentColor"
                    d="M22 12.07A10 10 0 1 0 10 22v-7H7v-3h3V9.5A4.5 4.5 0 0 1 14.7 5h2.3v3h-2.3A1.7 1.7 0 0 0 13 9.7V12h4l-.5 3H13v7a10 10 0 0 0 9-9.93z"
                  />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@rs.nindhita"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok RS Nindhita"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 hover:border-[var(--rs-primary)]/60 hover:bg-white/5 transition"
                title="TikTok"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-slate-300 group-hover:text-white"
                >
                  <path
                    fill="currentColor"
                    d="M20 7.5a6.5 6.5 0 0 1-4.6-1.9V16a6 6 0 1 1-6-6c.2 0 .4 0 .6.03V12.4A3.5 3.5 0 1 0 12.8 16V2h2.6a6.5 6.5 0 0 0 4.6 4.1z"
                  />
                </svg>
              </a>
            </div>
          </div>
          {/* Jam Operasional */}
          <div>
            <h3 className="text-lg font-semibold">Jam Operasional</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>IGD: 24 Jam</li>
              <li>Laboratorium: 24 Jam</li>
              <li>Farmasi: 24 Jam</li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold">Kontak</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>IGD: (+62) 82132780511</li>
              <li>Loket Pendaftaran: (+62) 85259113224</li>
              <li>VK (Bersalin): (+62) 81331617110</li>
              <li>Farmasi: (+62) 88294095578</li>
              <li>
                Email:{" "}
                <a
                  href="mailto:rumahsakitrsnindhita@gmail.com"
                  className="hover:text-white break-words"
                >
                  rumahsakitrsnindhita@gmail.com
                </a>
              </li>
              <li>
                Alamat: Jl. Syamsul Arifin No. 87, Rw. IV, Polagan, Sampang ·
                Jawa Timur
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip (simple, copyright di tengah) */}
        <div className="border-t border-slate-800/70">
          <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-slate-400 text-center">
            © {new Date().getFullYear()} Rumah Sakit Nindhita
          </div>
        </div>
      </footer>

      {/* ================== Chat widget + floating button ================== */}
      <ChatWidget
        open={openChat}
        onClose={() => setOpenChat(false)}
        adminWa={ADMIN_WA_E164}
        doctorWa={DOCTOR_WA_E164}
      />

      {!openChat && (
        <button
          onClick={() => setOpenChat(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-[var(--rs-primary)] text-white"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center">
            <img
              src="/assets/ambulance_icon.svg"
              alt="Ambulance"
              className="w-10 h-10 object-contain"
            />
          </div>
        </button>
      )}
    </div>
  );
}
