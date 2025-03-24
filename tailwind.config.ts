import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: "#E25319",
      },
      animation: {
        glow: "glow 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 10px #E25319" },
          "50%": { boxShadow: "0 0 30px #E25319" },
          "100%": { boxShadow: "0 0 10px #E25319" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
