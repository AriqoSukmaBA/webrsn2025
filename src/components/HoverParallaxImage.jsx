import React, { useRef } from "react";

/** Gambar dengan efek bergerak halus mengikuti kursor */
export default function HoverParallaxImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  scale = 1.05,
  maxShift = 8,
  fallback = "/assets/dokter/placeholder-doctor.jpg",
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const tx = (px - 0.5) * 2 * maxShift;
    const ty = (py - 0.5) * 2 * maxShift;
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0) scale(1)";
  };

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onError={(e) => (e.currentTarget.src = fallback)}
      className={`${className} transition-transform duration-200 ease-out will-change-transform select-none`}
      draggable="false"
    />
  );
}
