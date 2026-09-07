import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '440px',
      },
      colors: {
        background: '#070b12',
        foreground: '#eef3ff',
        cyber: {
          dark: '#070b12',
          surface: '#0c1320',
          card: '#0c1320',
          surface2: '#111a2a',
          elevated: '#111a2a',
          accent: '#7c8cff',
          cyan: '#8cd8ff',
          green: '#78e6bc',
          lavender: '#b8a8ff',
          muted: '#758198',
          secondary: '#9ca8bc',
          border: 'rgba(255, 255, 255, 0.09)',
          'border-hover': 'rgba(124, 140, 255, 0.38)',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'DM Mono', 'monospace'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow-accent': '0 0 50px rgba(124, 140, 255, 0.18)',
        'glow-cyan': '0 0 50px rgba(140, 216, 255, 0.15)',
        'glow-green': '0 0 30px rgba(120, 230, 188, 0.2)',
        'glass-card': '0 20px 50px rgba(0, 0, 0, 0.35)',
        'glass-card-hover': '0 24px 60px rgba(0, 0, 0, 0.45), 0 0 30px rgba(124, 140, 255, 0.12)',
      },
      backgroundImage: {
        'cyber-gradient': 'radial-gradient(circle at 50% 0%, rgba(124, 140, 255, 0.12), transparent 50%)',
        'cyber-radial': 'radial-gradient(circle at 72% 18%, rgba(99, 121, 255, 0.16), transparent 31%)',
        'grid-pattern': 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
