/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#58e61b",
      },
      animation: {
        text: "text 2s ease infinite",
        dimlight: "dimlight 5s infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },

        dimlight: {
          "0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92%": {
            color: "red",
            boxShadow: "none",
          },
          "18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100%": {
            color: "#fff",
            textShadow: "0 0 10px #03bcf4",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".box-reflect": {
          "-webkit-box-reflect":
            "below 1px linear-gradient(transparent, #0004)",
        },
      });
    },
  ],
};
