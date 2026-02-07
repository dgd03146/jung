import { GeminiTranslator } from '@jung/ai-translator';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Lazy initialization - only create translator when API key is available
let translator: GeminiTranslator | null = null;

function getTranslator(): GeminiTranslator | null {
	if (!apiKey) {
		console.warn('VITE_GEMINI_API_KEY not set, translations will be skipped');
		return null;
	}
	if (!translator) {
		translator = new GeminiTranslator(apiKey);
	}
	return translator;
}

export interface PhotoTranslation {
	title_en: string | null;
	description_en: string | null;
	tags_en: string[] | null;
}

export interface PlaceTranslation extends PhotoTranslation {
	address_en: string | null;
	tips_en: string[] | null;
}

/**
 * Translate photo content from Korean to English
 * Returns null values if translation fails (graceful degradation)
 */
export async function translatePhoto(input: {
	title: string;
	description: string;
	tags?: string[];
}): Promise<PhotoTranslation> {
	const t = getTranslator();
	if (!t) {
		return { title_en: null, description_en: null, tags_en: null };
	}

	try {
		const title_en = await t.translate(input.title, 'ko', 'en');
		const description_en = await t.translate(input.description, 'ko', 'en');

		let tags_en: string[] | null = null;
		if (input.tags?.length) {
			tags_en = [];
			for (const tag of input.tags) {
				const translated = await t.translate(tag, 'ko', 'en');
				tags_en.push(translated.trim());
			}
		}

		return { title_en, description_en, tags_en };
	} catch (error) {
		console.warn('Photo translation failed:', error);
		return { title_en: null, description_en: null, tags_en: null };
	}
}

/**
 * Translate place content from Korean to English
 * Returns null values if translation fails (graceful degradation)
 */
export async function translatePlace(input: {
	title: string;
	description: string;
	address: string;
	tags?: string[];
	tips?: string[];
}): Promise<PlaceTranslation> {
	const t = getTranslator();
	if (!t) {
		return {
			title_en: null,
			description_en: null,
			address_en: null,
			tags_en: null,
			tips_en: null,
		};
	}

	try {
		const title_en = await t.translate(input.title, 'ko', 'en');
		const description_en = await t.translate(input.description, 'ko', 'en');
		const address_en = await t.translate(input.address, 'ko', 'en');

		let tags_en: string[] | null = null;
		if (input.tags?.length) {
			tags_en = [];
			for (const tag of input.tags) {
				const translated = await t.translate(tag, 'ko', 'en');
				tags_en.push(translated.trim());
			}
		}

		let tips_en: string[] | null = null;
		if (input.tips?.length) {
			tips_en = [];
			for (const tip of input.tips) {
				const translated = await t.translate(tip, 'ko', 'en');
				tips_en.push(translated.trim());
			}
		}

		return { title_en, description_en, address_en, tags_en, tips_en };
	} catch (error) {
		console.warn('Place translation failed:', error);
		return {
			title_en: null,
			description_en: null,
			address_en: null,
			tags_en: null,
			tips_en: null,
		};
	}
}
