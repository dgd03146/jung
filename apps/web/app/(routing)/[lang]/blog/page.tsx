import { HydrateClient, getCategories, trpc } from '@/fsd/shared/index.server';
import { BlogPage } from '@/fsd/views';
import type { Metadata } from 'next';

type Sort = 'latest' | 'oldest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
	title: 'Blog',

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
			<BlogPage categories={categories} />
		</HydrateClient>
	);
}
