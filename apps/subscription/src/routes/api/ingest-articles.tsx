import { createHmac, timingSafeEqual } from 'node:crypto';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { runPipeline } from '../../server/pipeline';

const ingestArticlesInput = z.object({
	secretKey: z.string().min(1),
	threshold: z.number().int().min(0).max(100).optional(),
});

const HMAC_ALGORITHM = 'sha256';
const COMPARISON_HMAC_KEY = 'constant-time-comparison';

function safeCompare(a: string, b: string): boolean {
	const hmacA = createHmac(HMAC_ALGORITHM, COMPARISON_HMAC_KEY)
		.update(a)
		.digest();
	const hmacB = createHmac(HMAC_ALGORITHM, COMPARISON_HMAC_KEY)
		.update(b)
		.digest();
	return timingSafeEqual(hmacA, hmacB);
}

function jsonResponse(body: Record<string, unknown>, status: number) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

export const Route = createFileRoute('/api/ingest-articles')({
	component: () => null,
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					let body: unknown;
					try {
						body = await request.json();
					} catch {
						return jsonResponse({ error: 'Invalid JSON body' }, 400);
					}

					const parsed = ingestArticlesInput.safeParse(body);
					if (!parsed.success) {
						return jsonResponse(
							{ error: 'Invalid input', details: parsed.error.flatten() },
							400,
						);
					}

					const secretKey = process.env.NEWSLETTER_SECRET_KEY;
					if (!secretKey) {
						return jsonResponse({ error: 'Secret key not configured' }, 500);
					}

					if (!safeCompare(parsed.data.secretKey, secretKey)) {
						return jsonResponse({ error: 'Unauthorized' }, 401);
					}

					const result = await runPipeline({
						threshold: parsed.data.threshold,
					});

					return jsonResponse(
						{
							success: true,
							message: `Pipeline complete: ${result.fetched} fetched, ${result.duplicates} dupes, ${result.scored} passed, ${result.stored} stored`,
							result,
						},
						200,
					);
				} catch (error) {
					console.error('Ingest pipeline failed:', error);
					return jsonResponse({ error: 'Internal server error' }, 500);
				}
			},
		},
	},
});
