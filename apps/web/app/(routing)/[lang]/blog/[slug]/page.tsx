import PostDetail from '@/fsd/features/blog/post/ui/PostDetail';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import type { Metadata } from 'next';

export async function generateMetadata({
	params,
}: {
	params: { slug: string; lang: string };
}): Promise<Metadata> {
	try {
		const post = await trpc.post.getPostById(params.slug);

		if (!post) {
			return {
				title: 'Post Not Found • JUNG',
				description: '요청하신 게시글을 찾을 수 없습니다.',
				robots: { index: false },
			};
		}

		const publishedDate = new Date(post.date).toISOString();

		return {
			title: `${post.title} • Blog`,
			description:
				post.description ||
				`JUNG의 블로그에서 "${post.title}" 포스트를 읽어보세요.`,
			openGraph: {
				title: `${post.title} • JUNG (@jung)`,
				description:
					post.description ||
					`JUNG의 블로그에서 "${post.title}" 포스트를 읽어보세요.`,
				type: 'article',
				publishedTime: publishedDate,
				authors: ['JUNG'],
				siteName: 'JUNG Blog',
				locale: 'ko_KR',
				images: [
					{
						url: post.imagesrc || '/images/og/blog-default.jpg',
						width: 1200,
						height: 630,
						alt: post.title,
					},
				],
			},
			twitter: {
				card: 'summary_large_image',
				title: `${post.title} • JUNG Blog`,
				creator: '@jung',
				description:
					post.description ||
					`JUNG의 블로그에서 "${post.title}" 포스트를 읽어보세요.`,
				images: [post.imagesrc || '/images/og/blog-default.jpg'],
			},
			authors: [{ name: 'JUNG', url: 'https://your-domain.com' }],
			keywords: [...(post.tags || []), 'JUNG Blog', '개발 블로그'],
			alternates: {
				canonical: `https://your-domain.com/blog/${post.id}`,
				languages: {
					en: `https://your-domain.com/en/blog/${post.id}`,
					ko: `https://your-domain.com/ko/blog/${post.id}`,
				},
			},
		};
	} catch (error) {
		console.error('Error generating metadata:', error);

		return {
			title: 'Blog Post • JUNG',
			description: 'JUNG의 블로그 포스트를 읽어보세요.',
			robots: { index: false },
		};
	}
}

export default async function Page({ params }: { params: { slug: string } }) {
	const postId = params.slug;

	void trpc.post.getPostById.prefetch(postId);

	return (
		<HydrateClient>
			<PostDetail postId={postId} />
		</HydrateClient>
	);
}
