import { json } from "@remix-run/node"
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"

import { getVersions } from "./.server/doc"
import { getTheme } from "./.server/theme"
import { ClientHints, getHints } from "./components/ClientHint"
import { useTheme } from "./hooks/useTheme"

import codeStyles from "./styles/code.css?url"
import documentationStyles from "./styles/documentation.css?url"
import fontsStyles from "./styles/fonts.css?url"
import tailwindStyles from "./styles/tailwind.css?url"

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: codeStyles },
	{ rel: "stylesheet", href: documentationStyles },
	{ rel: "stylesheet", href: fontsStyles },
	{ rel: "stylesheet", href: tailwindStyles },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const versions = (await getVersions()) ?? []

	return json({
		requestInfo: {
			hints: getHints(request),
			userPrefs: { theme: getTheme(request) },
		},
		versions,
	})
}

// If you want to wrap your app further or include some shared UI
function App() {
	return <Outlet />
}

export default function Document() {
	const theme = useTheme()

	return (
		<html lang="en" className={`h-full overflow-x-hidden ${theme} antialiased`}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<ClientHints />
				<Meta />
				<Links />
			</head>
			<body className="bg-background-color">
				<App />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}
