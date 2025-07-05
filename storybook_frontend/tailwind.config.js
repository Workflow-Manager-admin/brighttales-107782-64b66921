module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFBB00",
        secondary: "#2EC4B6",
        accent: "#E71D36",
        storybg: "#FFFBEA"
      },
      fontFamily: {
        playful: ['"Fredoka One"', 'Comic Sans MS', 'Comic Sans', 'cursive', 'sans-serif'],
        body: ['"Fredoka One"', 'Arial', 'sans-serif']
      },
      keyframes: {
        bounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30%)' },
        },
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(-10deg)' },
          '20%': { transform: 'rotate(12deg)' },
          '30%': { transform: 'rotate(-10deg)' },
          '40%': { transform: 'rotate(9deg)' },
          '50%': { transform: 'rotate(0deg)' }
        }
      },
      animation: {
        bounceY: "bounceY 0.7s",
        wave: "wave 0.7s"
      }
    },
  },
  plugins: [],
}
