/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        neutral: {
          DEFAULT: 'var(--neutral)'
      },
      contrast: {
          DEFAULT: 'var(--contrast)'
      },
      brand: {
          DEFAULT: 'var(--brand)'
      },
      error: {
          DEFAULT: 'var(--error)'
      },
      warning: {
          DEFAULT: 'var(--warning)'
      },
      success: {
          DEFAULT: 'var(--success)'
      },
      text: {
          neutral: 'var(--text-neutral)',
          contrast: 'var(--text-contrast)',
          brand: 'var(--text-brand)',
          error: 'var(--text-error)',
          warning: 'var(--text-warning)',
          success: 'var(--text-success)'
      },
      icon: {
          neutral: 'var(--icon-neutral)',
          contrast: 'var(--icon-contrast)',
          brand: 'var(--icon-brand)',
          error: 'var(--icon-error)',
          warning: 'var(--icon-warning)',
          success: 'var(--icon-success)'
      },
      stroke: {
          neutral: {
              strong: 'var(--stroke-neutral-strong)',
              weak: 'var(--stroke-neutral-weak)'
          },
          contrast: {
              strong: 'var(--stroke-contrast-strong)',
              weak: 'var(--stroke-contrast-weak)'
          },
          brand: {
              strong: 'var(--stroke-brand-strong)',
              weak: 'var(--stroke-brand-weak)'
          },
          error: {
              strong: 'var(--stroke-error-strong)',
              weak: 'var(--stroke-error-weak)'
          },
          warning: {
              strong: 'var(--stroke-warning-strong)',
              weak: 'var(--stroke-warning-weak)'
          },
          success: {
              strong: 'var(--stroke-success-strong)',
              weak: 'var(--stroke-success-weak)'
          }
      },
      transform: {
        'rotate-y-0': 'rotateY(0deg)',
        'rotate-y-180': 'rotateY(180deg)',
      },
      background: {
          neutral: 'var(--background-neutral)',
          contrast: 'var(--background-contrast)',
          brand: 'var(--background-brand)',
          error: 'var(--background-error)',
          warning: 'var(--background-warning)',
          success: 'var(--background-success)'
      },
      fill: {
          neutral: 'var(--fill-neutral)',
          contrast: 'var(--fill-contrast)',
          brand: 'var(--fill-brand)',
          error: 'var(--fill-error)',
          warning: 'var(--fill-warning)',
          success: 'var(--fill-success)'
      }
  
  },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-abg": {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          //'50%': { transform: 'scale(1.1)', 'box-shadow': '0px 2px 10px 5px rgba(0, 0, 0, 0.2)' },
        },
      },
      animation: {
        "pulse-abg": 'pulse-abg 3s infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}