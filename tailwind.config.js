/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md,vue}",
    "./cfg/_11ty/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      aspectRatio: {
        auto: "auto",
        box: "1",
        landscape: "4/3",
        portrait: "3/4",
        video: "16/9",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}

