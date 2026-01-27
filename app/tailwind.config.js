const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // შენს React ფაილებს აქ მიუთითე
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["Gravitas One", "sans-serif"],
        array: ["Array", "sans-serif"],
        khandRGL: ["KhandRGL", "sans-serif"],
        satosIT: ["Satosh-Italic", "sans-serif"],
        panchang: ["Panchang", "sans-serif"],
        panchangMD: ["PanchangMD", "sans-serif"],
        panchangSB: ["PanchangSB", "sans-serif"],
      },
    },
    screens: {
      xsxm: "350px",
      ssmm: "410px",
      ssm: "480px",
      sfm: "550px",
      smm: "650px",
      sm: "740px",
      md: "800px",
      mmd: "910px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1555px",
      xxxl: "1700px",
    },

    boxShadow: {
      input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
    },
  },
  plugins: [],
};
