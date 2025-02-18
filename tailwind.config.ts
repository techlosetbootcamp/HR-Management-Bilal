import type { Config } from "tailwindcss";

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customOrange:'#E25319'
      },
    },
  },
  plugins: [],
} satisfies Config;
