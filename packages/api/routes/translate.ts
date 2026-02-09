import { GeminiTranslator } from '@jung/ai-translator';
import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';

function getTranslator(): GeminiTranslator | null {
	const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
	if (!apiKey) {
		console.warn(
			'GOOGLE_GENERATIVE_AI_API_KEY not set, translations will be skipped',
		);
		return null;
	}
	return new GeminiTranslator(apiKey);
}

async function translateArray(
	translator: GeminiTranslator,
	items: string[],
): Promise<string[]> {
	const results: string[] = [];
	for (const item of items) {
		const translated = await translator.translate(item, 'ko', 'en');
		results.push(translated.trim());
	}
	return results;
}

export const translateRouter = router({
	photo: publicProcedure
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				tags: z.array(z.string()).optional(),
			}),
		)
		.mutation(async ({ input }) => {
			try {
				const translator = getTranslator();
				if (!translator) {
					return { title_en: null, description_en: null, tags_en: null };
				}

				const title_en = await translator.translate(input.title, 'ko', 'en');
				const description_en = await translator.translate(
					input.description,
					'ko',
					'en',
				);

				let tags_en: string[] | null = null;
				if (input.tags?.length) {
					tags_en = await translateArray(translator, input.tags);
				}

				return { title_en, description_en, tags_en };
			} catch (error) {
				console.error('Photo translation failed:', error);
				return { title_en: null, description_en: null, tags_en: null };
			}
		}),

	place: publicProcedure
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				address: z.string(),
				tags: z.array(z.string()).optional(),
				tips: z.array(z.string()).optional(),
			}),
		)
		.mutation(async ({ input }) => {
			try {
				const translator = getTranslator();
				if (!translator) {
					return {
						title_en: null,
						description_en: null,
						address_en: null,
						tags_en: null,
						tips_en: null,
					};
				}

				const title_en = await translator.translate(input.title, 'ko', 'en');
				const description_en = await translator.translate(
					input.description,
					'ko',
					'en',
				);
				const address_en = await translator.translate(
					input.address,
					'ko',
					'en',
				);

				let tags_en: string[] | null = null;
				if (input.tags?.length) {
					tags_en = await translateArray(translator, input.tags);
				}

				let tips_en: string[] | null = null;
				if (input.tips?.length) {
					tips_en = await translateArray(translator, input.tips);
				}

				return { title_en, description_en, address_en, tags_en, tips_en };
			} catch (error) {
				console.error('Place translation failed:', error);
				return {
					title_en: null,
					description_en: null,
					address_en: null,
					tags_en: null,
					tips_en: null,
				};
			}
		}),
});
