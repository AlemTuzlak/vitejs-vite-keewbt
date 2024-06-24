import { expect, test } from "@playwright/test"

test("CA has title 2", async ({ page }) => {
	await page.goto("http://localhost:3000")

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle("Core Application")
})

test("CA README link 2", async ({ page, context }) => {
	await page.goto("http://localhost:3000")
	// Click the README link.
	await page.getByText("README").click()
	// Wait for the 'page' event to be emitted when a new tab is opened.
	await context.waitForEvent("page")
	// Get the new page from the context.
	const newPage = context.pages()[1]
	// Assert the URL of the new page.
	expect(newPage.url()).toBe("https://github.com/forge42dev/base-stack")
})

test("CA Has correct Heading 2", async ({ page, context }) => {
	await page.goto("http://localhost:3000")
	await expect(
		page.getByRole("heading", {
			name: "Core Application",
		})
	).toBeVisible()
})
