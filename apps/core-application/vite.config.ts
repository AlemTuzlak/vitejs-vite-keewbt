import { vitePlugin as remix } from "@remix-run/dev"
import { remixDevTools } from "remix-development-tools"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { routes } from "./remix/config"

export default defineConfig({
	plugins: [remixDevTools(), remix({ routes }), tsconfigPaths()],
	ssr: {
		noExternal: ["remix-i18next"],
	},
	server: {
		open: true,
		port: 4280,
	},
})
