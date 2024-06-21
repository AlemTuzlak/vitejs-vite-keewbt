import { visit } from "unist-util-visit"

export default () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (tree: any) => {
		visit(tree, "element", (element) => {
			if (["ol", "ul"].includes(element.tagName)) {
				element.properties.role = "list"
			}
		})
	}
}
