import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fameca: ['BankGothic', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config