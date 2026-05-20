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
        bg: "#F7F7F7",
        ink: "#333333",
        muted: "#8C8680",
        accent: "#B8B0A8",
        "accent-blue": "#8FA3B1",
      },
      fontFamily: {
        sans:      ["var(--font-poppins)", "system-ui", "sans-serif"],
        poppins:   ["var(--font-poppins)", "system-ui", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        serif:     ["var(--font-cormorant)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
