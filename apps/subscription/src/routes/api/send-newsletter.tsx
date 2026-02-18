import { createHmac, timingSafeEqual } from 'node:crypto';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { sendNewsletter } from '../../server/newsletter';

const sendNewsletterInput = z.object({
	articleId: z.string().uuid(),
	secretKey: z.string(),
});

function safeCompare(a: string, b: string): boolean {
	const hmacA = createHmac('sha256', 'key').update(a).digest();
	const hmacB = createHmac('sha256', 'key').update(b).digest();
	return timingSafeEqual(hmacA, hmacB);
}

const handleSendNewsletter = createServerFn({ method: 'POST' })
	.inputValidator((data: z.infer<typeof sendNewsletterInput>) =>
		sendNewsletterInput.parse(data),
	)
	.handler(async ({ data }) => {
		const secretKey = process.env.NEWSLETTER_SECRET_KEY;
		if (!secretKey) {
			throw new Error('Newsletter secret key not configured');
		}

		if (!safeCompare(data.secretKey, secretKey)) {
			throw new Error('Unauthorized');
		}

		const result = await sendNewsletter(data.articleId);
		return result;
	});

export const Route = createFileRoute('/api/send-newsletter')({
	component: () => null,
});

export { handleSendNewsletter };
