import type { GenerateContentResult } from '@google/generative-ai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

interface ImproveArticleInput {
	title: string;
	summary: string;
	my_thoughts?: string | null;
}

const ImprovedArticleSchema = z.object({
	title: z.string(),
	summary: z.string(),
	my_thoughts: z.string(),
});

type ImprovedArticle = z.infer<typeof ImprovedArticleSchema>;

const GOOGLE_AI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!GOOGLE_AI_API_KEY) {
	console.warn(
		'[article] GOOGLE_GENERATIVE_AI_API_KEY is not set. AI features will not work.',
	);
}

const genAI = GOOGLE_AI_API_KEY
	? new GoogleGenerativeAI(GOOGLE_AI_API_KEY)
	: null;

export const articleService = {
	/**
	 * AI를 사용하여 아티클 내용 개선
	 */
	async improveArticle(input: ImproveArticleInput): Promise<ImprovedArticle> {
		if (!genAI) {
			throw new Error(
				'AI service is not available. GOOGLE_GENERATIVE_AI_API_KEY is not configured.',
			);
		}

		const prompt = `다음 아티클 정보를 개선해줘.
더 명확하고 간결하게 다듬되, 원래 의도는 유지해줘.
한국어로 작성해줘.

제목: ${input.title}
요약: ${input.summary}
내 생각: ${input.my_thoughts || '(없음)'}

다음 JSON 형식으로만 응답해줘:
{
  "title": "개선된 제목",
  "summary": "개선된 요약 (2-3문장)",
  "my_thoughts": "개선된 내 생각/코멘트"
}`;

		const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 30000);

		let result: GenerateContentResult;
		try {
			result = await model.generateContent(prompt, {
				signal: controller.signal,
			} as Parameters<typeof model.generateContent>[1]);
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				throw new Error('AI 요청 시간이 초과되었습니다 (30초)');
			}
			throw error;
		} finally {
			clearTimeout(timeoutId);
		}

		const text = result.response.text();

		const jsonMatch = text.match(/\{[\s\S]*?\}/);
		if (!jsonMatch) {
			throw new Error('AI 응답에서 JSON을 찾을 수 없습니다');
		}

		let parsed: unknown;
		try {
			parsed = JSON.parse(jsonMatch[0]);
		} catch {
			throw new Error('AI 응답을 JSON으로 파싱할 수 없습니다');
		}

		const validated = ImprovedArticleSchema.safeParse(parsed);
		if (!validated.success) {
			throw new Error(
				`AI 응답 형식이 올바르지 않습니다: ${validated.error.message}`,
			);
		}

		return validated.data;
	},
};
