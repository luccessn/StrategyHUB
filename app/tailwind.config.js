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
  },
  plugins: [],
};
