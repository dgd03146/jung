import { Container, Flex } from '@jung/design-system/components';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BLOG_DEFAULTS, PostHeader } from '@/fsd/entities/blog';
import {
	createArticleSchema,
	createBreadcrumbSchema,
	getApiUrl,
	getGoogleVerificationCode,
	SUPPORTED_LANGS,
} from '@/fsd/shared';
import { caller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { JsonLd } from '@/fsd/shared/ui';
import { PostDetailContent, PostDetailContentSkeleton } from '@/fsd/views';
import {
	CommentSection,
	PostNavigation,
	PostNavigationSkeleton,
} from '@/fsd/widgets/blog';
import * as styles from './page.css';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	try {
		const post = await caller.blog.getPostById({ postId: slug });

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
			authors: [{ name: 'JUNG', url: getApiUrl() }],
			keywords: [...(post.tags || []), 'JUNG Blog', '개발 블로그'],
			alternates: {
				canonical: `${getApiUrl()}/blog/${post.id}`,
				languages: {
					en: `${getApiUrl()}/en/blog/${post.id}`,
					ko: `${getApiUrl()}/ko/blog/${post.id}`,
				},
			},
			verification: {
				google: getGoogleVerificationCode(),
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

export const revalidate = 21600;

export async function generateStaticParams() {
	const posts = await caller.blog.getAllPosts({
		limit: BLOG_DEFAULTS.LIMIT,
		sort: BLOG_DEFAULTS.SORT,
		cat: BLOG_DEFAULTS.CATEGORY,
		q: BLOG_DEFAULTS.QUERY,
	});

	const PostIds = posts.items.map((post) => post.id);

	const params = [];
	for (const lang of SUPPORTED_LANGS) {
		for (const id of PostIds) {
			params.push({ lang, slug: String(id) });
		}
	}

	return params;
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string; lang: string }>;
}) {
	const { slug: postId, lang } = await params;
	const queryClient = getQueryClient();

	// Fetch post data for JSON-LD schema
	const post = await caller.blog.getPostById({ postId });

	queryClient.prefetchQuery(trpc.blog.getPostById.queryOptions({ postId }));

	queryClient.prefetchQuery(
		trpc.blog.getAdjacentPosts.queryOptions({ postId }),
	);

	// Create JSON-LD schemas
	const articleSchema = post
		? createArticleSchema({
				title: post.title,
				description: post.description || undefined,
				image: post.imagesrc || undefined,
				datePublished: new Date(post.date).toISOString(),
				slug: post.id,
				tags: post.tags || undefined,
				category: post.category,
				lang,
			})
		: null;

	const breadcrumbSchema = createBreadcrumbSchema(
		[
			{ name: 'Home', path: '' },
			{ name: 'Blog', path: '/blog' },
			{ name: post?.title || 'Post', path: `/blog/${postId}` },
		],
		lang,
	);

	return (
		<>
			{articleSchema && <JsonLd data={articleSchema} />}
			<JsonLd data={breadcrumbSchema} />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Container className={styles.container}>
					<PostHeader postId={postId} />
					<Flex
						flexDirection={{ base: 'column-reverse', laptop: 'row' }}
						gap={{ base: '0', laptop: '12' }}
						marginY={{ base: '4', laptop: '10' }}
					>
						<Suspense fallback={<PostNavigationSkeleton />}>
							<PostNavigation postId={postId} />
						</Suspense>
						<Container flex={1}>
							<Suspense fallback={<PostDetailContentSkeleton />}>
								<PostDetailContent postId={postId} />
							</Suspense>
							<CommentSection postId={postId} />
						</Container>
					</Flex>
				</Container>
			</HydrationBoundary>
		</>
	);
}
