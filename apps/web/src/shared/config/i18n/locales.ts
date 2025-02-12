/*
 * Terminology
 * Locale = An identifier for a set of language and formatting preferences.
 * This usually includes the preferred language of the user and possibly their geographic region.
 * e.g. en-US: English as spoken in the United States
 */

interface ILocale {
	code: string;
	name: string;
}

export const locales: ILocale[] = [
	{ code: 'en', name: 'English' },
	{ code: 'de', name: 'Deutsch' },
	{ code: 'ru', name: 'Русский' },
	{ code: 'fr', name: 'Français' },
	{ code: 'es', name: 'Español' },
	{ code: 'it', name: 'Italiano' },
	{ code: 'ko', name: 'Korean' },
];

export const defaultLocale = locales[0]!.code;
