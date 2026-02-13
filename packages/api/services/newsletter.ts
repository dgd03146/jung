import { TRPCError } from '@trpc/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { NewsletterEmailTemplate } from '../emails/NewsletterEmailTemplate';
import { supabase } from '../lib/supabase';

const categorySchema = z.enum(['frontend', 'ai', 'both']);

const BATCH_SIZE = 50;
const BATCH_DELAY_MS = 1000;

function getResend(): Resend | null {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) return null;
	return new Resend(apiKey);
}

function getEmailFrom(): string {
	return process.env.RESEND_EMAIL_FROM || 'Jung Archive <noreply@geojung.com>';
}

function getSiteUrl(): string {
	return (
		process.env.NEXT_PUBLIC_SITE_URL ||
		process.env.NEXT_PUBLIC_API_URL ||
		'https://www.geojung.com'
	);
}

interface SendNewsletterInput {
	articleId: string;
	testEmail?: string;
}

interface SendNewsletterResult {
	sentCount: number;
	failedCount: number;
	subscriberCount: number;
}

export const newsletterService = {
	async sendNewsletter(
		input: SendNewsletterInput,
	): Promise<SendNewsletterResult> {
		const resend = getResend();
		if (!resend) {
			throw new TRPCError({
				code: 'PRECONDITION_FAILED',
				message: 'RESEND_API_KEY is not configured.',
			});
		}

		const { articleId, testEmail } = input;

		const { data: article, error: articleError } = await supabase
			.from('articles')
			.select('*')
			.eq('id', articleId)
			.single();

		if (articleError || !article) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: `Article not found: ${articleId}`,
			});
		}

		if (!article.published_at) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Article is not published yet.',
			});
		}

		let subscriberEmails: { email: string; category: string }[];

		if (testEmail) {
			subscriberEmails = [{ email: testEmail, category: 'both' }];
		} else {
			const { data: subscribers, error: subscriberError } = await supabase
				.from('subscribers')
				.select('email, category')
				.eq('is_active', true)
				.or(
					`category.eq.${categorySchema.parse(article.category)},category.eq.both`,
				);

			if (subscriberError) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Failed to fetch subscribers: ${subscriberError.message}`,
				});
			}

			subscriberEmails = subscribers || [];
		}

		if (subscriberEmails.length === 0) {
			return { sentCount: 0, failedCount: 0, subscriberCount: 0 };
		}

		const { data: logEntry } = await supabase
			.from('newsletter_logs')
			.insert({
				article_id: articleId,
				subscriber_count: subscriberEmails.length,
				status: 'sending',
			})
			.select('id')
			.single();

		let sentCount = 0;
		let failedCount = 0;
		const emailFrom = getEmailFrom();
		const siteUrl = getSiteUrl();

		for (let i = 0; i < subscriberEmails.length; i += BATCH_SIZE) {
			const batch = subscriberEmails.slice(i, i + BATCH_SIZE);

			const results = await Promise.allSettled(
				batch.map(async (subscriber) => {
					const { error: sendError } = await resend.emails.send({
						from: emailFrom,
						to: subscriber.email,
						subject: `[${article.category.toUpperCase()}] ${article.title}`,
						react: NewsletterEmailTemplate({
							article: {
								title: article.title,
								summary: article.summary,
								my_thoughts: article.my_thoughts,
								category: article.category,
								original_url: article.original_url,
							},
							unsubscribeUrl: `${siteUrl}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`,
						}),
					});

					if (sendError) {
						throw sendError;
					}
				}),
			);

			for (const result of results) {
				if (result.status === 'fulfilled') {
					sentCount++;
				} else {
					failedCount++;
					console.error('Newsletter send failed:', result.reason);
				}
			}

			if (i + BATCH_SIZE < subscriberEmails.length) {
				await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
			}
		}

		if (logEntry?.id) {
			await supabase
				.from('newsletter_logs')
				.update({
					sent_count: sentCount,
					failed_count: failedCount,
					status: failedCount === 0 ? 'completed' : 'failed',
				})
				.eq('id', logEntry.id);
		}

		if (!testEmail) {
			await supabase
				.from('articles')
				.update({
					newsletter_sent_at: new Date().toISOString(),
					newsletter_sent_count: sentCount,
				})
				.eq('id', articleId);
		}

		return {
			sentCount,
			failedCount,
			subscriberCount: subscriberEmails.length,
		};
	},

	async getNewsletterLogs(articleId: string) {
		const { data, error } = await supabase
			.from('newsletter_logs')
			.select('*')
			.eq('article_id', articleId)
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Failed to fetch newsletter logs:', error.message);
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch newsletter logs',
			});
		}

		return data || [];
	},

	async getSubscriberStats() {
		const { data, error } = await supabase
			.from('subscribers')
			.select('category, is_active');

		if (error) {
			console.error('Failed to fetch subscriber stats:', error.message);
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'Failed to fetch subscriber stats',
			});
		}

		const all = data || [];
		const active = all.filter((s) => s.is_active);

		return {
			total: all.length,
			active: active.length,
			inactive: all.length - active.length,
			frontend: active.filter((s) => s.category === 'frontend').length,
			ai: active.filter((s) => s.category === 'ai').length,
			both: active.filter((s) => s.category === 'both').length,
		};
	},
};
