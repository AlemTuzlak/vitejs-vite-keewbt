import { visit } from "unist-util-visit"

export default () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (tree: any) => {
		visit(tree, "element", (element) => {
			if (element.tagName === "input" && element.properties.type === "checkbox") {
				element.properties.className = "hidden"
			}
		})
	}
}
