import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import type { RawArticle } from './rss-fetcher';

export interface ScoredArticle extends RawArticle {
	qualityScore: number;
	scoreReason: string;
}

const ScoreResponseSchema = z.object({
	score: z.number().int().min(0).max(100),
	reason: z.string(),
});

const AI_TIMEOUT_MS = 30_000;
const BATCH_DELAY_MS = 200;

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
	if (genAI) return genAI;

	const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
	if (!apiKey) {
		throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not configured');
	}

	genAI = new GoogleGenerativeAI(apiKey);
	return genAI;
}

function buildScoringPrompt(article: RawArticle): string {
	let categoryGuidance: string;

	if (article.category === 'frontend') {
		categoryGuidance = `Frontend-specific criteria (weight these heavily):
- Contains working code examples or demos: +15
- Explains underlying browser/runtime mechanics: +15
- Covers modern patterns (React 19, CSS features, Web APIs): +10
- Performance optimization with measurable results: +10
- Accessibility or UX engineering depth: +5`;
	} else {
		categoryGuidance = `AI-specific criteria (weight these heavily):
- Practical implementation guide with code: +15
- Explains model architecture or training insights: +15
- Benchmarks or comparisons with methodology: +10
- Production deployment considerations: +10
- Novel research with clear real-world applications: +5`;
	}

	return `You are a quality scorer for "Curated by Jung", a developer newsletter targeting Korean frontend and AI engineers.
Return ONLY a JSON object, no markdown fences.

Article:
Title: ${article.title}
Summary: ${article.summary}
Source: ${article.sourceFeed}
Category: ${article.category}

Score 0-100 using these criteria:

Base quality (up to 45 points):
- Deep technical analysis over surface-level news: 0-20
- Original insight or unique perspective: 0-15
- Well-structured with clear takeaways: 0-10

${categoryGuidance}

Penalties:
- Pure product announcement with no technical depth: -20
- Listicle or "top N" without analysis: -15
- Outdated information (pre-2024 techniques without modern context): -10
- Clickbait title that summary doesn't support: -10

Score guide: 80+ must-read, 60-79 solid, 40-59 average, <40 skip.

Response format:
{"score": <0-100>, "reason": "<1-2 sentences explaining the score>"}`;
}

async function scoreArticle(article: RawArticle): Promise<ScoredArticle> {
	const model = getGenAI().getGenerativeModel({ model: 'gemini-2.0-flash' });

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

	try {
		const result = await model.generateContent(buildScoringPrompt(article), {
			signal: controller.signal,
		} as Parameters<typeof model.generateContent>[1]);

		const text = result.response.text();
		const jsonMatch = text.match(/\{[\s\S]*?\}/);

		if (!jsonMatch) {
			throw new Error('No JSON found in AI response');
		}

		const parsed = ScoreResponseSchema.parse(JSON.parse(jsonMatch[0]));

		return {
			...article,
			qualityScore: parsed.score,
			scoreReason: parsed.reason,
		};
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			throw new Error(`AI scoring timed out for: ${article.title}`);
		}
		throw error;
	} finally {
		clearTimeout(timeoutId);
	}
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function scoreArticlesBatch(
	articles: RawArticle[],
	threshold: number,
): Promise<{
	scored: ScoredArticle[];
	belowThreshold: number;
	errors: string[];
}> {
	const scored: ScoredArticle[] = [];
	const errors: string[] = [];
	let belowThreshold = 0;

	for (let i = 0; i < articles.length; i++) {
		const article = articles[i];
		try {
			const result = await scoreArticle(article);

			if (result.qualityScore >= threshold) {
				scored.push(result);
			} else {
				belowThreshold++;
			}
		} catch (error) {
			const message = `[Score] ${article.title}: ${error instanceof Error ? error.message : String(error)}`;
			errors.push(message);
			console.error(message);
		}

		if (i < articles.length - 1) {
			await delay(BATCH_DELAY_MS);
		}
	}

	return { scored, belowThreshold, errors };
}
