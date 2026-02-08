import { GoogleGenAI } from '@google/genai';
import { RateLimitError } from './errors.js';
import { BLOG_TRANSLATION_PROMPT, JSON_TRANSLATION_PROMPT } from './prompts.js';
import type { Locale, Translator } from './types.js';

function isRateLimitError(error: unknown): boolean {
	const message = error instanceof Error ? error.message : String(error);
	return message.includes('429') || message.includes('Resource Exhausted');
}

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
			if (isRateLimitError(error)) {
				throw new RateLimitError();
			}
			console.error('Gemini translation error:', error);
			throw new Error(
				`Translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
			);
		}
	}

	async translateJSON(json: object, from: Locale, to: Locale): Promise<object> {
		if (from === to) return json;

		// Only support ko → en for now (same as translate())
		if (from !== 'ko' || to !== 'en') {
			return json; // Return original for unsupported locale pairs
		}

		const jsonString = JSON.stringify(json, null, 2);
		const CHUNK_THRESHOLD = 2000; // Split if JSON > 2000 chars (lowered for reliability)

		// Handle array content directly (BlockNote format)
		if (jsonString.length > CHUNK_THRESHOLD && Array.isArray(json)) {
			console.log(
				`   📦 Large array detected (${jsonString.length} chars), splitting into chunks...`,
			);
			return this.translateArrayChunked(json, from, to);
		}

		// For large Tiptap content with wrapper object, split by nodes
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
			translated = translated
				.replace(/^```json\s*\n?/, '')
				.replace(/\n?```\s*$/, '')
				.trim();

			try {
				const parsed = JSON.parse(translated);

				// Verify structure is preserved - if input had wrapper, output should too
				if (
					json !== null &&
					typeof json === 'object' &&
					!Array.isArray(json) &&
					'type' in json &&
					'content' in json
				) {
					// Input was a Tiptap doc with wrapper
					if (Array.isArray(parsed)) {
						// Gemini returned just the content array, reconstruct wrapper
						console.log('   ⚠️  Reconstructing wrapper object...');
						return {
							...(json as object),
							content: parsed,
						};
					}
				}

				return parsed;
			} catch (parseError) {
				// Log the invalid JSON for debugging
				console.error('❌ Invalid JSON from Gemini:');
				console.error('First 500 chars:', translated.substring(0, 500));
				console.error(
					'Last 500 chars:',
					translated.substring(translated.length - 500),
				);
				throw parseError;
			}
		} catch (error) {
			if (isRateLimitError(error)) {
				throw new RateLimitError();
			}
			console.error('Gemini JSON translation error:', error);
			throw new Error(
				`JSON translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
			);
		}
	}

	private async translateArrayChunked(
		nodes: unknown[],
		from: Locale,
		to: Locale,
	): Promise<unknown[]> {
		const translatedNodes: unknown[] = [];

		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i] as Record<string, unknown>;
			const nodeType = node?.type as string | undefined;

			// Skip code blocks - keep them as-is
			if (nodeType === 'codeBlock') {
				console.log(
					`   ⏭️  Skipping code block (chunk ${i + 1}/${nodes.length})`,
				);
				translatedNodes.push(node);
				continue;
			}

			console.log(`   🔄 Translating chunk ${i + 1}/${nodes.length}...`);

			try {
				const translatedNode = await this.translateJSON(
					node as object,
					from,
					to,
				);
				translatedNodes.push(translatedNode);

				// Rate limit between chunks
				if (i < nodes.length - 1) {
					await new Promise((resolve) => setTimeout(resolve, 4000));
				}
			} catch {
				console.error(
					`   ⚠️  Failed to translate chunk ${i + 1}, keeping original`,
				);
				translatedNodes.push(node);
			}
		}

		return translatedNodes;
	}

	private async translateJSONChunked(
		json: { type: string; content: unknown[] },
		from: Locale,
		to: Locale,
	): Promise<object> {
		const translatedContent: unknown[] = [];

		for (let i = 0; i < json.content.length; i++) {
			const node = json.content[i] as Record<string, unknown>;
			const nodeType = node?.type as string | undefined;

			// Skip code blocks - keep them as-is
			if (nodeType === 'codeBlock') {
				console.log(
					`   ⏭️  Skipping code block (chunk ${i + 1}/${json.content.length})`,
				);
				translatedContent.push(node);
				continue;
			}

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
