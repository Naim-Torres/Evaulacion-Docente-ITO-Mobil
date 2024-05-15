import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#eff8ff',
          200: "#bee4ff",
          300: '#91d5ff',
          400: "#5dbcfd",
          500: '#389cf9',
          600: '#5dbcfd',
          700: '#1a67db',
          800: "#1b54b2",
          900: '#1b396a'
        }
      }
    },
  },
  plugins: [],
};
export default config;
