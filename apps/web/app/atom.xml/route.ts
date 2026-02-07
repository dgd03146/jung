import { getCaller } from '@/fsd/shared/index.server';
import { AUTHOR, SITE_NAME, SITE_URL } from '@/fsd/shared/lib/schema/constants';

const FEED_POST_LIMIT = 50;
const CACHE_MAX_AGE_SECONDS = 3600;

export async function GET() {
	const posts = await getCaller().blog.getAllPosts({
		limit: FEED_POST_LIMIT,
		sort: 'latest',
	});

	const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_NAME}</title>
  <link href="${SITE_URL}" rel="alternate"/>
  <link href="${SITE_URL}/atom.xml" rel="self"/>
  <id>${SITE_URL}/</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>${AUTHOR.name}</name>
  </author>
  ${posts.items
		.map(
			(post) => `
  <entry>
    <title><![CDATA[${post.title}]]></title>
    <link href="${SITE_URL}/ko/blog/${post.id}" rel="alternate"/>
    <id>${SITE_URL}/ko/blog/${post.id}</id>
    <published>${new Date(post.date).toISOString()}</published>
    <updated>${new Date(post.date).toISOString()}</updated>
    <summary><![CDATA[${post.description || ''}]]></summary>
    <category term="${post.category}"/>
  </entry>`,
		)
		.join('')}
</feed>`;

	return new Response(atom, {
		headers: {
			'Content-Type': 'application/atom+xml',
			'Cache-Control': `public, max-age=${CACHE_MAX_AGE_SECONDS}, s-maxage=${CACHE_MAX_AGE_SECONDS}`,
		},
	});
}
