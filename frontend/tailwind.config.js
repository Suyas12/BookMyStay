module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#E6F7F9",
          DEFAULT: "#00A4A6",
          dark: "#007B7C",
        },
        secondary: {
          light: "#FFEEE9",
          DEFAULT: "#FF6B6B",
          dark: "#CC5050",
        },
        accent: {
          light: "#FFF5E1",
          DEFAULT: "#FFC107",
          dark: "#FF9800",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        slideIn: "slideIn 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
