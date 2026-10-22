import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#08090B", bone: "#F3F1ED", gold: "#C9A15C", line: "rgba(255,255,255,0.12)" },
      fontFamily: { display: ["var(--font-display)", "Impact", "sans-serif"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
      maxWidth: { page: "1280px" },
    },
  },
  plugins: [],
};
export default config;
