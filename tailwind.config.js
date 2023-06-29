/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wordle: {
          "0%": { transform: "rotateX(0)", background: "white" },
          "45%": { transform: "rotateX(90deg)", background: "white" },
          "55%": {
            transform: "rotateX(90deg)",
            background: "var(--background)",
          },
          "100%": { transform: "rotateX(0))", background: "var(--background)" },
        },
      },
      animation: {
        wordle: "wordle 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};
