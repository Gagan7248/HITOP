/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'], // Docusaurus dark mode ke saath sync
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B2F87",
          dark: "#081F5C",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // IMPORTANT: Docusaurus ke apne base styles ko override hone se bachata hai
  },
};