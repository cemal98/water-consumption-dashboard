import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(204, 86%, 53%)",
          foreground: "hsl(204, 96%, 96%)",
        },
        secondary: {
          DEFAULT: "hsl(206, 72%, 44%)",
          foreground: "hsl(206, 90%, 85%)",
        },
        muted: {
          DEFAULT: "hsl(210, 36%, 96%)",
          foreground: "hsl(210, 20%, 50%)",
        },
        accent: {
          DEFAULT: "hsl(197, 71%, 73%)",
          foreground: "hsl(197, 81%, 95%)",
        },
        destructive: {
          DEFAULT: "hsl(360, 82%, 62%)",
          foreground: "hsl(360, 92%, 95%)",
        },
        border: "hsl(210, 24%, 87%)",
        input: "hsl(210, 24%, 87%)",
        ring: "hsl(204, 86%, 53%)",
        chart: {
          "1": "hsl(204, 86%, 53%)",
          "2": "hsl(206, 72%, 44%)",
          "3": "hsl(197, 71%, 73%)",
          "4": "hsl(210, 36%, 96%)",
          "5": "hsl(197, 81%, 95%)",
        },
        sidebar: {
          DEFAULT: "hsl(210, 36%, 96%)",
          foreground: "hsl(210, 20%, 50%)",
          primary: "hsl(204, 86%, 53%)",
          "primary-foreground": "hsl(204, 96%, 96%)",
          accent: "hsl(197, 71%, 73%)",
          "accent-foreground": "hsl(197, 81%, 95%)",
          border: "hsl(210, 24%, 87%)",
          ring: "hsl(204, 86%, 53%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
