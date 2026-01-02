/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                display: ['Orbitron', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                // Antigravity original colors (keep for compatibility)
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    DEFAULT: '#0ea5e9',
                    foreground: '#ffffff',
                },
                danger: {
                    light: '#fee2e2',
                    DEFAULT: '#ef4444',
                    dark: '#991b1b',
                    foreground: '#ffffff',
                },
                warning: {
                    light: '#fed7aa',
                    DEFAULT: '#f97316',
                    dark: '#9a3412',
                    foreground: '#ffffff',
                },
                success: {
                    light: '#d1fae5',
                    DEFAULT: '#10b981',
                    dark: '#065f46',
                    foreground: '#ffffff',
                },
                // Lovable shadcn/ui colors
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
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
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
                // World Cup 2026 colors
                wc: {
                    navy: "hsl(var(--wc-navy))",
                    "navy-light": "hsl(var(--wc-navy-light))",
                    cyan: "hsl(var(--wc-cyan))",
                    "cyan-glow": "hsl(var(--wc-cyan-glow))",
                    emerald: "hsl(var(--wc-emerald))",
                    gold: "hsl(var(--wc-gold))",
                    purple: "hsl(var(--wc-purple))",
                    red: "hsl(var(--wc-red))",
                },
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
                "pulse-glow": {
                    "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
                    "50%": { opacity: "1", transform: "scale(1.05)" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "slide-up": {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-in-right": {
                    from: { opacity: "0", transform: "translateX(20px)" },
                    to: { opacity: "1", transform: "translateX(0)" },
                },
                "fade-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                "spin-slow": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                "shimmer": {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "radar-sweep": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                "scan-vertical": {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100%)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "float": "float 3s ease-in-out infinite",
                "slide-up": "slide-up 0.5s ease-out forwards",
                "slide-in-right": "slide-in-right 0.5s ease-out forwards",
                "fade-in": "fade-in 0.5s ease-out forwards",
                "spin-slow": "spin-slow 8s linear infinite",
                "shimmer": "shimmer 2s linear infinite",
                "radar-sweep": "radar-sweep 4s linear infinite",
                "scan-vertical": "scan-vertical 2s linear infinite",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
