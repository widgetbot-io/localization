import {Localization} from "./Localization";

export class LocalizationError extends Error {
	constructor(private language: string, private key: string, private replacements?: {[key: string]: string | number}) {
		super(Localization.translate(language, key, replacements));

		Error.captureStackTrace(this, this.constructor);
	}
}
