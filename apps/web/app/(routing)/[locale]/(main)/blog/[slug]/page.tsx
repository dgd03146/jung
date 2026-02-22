import { Container, Flex } from '@jung/design-system/components';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { BLOG_DEFAULTS, PostHeader } from '@/fsd/entities/blog';
import {
	createArticleSchema,
	createBreadcrumbSchema,
	getGoogleVerificationCode,
	getReadingTimeMinutes,
	getWordCount,
	SITE_URL,
	STATIC_GENERATION_LIMIT,
} from '@/fsd/shared';
import { getCaller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { JsonLd } from '@/fsd/shared/ui';
import { PostDetailContent, PostDetailContentSkeleton } from '@/fsd/views';
import {
	CommentSection,
	PostNavigation,
	PostNavigationSkeleton,
} from '@/fsd/widgets/blog';
import { type Locale, routing } from '@/i18n/routing';
import * as styles from './page.css';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
	const { slug, locale } = await params;
	try {
		const post = await getCaller().blog.getPostById({
			postId: slug,
			locale: locale as 'ko' | 'en',
		});

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
			authors: [{ name: 'JUNG', url: SITE_URL }],
			keywords: [...(post.tags || []), 'JUNG Blog', '개발 블로그'],
			alternates: {
				canonical: `${SITE_URL}/${locale}/blog/${post.id}`,
				languages: {
					en: `${SITE_URL}/en/blog/${post.id}`,
					ko: `${SITE_URL}/ko/blog/${post.id}`,
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

// Revalidate every hour for fresh content with ISR
export const revalidate = 3600;

export async function generateStaticParams() {
	const posts = await getCaller().blog.getAllPosts({
		limit: STATIC_GENERATION_LIMIT,
		sort: BLOG_DEFAULTS.SORT,
		cat: BLOG_DEFAULTS.CATEGORY,
		q: BLOG_DEFAULTS.QUERY,
	});

	const PostIds = posts.items.map((post) => post.id);

	const params = [];
	for (const locale of routing.locales) {
		for (const id of PostIds) {
			params.push({ locale, slug: String(id) });
		}
	}

	return params;
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string; locale: Locale }>;
}) {
	const { slug: postId, locale } = await params;
	setRequestLocale(locale);
	const queryClient = getQueryClient();

	const post = await getCaller().blog.getPostById({ postId, locale });
	queryClient.setQueryData(
		trpc.blog.getPostById.queryKey({ postId, locale }),
		post,
	);

	// 덜 중요한 데이터: 스트리밍
	void queryClient.prefetchQuery(
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
				wordCount: getWordCount(post.content),
				readingTimeMinutes: getReadingTimeMinutes(post.content),
				lang: locale,
			})
		: null;

	const breadcrumbSchema = createBreadcrumbSchema(
		[
			{ name: 'Home', path: '' },
			{ name: 'Blog', path: '/blog' },
			{ name: post?.title || 'Post', path: `/blog/${postId}` },
		],
		locale as 'ko' | 'en',
	);

	return (
		<>
			{articleSchema && <JsonLd data={articleSchema} />}
			<JsonLd data={breadcrumbSchema} />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Container className={styles.container}>
					{post && (
						<PostHeader
							post={{
								imagesrc: post.imagesrc,
								date: post.date,
								title: post.title,
								description: post.description,
								category: post.category,
							}}
						/>
					)}
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
