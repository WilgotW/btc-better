/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      black: "#000000",
      white: "#ffffff",
      g1: "#E5E5E5",
      g2: "#BFBFBF",
      g3: "#7E7E7E",
      b1: "#5C82AB",
      db1: "#0f0059",

      nvb: "#001F3F",
      lg: "#F5F5F5",
      active: "#007F7F",

      background: "#F5F5F5",
      main: "#F5F5F5",

      text: "#333333",

      green1: "#c54c4c",
      red1: "#6cc54c",
    },
    screens: {
      "super-small": { max: "300px" },
      mobile: { max: "940px" },
      normal: { max: "1540px" },
      large: { max: "2000px" },
      "super-large": { max: "2800px" },
    },
  },
  plugins: [],
};
