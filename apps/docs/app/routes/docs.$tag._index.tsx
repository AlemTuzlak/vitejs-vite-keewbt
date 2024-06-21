import { json, redirect } from "@remix-run/node"
import type { LoaderFunctionArgs } from "@remix-run/node"

import { getFirstPost, getPostContent, redirectToFirstPost, tagHasIndex } from "~/.server/doc"
import { mdxToHtml } from "~/.server/mdx"
import { Documentation } from "~/components/layout/Documentation"

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const tag = params.tag ?? "main"
	const hasIndex = await tagHasIndex(tag)

	if (!hasIndex) {
		throw redirect(`/docs/${tag}/${await redirectToFirstPost(tag)}`)
	}

	const postContent = (await getPostContent(tag, "/")) ?? "" // handle null cases later

	const { code, frontmatter } = await mdxToHtml(postContent)
	const next = await getFirstPost(tag)

	return json({
		frontmatter,
		code,
		next,
		prev: null,
		tag,
	})
}

export default function TagRoute() {
	return <Documentation route="routes/docs.$tag._index" />
}
