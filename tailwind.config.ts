import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { lime: '#A6FF00', 'lime-hover': '#C0FF33', ink: '#080908', surface: '#0C0D0B', border: '#262820' } } }, plugins: [] };
export default config;
