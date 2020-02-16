import {readdirSync} from "fs";

export class LanguageLoader {
	private static async loadableLanguages(dirName: string): Promise<string[]> {
		const commands: string[] = [];
		const files = await readdirSync(`${dirName}`);

		for (const file of files) {
			if (file.endsWith('.json'))
				commands.push(`${file.split('.')[0]}`)
		}
		return commands;
	}

	static async loadLanguages(dirName: string, ext: string = 'json'): Promise<{[lang: string]: any }> {
		let languages: {[key: string]: any} = {};
		const commands = await this.loadableLanguages(dirName);

		for (const file of commands) {
			const name: string = <string>file.split('/').pop();

			languages[name] = require(`${dirName}/${file}.${ext}`);
		}

		return languages;
	}
}
