import { useEffect, useState } from "react";

const KEY = "rsn_theme"; // "soft" | "vivid"
const DEFAULT = "soft";

export function useTheme() {
  const [theme, setTheme] = useState(DEFAULT);

  // Inisialisasi dari localStorage + apply ke <html data-theme="...">
  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    const t = saved === "vivid" ? "vivid" : "soft";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "soft" ? "vivid" : "soft";
      localStorage.setItem(KEY, next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  const set = (t) => {
    const next = t === "vivid" ? "vivid" : "soft";
    localStorage.setItem(KEY, next);
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  };

  return { theme, toggle, set };
}
