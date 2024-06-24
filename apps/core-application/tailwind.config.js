/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./app/**/*.{ts,tsx}",
		// Pick up the component library styles as well
		"../../packages/ui/**/*.{ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
}
