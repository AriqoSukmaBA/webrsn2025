import { useEffect, useRef, useState } from "react";

/** Pakai untuk mengetahui kapan elemen masuk viewport (sekali saja by default) */
export default function useInView({
  root = null,
  margin = "0px 0px -10% 0px",
  once = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) obs.unobserve(el);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { root, rootMargin: margin, threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [root, margin, once]);

  return { ref, inView };
}
