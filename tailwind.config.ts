import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#633CFF',
        hoverPrimary: '#BEADFF',
        lightPrimary: '#EFEBFF',
        black: '#333333',
        darkGrey: '#737373',
        grey: '#D9D9D9',
        lightGrey: '#FAFAFA',
        red: '#FF3939',
      },
    },
  },
  plugins: [],
};
export default config;
