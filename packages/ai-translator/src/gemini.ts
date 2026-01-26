import { GoogleGenAI } from '@google/genai';
import { BLOG_TRANSLATION_PROMPT, JSON_TRANSLATION_PROMPT } from './prompts.js';
import type { Locale, Translator } from './types.js';

export class GeminiTranslator implements Translator {
	private ai: GoogleGenAI;

	constructor(apiKey: string) {
		this.ai = new GoogleGenAI({ apiKey });
	}

	async translate(text: string, from: Locale, to: Locale): Promise<string> {
		if (from === to) return text;
		if (!text || text.trim() === '') return text;

		// Only support ko → en for now
		if (from !== 'ko' || to !== 'en') {
			throw new Error(`Translation from ${from} to ${to} not supported yet`);
		}

		try {
			const prompt = BLOG_TRANSLATION_PROMPT.replace('{text}', text);

			const response = await this.ai.models.generateContent({
				model: 'gemini-2.5-flash',
				contents: prompt,
			});

			const translated = response.text || '';

			return translated.trim();
		} catch (error) {
			console.error('Gemini translation error:', error);
			throw new Error(
				`Translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
			);
		}
	}

	async translateJSON(json: object, from: Locale, to: Locale): Promise<object> {
		if (from === to) return json;

		// Only support ko → en for now
		if (from !== 'ko' || to !== 'en') {
			throw new Error(`Translation from ${from} to ${to} not supported yet`);
		}

		try {
			const jsonString = JSON.stringify(json, null, 2);
			const prompt = JSON_TRANSLATION_PROMPT.replace('{json}', jsonString);

			const response = await this.ai.models.generateContent({
				model: 'gemini-2.5-flash',
				contents: prompt,
			});

			let translated = (response.text || '').trim();

			// Remove markdown code blocks if present
			translated = translated.replace(/^```json\n/, '').replace(/\n```$/, '');

			const parsed = JSON.parse(translated);
			return parsed;
		} catch (error) {
			console.error('Gemini JSON translation error:', error);
			throw new Error(
				`JSON translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
			);
		}
	}
}
