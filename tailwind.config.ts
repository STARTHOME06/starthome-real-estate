import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171824",
        navy: "#1d2c42",
        gold: "#c89b43",
        sand: "#f5f2ec",
        mist: "#edf1f4",
      },
      boxShadow: {
        soft: "0 18px 55px rgba(8, 26, 45, .10)",
      },
      fontFamily: {
        sans: ["Avenir Next", "Avenir", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Iowan Old Style", "Baskerville", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
