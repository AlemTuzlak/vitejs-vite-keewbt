import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { z } from "zod"

const _dirname = typeof __dirname !== "undefined" ? __dirname : dirname(fileURLToPath(import.meta.url))

const FrontMatterTypeSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	alternateTitle: z.string().optional(),
	order: z.number().optional(),
	toc: z.boolean().optional(),
	hidden: z.boolean().optional(),
	slug: z.string().optional(), // auto-generated
	spacer: z.boolean().optional(), // auto-generated
	section: z.string().optional(), // auto-generated
})

const MetadataMeta = z.record(z.string(), FrontMatterTypeSchema)

const MetadataSchema = z.object({
	paths: z.record(z.string(), z.string()),
	hasIndex: z.boolean(),
	sections: z.array(z.string()),
	meta: MetadataMeta,
})

export type MetadataType = z.infer<typeof MetadataSchema>
export type MetadataMetaType = z.infer<typeof MetadataMeta>

const stripTrailingSlashes = (str: string): string => {
	return str.replace(/^\/|\/$/g, "")
}

export const getParsedMetadata = async (tag: string) => {
	const content = await readFile(resolve(_dirname, "../../", `docs/${tag}/metadata.json`), "utf-8")

	if (!content) {
		return null
	}

	return MetadataSchema.parse(JSON.parse(content))
}

export const tagHasIndex = async (tag: string) => {
	// use metadata to handle the cross-checking
	// const metadata = await getParsedMetadata(tag)
	// return metadata?.hasIndex
	// or
	return existsSync(resolve(_dirname, "../../", `docs/${tag}/_index.mdx`))
}

/**
 *
 * @param packageSlug - Slug of the package we're interested in
 * @param slug - Slug of the post we're interested in
 * @returns
 */
export const getPostContent = async (tag: string, slug: string) => {
	const metadata = await getParsedMetadata(tag)

	// If no metadata, something is inherently wrong!
	if (!metadata) {
		throw new Error("No docs metadata found! Make sure to generate a metadata for your doc docs!")
	}

	const content = await readFile(
		resolve(
			_dirname,
			"../../",
			`docs/${tag}/${slug === "/" ? "_index" : `${metadata.paths[stripTrailingSlashes(slug)]}`}.mdx`
		),
		"utf-8"
	)

	if (!content) {
		return null
	}

	return content
}

export const redirectToFirstPost = async (tag: string) => {
	const paths = (await getParsedMetadata(tag))?.paths ?? {}
	return Object.keys(paths)[0]
}

export const getFirstPost = async (tag: string) => {
	const meta = (await getParsedMetadata(tag)) ?? null
	if (!meta) {
		throw new Error("No metadata found! Make sure your version is correct!")
	}

	const paths = meta.paths ?? {}
	return meta.meta[Object.keys(paths)[0]]
}

export const getVersions = async () => {
	const content = await readFile(resolve(_dirname, "../../", "docs/versions.json"), "utf-8")

	if (!content) {
		return null
	}

	return (JSON.parse(content) as Array<{ tag: string }>).map((version) => version.tag)
}

// A better idea would be incorporating this into the metadata, but for now, this will do.
export const getPreviousAndNextRoutes = async (
	tag: string,
	slug: string
): Promise<[z.infer<typeof FrontMatterTypeSchema> | null, z.infer<typeof FrontMatterTypeSchema> | null]> => {
	const metadata = await getParsedMetadata(tag)
	const paths = metadata?.paths ?? {}
	const keys = Object.keys(paths)
	const index = keys.indexOf(stripTrailingSlashes(slug))

	const prev = index === 0 ? null : metadata?.meta[keys[index - 1]] ?? null
	const next = index === keys.length - 1 ? null : metadata?.meta[keys[index + 1]] ?? null

	return [prev, next]
}
