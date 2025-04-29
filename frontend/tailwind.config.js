/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      zIndex: {
        tool: 1001,
        dialog: 3001,
        select: 3011,
        overlay: 3000,
        loading: 4000,
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        active: {
          DEFAULT: "hsl(var(--active))",
          foreground: "hsl(var(--active-foreground))",
        },
        main: {
          DEFAULT: "hsl(var(--main))",
          foreground: "hsl(var(--main-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      cursor: {
        "brush-ws": "url(/src/assets/icons/edit-map/tool-brush-ws.png) 4 4, auto",
        "brush-wm": "url(/src/assets/icons/edit-map/tool-brush-wm.png) 8 8, auto",
        "brush-wl": "url(/src/assets/icons/edit-map/tool-brush-wl.png) 10 10, auto",
        "brush-gs": "url(/src/assets/icons/edit-map/tool-brush-gs.png) 4 4, auto",
        "brush-gm": "url(/src/assets/icons/edit-map/tool-brush-gm.png) 8 8, auto",
        "brush-gl": "url(/src/assets/icons/edit-map/tool-brush-gl.png) 10 10, auto",
        "brush-bs": "url(/src/assets/icons/edit-map/tool-brush-bs.png) 4 4, auto",
        "brush-bm": "url(/src/assets/icons/edit-map/tool-brush-bm.png) 8 8, auto",
        "brush-bl": "url(/src/assets/icons/edit-map/tool-brush-bl.png) 10 10, auto",
        pen: "url(/src/assets/icons/edit-map/pen.png), auto",
      },
      backgroundImage: {
        login: "url(/src/assets/images/background.png)",
        "songYan-login": "url(/src/assets/images/songYan-background.png)",
        "th-bg": "url(/src/assets/images/th-background.png)",
        "th-triangle": "url(/src/assets/images/th-triangle.png)",
      },
      backgroundColor: {
        "tr-gray": "#EBEBEB",
      },
      textColor: {
        "th-color": "#717071",
      },
      gradientColorStops: {
        "gray-400": "#999999",
        "gray-600": "#777777",
        "indigo-500": "#7375B5",
        "blue-800": "#3D4467",
        "teal-400": "#3ABBCF",
        "blue-900": "#1A7998",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1680px",
      "4xl": "1920px",
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")({ nocompatible: true })],
}
