import { useEffect, useState } from "react";

/**
 * Scrollspy sederhana: kembalikan id section yang sedang aktif.
 * sections: array id (tanpa '#'), mis: ["beranda","layanan","dokter","fasilitas","berita","kontak"]
 * offset: jarak top (px) untuk menghitung aktif (header tinggi)
 */
export default function useScrollSpy(sections = [], offset = 96) {
  const [active, setActive] = useState(sections[0] || null);

  useEffect(() => {
    const els = sections
      .map((id) => {
        const el = document.getElementById(id);
        return el ? { id, el } : null;
      })
      .filter(Boolean);

    const onScroll = () => {
      let current = sections[0];
      for (const s of els) {
        const rect = s.el.getBoundingClientRect();
        if (rect.top - offset <= 0) current = s.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections, offset]);

  return active;
}
