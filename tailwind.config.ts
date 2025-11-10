import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				'50': '#eef1fe',
  				'100': '#dce3fd',
  				'200': '#c0cefb',
  				'300': '#9baef9',
  				'400': '#7a8ff5',
  				'500': '#5c70f2',
  				'600': '#4361ee',
  				'700': '#3a4cdb',
  				'800': '#3240c3',
  				'900': '#2f3a9c',
  				DEFAULT: '#4361ee',
  				foreground: '#ffffff'
  			},
  			secondary: {
  				'50': '#f5e8fa',
  				'100': '#ead1f5',
  				'200': '#d8a8eb',
  				'300': '#c17fdf',
  				'400': '#a956d3',
  				'500': '#9232c7',
  				'600': '#7209b7',
  				'700': '#5c0795',
  				'800': '#470573',
  				'900': '#36045a',
  				DEFAULT: '#7209b7',
  				foreground: '#ffffff'
  			},
  			accent: {
  				'50': '#fee8f0',
  				'100': '#fdd0e1',
  				'200': '#fba6c8',
  				'300': '#f97caf',
  				'400': '#f85296',
  				'500': '#f72585',
  				'600': '#e01e77',
  				'700': '#b91865',
  				'800': '#931353',
  				'900': '#771046',
  				DEFAULT: '#f72585',
  				foreground: '#ffffff'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			success: {
  				'50': '#ecfdf5',
  				'100': '#d1fae5',
  				'200': '#a7f3d0',
  				'300': '#6ee7b7',
  				'400': '#34d399',
  				'500': '#10b981',
  				'600': '#059669',
  				'700': '#047857',
  				'800': '#065f46',
  				'900': '#064e3b',
  				DEFAULT: '#10b981',
  				foreground: '#ffffff'
  			},
  			warning: {
  				'50': '#fffbeb',
  				'100': '#fef3c7',
  				'200': '#fde68a',
  				'300': '#fcd34d',
  				'400': '#fbbf24',
  				'500': '#f59e0b',
  				'600': '#d97706',
  				'700': '#b45309',
  				'800': '#92400e',
  				'900': '#78350f',
  				DEFAULT: '#f59e0b',
  				foreground: '#ffffff'
  			},
  			info: {
  				'50': '#eff6ff',
  				'100': '#dbeafe',
  				'200': '#bfdbfe',
  				'300': '#93c5fd',
  				'400': '#60a5fa',
  				'500': '#3b82f6',
  				'600': '#2563eb',
  				'700': '#1d4ed8',
  				'800': '#1e40af',
  				'900': '#1e3a8a',
  				DEFAULT: '#3b82f6',
  				foreground: '#ffffff'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		backgroundImage: {
  			'grid-white': 'url("data:image/svg+xml,%3csvg xmlns=\\\\\\\\"http://www.w3.org/2000/svg\\\\\\\\" viewBox=\\\\\\\\"0 0 32 32\\\\\\\\" width=\\\\\\\\"32\\\\\\\\" height=\\\\\\\\"32\\\\\\\\" fill=\\\\\\\\"none\\\\\\\\" stroke=\\\\\\\\"rgb(255 255 255 / 0.05)\\\\\\\\"%3e%3cpath d=\\\\\\\\"M0 .5H31.5V32\\\\\\\\"/%3e%3c/svg%3e")'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

