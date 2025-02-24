import DaisyUIPlugin from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      'primaryGreen': '#47663B',
      'secondary': '#E9EED9',
      'fontPrimary': '#355F2E',
      'third': '#85A98F',
      },
    },
  },
  plugins: [
    DaisyUIPlugin,
  ],
  daisyui: {
    themes: ["light"],
  },
}