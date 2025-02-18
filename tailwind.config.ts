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
        primary: '#3490DC',
        secondary: '#FFC107',
        tertiary: '#E91E63',
        quaternary: '#F44336',
        background: '#F5F5F5',
        text: '#212121',
        error: '#F44336',
      },
    },
  },
  plugins: [],
} satisfies Config;
