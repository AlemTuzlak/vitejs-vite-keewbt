import { redirect } from "@remix-run/react"

export const loader = () => {
	// To add a landing page to your docs, remove this line.
	return redirect("/docs/main")
}

export default function Index() {
	return <div />
}
