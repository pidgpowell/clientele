module.exports = {
  content: ["content/**/*.md", "components/**/*.vue"],
  theme: {
    extend: {
      screens: {
        "xs": "420px",
        "3xl": "2000px",
      },
      fontFamily: {
        body: ['"Public Sans"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
