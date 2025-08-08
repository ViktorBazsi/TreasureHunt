// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */

const COLORS = {
  DAY: {
    TEXT: "hsl(0, 0%, 95%)", // világos szöveg fekete háttéren
    BACKGROUND: "hsl(0, 0%, 0%)", // fekete háttér

    // Fő szín: Sárga (H:45, S:94, L:75)
    PRIMARY: "hsl(45, 94%, 75%)",
    PRIMARY_LIGHT: "hsl(45, 94%, 85%)",
    PRIMARY_DARK: "hsl(45, 94%, 65%)",

    // Másodlagos szín: Sárga sötétebb árnyalatai
    SECONDARY: "hsl(45, 94%, 55%)",
    SECONDARY_LIGHT: "hsl(45, 94%, 65%)",
    SECONDARY_DARK: "hsl(45, 94%, 45%)",
    SECONDARY_DARKEST: "hsl(45, 94%, 35%)",

    // Kiemelés (accent) – élénk sárga
    ACCENT: "hsl(45, 94%, 60%)",
  },
};

// MONOCHROME verzióhoz elég a fenti COLORS-t átírni a második változatra

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 0.2s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      width: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
      minWidth: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
      height: {
        600: "600px",
        100: "25rem",
      },
      brightness: { 65: 0.65 },
      colors: {
        "c-text": COLORS.DAY.TEXT,
        "c-background": COLORS.DAY.BACKGROUND,

        "c-primary": COLORS.DAY.PRIMARY,
        "c-primary-light": COLORS.DAY.PRIMARY_LIGHT,
        "c-primary-dark": COLORS.DAY.PRIMARY_DARK,

        "c-secondary": COLORS.DAY.SECONDARY,
        "c-secondary-light": COLORS.DAY.SECONDARY_LIGHT,
        "c-secondary-dark": COLORS.DAY.SECONDARY_DARK,
        "c-secondary-darkest": COLORS.DAY.SECONDARY_DARKEST,

        "c-accent": COLORS.DAY.ACCENT,

        "c-warning": "hsl(0, 100%, 50%)",
        "c-warning-light": "hsl(0, 100%, 60%)",
        "c-warning-dark": "hsl(0, 100%, 40%)",
      },
      backgroundImage: {
        "theatron01-pattern": "url('Public/theatron01.jpg')",
        "theatron02-pattern": "url('Public/theatron02.jpg')",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg|text|border|stroke|fill)-c-(warning|primary|secondary|accent|text|background)(|-light|-dark|-darkest)$/,
      variants: ["hover", "active", "group-hover"],
    },
    { pattern: /^(stroke|fill)-(none)$/, variants: ["hover", "active"] },
    { pattern: /(gray)-(100|200|300|400|500|600|700|800|900)$/ },
    { pattern: /(black|white)$/ },
    { pattern: /^(w|h)-\d+/ },
  ],
  plugins: [],
};
