/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*'],
  theme: {
    extend: {
      colors:{
        "primary" : "#0d6efdd9",
        "secondary" : "#706f6f"
      },
      fontFamily:{
        "poppins" : "Poppins"
      }
    },
  },
  plugins: [require("daisyui")],
}

