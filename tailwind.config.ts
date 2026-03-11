import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                accent: "var(--accent)",
                muted: "var(--muted)",
                border: "var(--border)",
                melek: "#050505",
            },
            fontFamily: {
                serif: ["'Bodoni Moda'", "serif"],
                sans: ["'Montserrat'", "sans-serif"],
            },
            letterSpacing: {
                widest: "0.2em",
                ultra: "0.5em",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
