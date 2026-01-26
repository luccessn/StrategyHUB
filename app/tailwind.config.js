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
  },
  plugins: [],
};
