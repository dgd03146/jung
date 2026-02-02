export type Locale = 'ko' | 'en';

export interface Translator {
	translate(text: string, from: Locale, to: Locale): Promise<string>;
	translateJSON(json: object, from: Locale, to: Locale): Promise<object>;
}

export interface BlogPost {
	title: string;
	description: string;
	content: string | object;
}

export interface TranslatedBlogPost {
	title_ko: string;
	title_en: string;
	description_ko: string;
	description_en: string;
	content_ko: object;
	content_en: object;
}
