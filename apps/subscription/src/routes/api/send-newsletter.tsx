import { timingSafeEqual } from 'node:crypto';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { sendNewsletter } from '../../server/newsletter';

const sendNewsletterInput = z.object({
	articleId: z.string().uuid(),
	secretKey: z.string(),
});

function safeCompare(a: string, b: string): boolean {
	const bufA = Buffer.from(a);
	const bufB = Buffer.from(b);
	if (bufA.length !== bufB.length) return false;
	return timingSafeEqual(bufA, bufB);
}

const handleSendNewsletter = createServerFn({ method: 'POST' })
	.inputValidator((data: z.infer<typeof sendNewsletterInput>) =>
		sendNewsletterInput.parse(data),
	)
	.handler(async ({ data }) => {
		const secretKey = process.env.NEWSLETTER_SECRET_KEY;
		if (!secretKey) {
			return { error: 'Newsletter secret key not configured', status: 500 };
		}

		if (!safeCompare(data.secretKey, secretKey)) {
			return { error: 'Unauthorized', status: 401 };
		}

		try {
			const result = await sendNewsletter(data.articleId);
			return { ...result, status: 200 };
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error';
			return { error: message, status: 500 };
		}
	});

export const Route = createFileRoute('/api/send-newsletter')({
	component: () => null,
});

export { handleSendNewsletter };
