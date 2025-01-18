import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "facebook-blue": "var(--facebook-blue)",
        "facebook-hover": "var(--facebook-hover)",
        "gray-hover": "var(--gray-hover)",
      },
    },
  },
  plugins: [],
} satisfies Config;
