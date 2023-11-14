/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        4: "repeat(auto-fit, 200px)",
      },
    },
  },
  plugins: [],
};
