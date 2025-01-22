import { PostList } from '@/fsd/features';
import { HydrateClient, getCategories, trpc } from '@/fsd/shared/index.server';
import type { Metadata } from 'next';

type Sort = 'latest' | 'oldest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
	title: 'Blog',
	description: 'JUNG의 블로그에서 개발, 여행, 사진 이야기를 만나보세요.',
	openGraph: {
		title: 'JUNG (@jung) • Blog Posts',
		description: 'JUNG의 블로그에서 개발, 여행, 사진 이야기를 만나보세요.',
		type: 'website',
		siteName: 'JUNG Blog',
		locale: 'ko_KR',
		images: [
			{
				url: '/images/og/blog.jpg',
				width: 1200,
				height: 630,
				alt: 'JUNG Blog Preview',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'JUNG • Blog',
		creator: '@jung',
		description: 'JUNG의 블로그에서 개발, 여행, 사진 이야기를 만나보세요.',
		images: ['/images/og/blog.jpg'],
	},
	keywords: ['블로그', '개발', '여행', '사진', 'JUNG', '프로그래밍'],
	authors: [{ name: 'JUNG', url: 'https://your-domain.com' }],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default async function Page({ searchParams }: PageProps) {
	const cat = (searchParams.cat as string) || 'all';
	const sort = (searchParams.sort as Sort) || 'latest';
	const q = (searchParams.q as string) || '';

	void trpc.post.getAllPosts.prefetchInfinite({ limit: 9, cat, sort, q });
	const categories = await getCategories('blog');

	return (
		<HydrateClient>
			<PostList categories={categories} />
		</HydrateClient>
	);
}
