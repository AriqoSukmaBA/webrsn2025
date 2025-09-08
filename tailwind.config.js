/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        rs: {
          primary: "#F47A1F",
          primary600: "#E06700",
          primary700: "#B55300",
          accent: "#118A58",
          accent700: "#0B6A44",
        },
      },
      boxShadow: {
        depth: "0 20px 40px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
