/*
 * Terminology
 * Locale = An identifier for a set of language and formatting preferences.
 * This usually includes the preferred language of the user and possibly their geographic region.
 * e.g. en-US: English as spoken in the United States
 */

import { routing } from '@/i18n/routing';

interface ILocale {
	code: string;
	name: string;
}

export const locales: ILocale[] = [
	{ code: 'en', name: 'English' },
	// { code: 'de', name: 'Deutsch' },
	// { code: 'ru', name: 'Русский' },
	// { code: 'fr', name: 'Français' },
	// { code: 'es', name: 'Español' },
	// { code: 'it', name: 'Italiano' },
	{ code: 'ko', name: '한국어' },
];

export const defaultLocale = routing.defaultLocale;

// Re-export from routing for backwards compatibility
export const SUPPORTED_LOCALES = routing.locales;

/** @deprecated Use SUPPORTED_LOCALES instead */
export const SUPPORTED_LANGS = SUPPORTED_LOCALES;

export type SupportedLang = (typeof routing.locales)[number];

export const LANG_DISPLAY_NAMES: Record<SupportedLang, string> = {
	ko: '한국어',
	en: 'English',
};
