import bosnian from "../../resources/locales/bs/common.json"
import english from "../../resources/locales/en/common.json"

const languages = ["en", "bs"] as const
export const supportedLanguages = [...languages]
type Language = (typeof languages)[number]

type Resource = {
	common: typeof english
}

export const resources: Record<Language, Resource> = {
	en: {
		common: english,
	},
	bs: {
		common: bosnian,
	},
}

export const returnLanguageIfSupported = (lang?: string): Language | undefined => {
	if (supportedLanguages.includes(lang as Language)) {
		return lang as Language
	}
	return undefined
}
