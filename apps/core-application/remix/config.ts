import path from "node:path"
import { glob } from "glob"
import { ensureRootRouteExists, getRouteIds, getRouteManifest } from "remix-custom-routes"

export const routes = async () => {
	const appDirectory = path.join(process.cwd(), "app")
	ensureRootRouteExists(appDirectory)
	const files = glob.sync("routes/*.{js,jsx,ts,tsx,md,mdx}", {
		cwd: appDirectory,
	})
	// Sets ($lang). prefix for each route excluding the root one so we get localization in the URL for free.
	const routeIds = getRouteIds(files, {
		indexNames: ["index", "route", "_index", "_route"],
	}).map(([id, filePath]) => [`($lang).${id}`, filePath]) as [string, string][]

	return getRouteManifest(routeIds)
}
