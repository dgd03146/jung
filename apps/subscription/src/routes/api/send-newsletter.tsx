import { createHmac, timingSafeEqual } from 'node:crypto';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { sendNewsletter } from '../../server/newsletter';

const sendNewsletterInput = z.object({
	articleId: z.string().uuid(),
	secretKey: z.string().min(1),
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

export const Route = createFileRoute('/api/send-newsletter')({
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
					const parsed = sendNewsletterInput.safeParse(body);

					if (!parsed.success) {
						return jsonResponse(
							{ error: 'Invalid input', details: parsed.error.flatten() },
							400,
						);
					}

					const secretKey = process.env.NEWSLETTER_SECRET_KEY;
					if (!secretKey) {
						return jsonResponse(
							{ error: 'Newsletter secret key not configured' },
							500,
						);
					}

					if (!safeCompare(parsed.data.secretKey, secretKey)) {
						return jsonResponse({ error: 'Unauthorized' }, 401);
					}

					const result = await sendNewsletter(parsed.data.articleId);
					if (!result.success) {
						return jsonResponse(result, 500);
					}
					return jsonResponse(result, 200);
				} catch (error) {
					console.error('Send newsletter failed:', error);
					return jsonResponse({ error: 'Internal server error' }, 500);
				}
			},
		},
	},
});
