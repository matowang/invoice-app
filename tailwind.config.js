/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#008088",
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
	important: "#__next",
};
