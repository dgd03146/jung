import { getCaller } from '@/fsd/shared/index.server';
import {
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
} from '@/fsd/shared/lib/schema/constants';

const FEED_POST_LIMIT = 50;
const CACHE_MAX_AGE_SECONDS = 3600;

export async function GET() {
	const posts = await getCaller().blog.getAllPosts({
		limit: FEED_POST_LIMIT,
		sort: 'latest',
	});

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.items
			.map(
				(post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/ko/blog/${post.id}</link>
      <guid isPermaLink="true">${SITE_URL}/ko/blog/${post.id}</guid>
      <description><![CDATA[${post.description || ''}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`,
			)
			.join('')}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': `public, max-age=${CACHE_MAX_AGE_SECONDS}, s-maxage=${CACHE_MAX_AGE_SECONDS}`,
		},
	});
}
