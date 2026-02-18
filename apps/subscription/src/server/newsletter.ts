import { Resend } from 'resend';
import { SITE_CONFIG } from '../config/site';
import { fetchArticleByIdInternal } from './articles';
import { fetchActiveSubscribersInternal } from './subscribers';

let resendInstance: Resend | null = null;

function getResend() {
	if (resendInstance) return resendInstance;
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) throw new Error('RESEND_API_KEY is not set');
	resendInstance = new Resend(apiKey);
	return resendInstance;
}

function getFromEmail() {
	return (
		process.env.RESEND_EMAIL_FROM || 'noreply@jung-subscription.vercel.app'
	);
}

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function buildEmailHtml(article: {
	title: string;
	summary: string;
	category: string;
	original_url: string;
	id: string;
}) {
	const articleUrl = `${SITE_CONFIG.url}/articles/${article.id}`;
	const unsubscribeUrl = `${SITE_CONFIG.url}/unsubscribe`;
	const categoryColor = article.category === 'ai' ? '#5B86E5' : '#1a4fd8';
	const safeTitle = escapeHtml(article.title);
	const safeSummary = escapeHtml(article.summary);
	const safeCategory = escapeHtml(article.category);

	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f0f4ff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
      <div style="padding:32px;">
        <p style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:${categoryColor};margin:0 0 16px;">
          ${safeCategory}
        </p>
        <h1 style="font-size:24px;font-weight:700;color:#1a3a6e;line-height:1.3;margin:0 0 16px;">
          ${safeTitle}
        </h1>
        <p style="font-size:16px;color:#64748b;line-height:1.6;margin:0 0 24px;">
          ${safeSummary}
        </p>
        <a href="${articleUrl}" style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#1a4fd8,#5B86E5);color:white;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px;">
          Read Article →
        </a>
      </div>
    </div>
    <div style="text-align:center;padding:24px 0 0;">
      <p style="font-size:12px;color:#94a3b8;margin:0 0 8px;">
        ${escapeHtml(SITE_CONFIG.name)}
      </p>
      <a href="${unsubscribeUrl}" style="font-size:12px;color:#94a3b8;text-decoration:underline;">
        Unsubscribe
      </a>
    </div>
  </div>
</body>
</html>`;
}

export async function sendNewsletter(articleId: string) {
	const resend = getResend();
	const fromEmail = getFromEmail();

	const article = await fetchArticleByIdInternal(articleId);
	if (!article) {
		throw new Error(`Article not found: ${articleId}`);
	}

	const subscribers = await fetchActiveSubscribersInternal(article.category);

	if (subscribers.length === 0) {
		return { success: true, message: 'No active subscribers found.', sent: 0 };
	}

	const html = buildEmailHtml(article);
	const subject = `[${SITE_CONFIG.name}] ${article.title}`;

	const BATCH_SIZE = 50;
	let totalSent = 0;
	let totalFailed = 0;

	for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
		const batch = subscribers.slice(i, i + BATCH_SIZE);

		const { error } = await resend.batch.send(
			batch.map((sub: { email: string }) => ({
				from: fromEmail,
				to: sub.email,
				subject,
				html,
			})),
		);

		if (error) {
			console.error(`Batch send error (batch ${i / BATCH_SIZE}):`, error);
			totalFailed += batch.length;
		} else {
			totalSent += batch.length;
		}
	}

	const allFailed = totalSent === 0 && totalFailed > 0;

	return {
		success: !allFailed,
		message: allFailed
			? `Failed to send newsletter to all ${totalFailed} subscribers.`
			: `Newsletter sent to ${totalSent}/${subscribers.length} subscribers.`,
		sent: totalSent,
		failed: totalFailed,
	};
}
