module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFBB00", // Pastel Yellow (sunshine)
        secondary: "#2EC4B6", // Bright turquoise (whale)
        accent: "#E71D36", // Vivid red-pink (monkey, accent)
        storybg: "#FFFBEA", // Soft storybook background
        "soft-blue": "#E0ECFF",
        "pink": "#FFE0F9",
        "cloud": "#F4F6FB"
      },
      fontFamily: {
        playful: [
          '"Fredoka One"',
          '"Baloo 2"',
          '"Comic Neue"',
          "Comic Sans MS",
          "Comic Sans",
          "cursive",
          "sans-serif"
        ],
        body: [
          '"Comic Neue"',
          '"Fredoka One"',
          '"Baloo 2"',
          "Arial",
          "sans-serif"
        ]
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2.5rem",
        "full": "9999px"
      },
      boxShadow: {
        'xl': '0 7px 32px 4px rgba(207,206,255,0.18), 0 1.5px 4px 0 rgba(231,29,54,0.10)',
        '2xl': '0 7px 32px 8px rgba(236,190,255,0.16), 0 1.5px 4px 0 rgba(238,234,167,0.07), 0 0.5px 1.5px 0 rgba(44,226,214,0.17)',
      },
      keyframes: {
        bounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-26%)' },
        },
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(-15deg)' },
          '20%': { transform: 'rotate(16deg)' },
          '30%': { transform: 'rotate(-15deg)' },
          '40%': { transform: 'rotate(12deg)' },
          '50%': { transform: 'rotate(0deg)' }
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(-7deg)' },
          '35%': { transform: 'rotate(7deg)' },
          '55%': { transform: 'rotate(-6deg)' },
          '75%': { transform: 'rotate(5deg)' }
        },
        pulseGlow: {
          '0%': { boxShadow: "0 0 0 0 rgba(231,29,54, .11), 0 0 0 0 #FFD93B55" },
          '90%': { boxShadow: "0 0 16px 10px rgba(255,219,59,.16), 0 0 2px 15px #FFE0A7" },
          '100%': { boxShadow: "0 0 0 0 rgba(44,226,214,0)" }
        },
        floatCard: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-11px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        arrowBounce: {
          '0%, 40%, 100%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-16%)' },
          '60%': { transform: 'translateY(-6%)' }
        },
        startBounce: {
          '0%, 25%, 40%, 50%, 70%, 100%': { transform: 'translateY(0)' },
          '35%': { transform: 'translateY(-24px)' },
          '80%': { transform: 'translateY(-6px)' }
        },
        speechPop: {
          '0%': { transform: 'scale(0.8);', opacity: '0' },
          '90%': { transform: 'scale(1.06);', opacity: '1' },
          '100%': { transform: 'scale(1);', opacity: '1' }
        },
        blob1: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '33%': { transform: 'translateY(16px) scale(1.05)' },
          '66%': { transform: 'translateY(-10px) scale(0.95)' },
        },
        blob2: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '20%': { transform: 'translateY(-12px) scale(1.08)' },
          '70%': { transform: 'translateY(8px) scale(0.92)' },
        },
        blob3: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '45%': { transform: 'translateY(10px) scale(1.09)' },
          '80%': { transform: 'translateY(-7px) scale(0.93)' },
        }
      },
      animation: {
        bounceY: "bounceY 0.7s cubic-bezier(.77,0,0.175,1) both",
        wave: "wave 0.7s cubic-bezier(.44,0,0.54,1.22)",
        wiggle: "wiggle 0.9s 1 cubic-bezier(.55,-0.5,0.57,1.45)",
        pulseGlow: "pulseGlow 0.5s 1 cubic-bezier(.81,-0.25,0.48,1)",
        floatCard: "floatCard 2.2s ease-in-out infinite",
        arrowBounce: "arrowBounce 1.2s infinite cubic-bezier(.45,.34,0,1.01)",
        startBounce: "startBounce 2.1s infinite cubic-bezier(.66,0,0.55,1)",
        speechPop: "speechPop 0.6s",
        blob1: "blob1 9s ease-in-out infinite",
        blob2: "blob2 14s ease-in-out infinite",
        blob3: "blob3 11s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
