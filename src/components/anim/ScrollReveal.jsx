import React from "react";
import useInView from "./useInView.js";

/** Membuat anaknya fade-in + slide + tilt saat masuk viewport */
export default function ScrollReveal({
  children,
  from = "up", // "up" | "down" | "left" | "right"
  delay = 0, // ms
  distance = 24, // px
  tilt = 3, // deg (kecil biar elegan)
  className = "",
}) {
  const { ref, inView } = useInView();

  const axis = from === "left" || from === "right" ? "X" : "Y";
  const sign = from === "up" || from === "left" ? 1 : -1;
  const trans = inView ? 0 : sign * distance;
  const rotZ = from === "left" ? -tilt : from === "right" ? tilt : 0;
  const rotX = from === "up" ? tilt : from === "down" ? -tilt : 0;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate${axis}(${trans}px) rotateZ(${
          inView ? 0 : rotZ
        }deg) rotateX(${inView ? 0 : rotX}deg)`,
        opacity: inView ? 1 : 0,
        transition: `transform 700ms cubic-bezier(.2,.8,.2,1) ${delay}ms, opacity 700ms ${delay}ms`,
        willChange: "transform, opacity",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
