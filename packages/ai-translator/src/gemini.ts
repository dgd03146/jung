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

		const jsonString = JSON.stringify(json, null, 2);
		const CHUNK_THRESHOLD = 4000; // Split if JSON > 4000 chars

		// For large Tiptap content, split by nodes
		if (
			jsonString.length > CHUNK_THRESHOLD &&
			json !== null &&
			typeof json === 'object' &&
			!Array.isArray(json) &&
			'content' in json &&
			Array.isArray(json.content)
		) {
			console.log(
				`   📦 Large JSON detected (${jsonString.length} chars), splitting into chunks...`,
			);
			return this.translateJSONChunked(
				json as { type: string; content: unknown[] },
				from,
				to,
			);
		}

		// Regular translation for small JSON
		try {
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

	private async translateJSONChunked(
		json: { type: string; content: unknown[] },
		from: Locale,
		to: Locale,
	): Promise<object> {
		const translatedContent: unknown[] = [];

		for (let i = 0; i < json.content.length; i++) {
			const node = json.content[i];
			console.log(`   🔄 Translating chunk ${i + 1}/${json.content.length}...`);

			try {
				const translatedNode = await this.translateJSON(
					node as object,
					from,
					to,
				);
				translatedContent.push(translatedNode);

				// Rate limit between chunks
				if (i < json.content.length - 1) {
					await new Promise((resolve) => setTimeout(resolve, 4000));
				}
			} catch {
				console.error(
					`   ⚠️  Failed to translate chunk ${i + 1}, keeping original`,
				);
				translatedContent.push(node); // Keep original on error
			}
		}

		return {
			...json,
			content: translatedContent,
		};
	}
}
