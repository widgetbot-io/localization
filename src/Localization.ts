import {readdirSync} from "fs";
import {LanguageLoader} from "./LanguageLoader";

export class Settings {
	public languageLocation?: string;
	public extension?: string = 'json';
	public autoSetup?: boolean = true;
	public languages?: {[lang: string]: any};
	constructor(settings: Settings) {
		for (const setting in settings) {
			// @ts-ignore
			this[setting] = settings[setting];
		}
	}
}

export class Localization {
	private static settings: Settings = {};
	private static languages: {[language: string]: any} = {};

	public static async setup(settings: Settings): Promise<Localization> {
		this.settings = new Settings(settings);
		if (this.settings.languages) {
			this.languages = this.settings.languages;
		} else if (this.settings.languageLocation && this.settings.autoSetup) {
			this.languages = await LanguageLoader.loadLanguages(this.settings.languageLocation, this.settings.extension)
		}
		return Localization;
	}

	public static translate(language: string, term: string, replacements?: {[key: string]: string | number}): string {
		let lang = this.languages[language];
		console.log(this.languages);

		if (!lang) {
			if (this.languages['en'] && this.languages['en'][term]) {
				lang = this.languages['en']
			} else {
				return term;
			}
		}

		if (!replacements) return lang[term];
		let content = lang[term];

		for (const replacement in replacements) {
			content = content.replace(new RegExp(`{${replacement}`, 'g'), replacements[replacement])
		}

		return content;
	}
}
