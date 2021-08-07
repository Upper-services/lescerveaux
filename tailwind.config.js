module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        home: "url('/images/background.png')",
        "linear-gradient":
          "linear-gradient(90deg, rgba(229,229,229,0) 0%, #e5e5e5 50%, rgba(229,229,229,0) 100%)",
      }),
    },

    fontFamily: {
      body: ["Montserrat", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
