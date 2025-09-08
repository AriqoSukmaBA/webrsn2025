import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Smooth-scroll ke hash (#id) dengan kompensasi tinggi navbar & layout shift */
export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const getNavH = () =>
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
      ) || 0;

    const scrollToEl = (el) => {
      if (!el) return;
      const navH = getNavH();
      // hormati scroll-margin-top jika ada, supaya bisa fine-tune per-section
      const smt = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const extra = 12; // sedikit jarak lega di bawah navbar
      const y = el.getBoundingClientRect().top + window.scrollY - (navH + extra - smt);
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    const go = () => {
      const hash = location.hash;
      if (hash && hash.length > 1) {
        const id = decodeURIComponent(hash.slice(1));
        const el = document.getElementById(id);
        if (!el) return;

        // 3x percobaan untuk mengatasi layout shift (gambar/fonts)
        scrollToEl(el);
        setTimeout(() => scrollToEl(el), 80);
        requestAnimationFrame(() => scrollToEl(el));
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    // jalankan setelah route/hash berubah
    const t = setTimeout(go, 0);
    return () => clearTimeout(t);
  }, [location]);

  return null;
}
