import { Link, useLocation } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { supportedLanguages } from "~/localization/resource"

const constructTo = (pathName: string, language: string) => {
	const languageMatch = `/${language}`
	// If the path already starts with the language, we remove it because we are switching to another language.
	if (pathName.startsWith(languageMatch)) {
		return pathName.replace(languageMatch, "")
	}
	// We return the path as is if it doesn't have a language.
	return pathName
}

const LanguageSwitcher = () => {
	const { i18n } = useTranslation()
	const location = useLocation()
	const to = constructTo(location.pathname, i18n.language)

	return (
		<div className="flex gap-2 p-2 fixed top-0 right-0 w-min z-10">
			{supportedLanguages.map((language) => (
				<Link
					className="text-blue-500 hover:underline transition-all"
					key={language}
					to={`/${language}${to}`}
					onClick={() => i18n.changeLanguage(language)}
				>
					{language}
				</Link>
			))}
		</div>
	)
}

export { LanguageSwitcher }
