import type { MetadataRoute } from 'next';
import { getCaller } from '@/fsd/shared/index.server';
import { SITE_URL } from '@/fsd/shared/lib/schema/constants';

const SUPPORTED_LANGS = ['ko', 'en'] as const;
const PAGINATION_LIMIT = 100;

const PRIORITY = {
	HOME: 1.0,
	MAIN_SECTION: 0.9,
	SUB_SECTION: 0.8,
	BLOG_POST: 0.8,
	COLLECTION: 0.7,
	GUESTBOOK: 0.7,
	PLACE: 0.7,
	PHOTO: 0.6,
	ABOUT: 0.6,
} as const;

type SitemapEntry = MetadataRoute.Sitemap[number];

async function fetchAllPosts() {
	const allPosts: Array<{ id: string; date: string }> = [];
	let cursor: number | undefined;

	do {
		const result = await getCaller().blog.getAllPosts({
			limit: PAGINATION_LIMIT,
			sort: 'latest',
			cursor,
		});
		allPosts.push(...result.items);
		cursor = result.nextCursor ?? undefined;
	} while (cursor);

	return allPosts;
}

async function fetchAllPhotos() {
	const allPhotos: Array<{ id: string }> = [];
	let cursor: number | undefined;

	do {
		const result = await getCaller().photos.getAllPhotos({
			limit: PAGINATION_LIMIT,
			sort: 'latest',
			cursor,
		});
		allPhotos.push(...result.items);
		cursor = result.nextCursor ?? undefined;
	} while (cursor);

	return allPhotos;
}

async function fetchAllPlaces() {
	const allPlaces: Array<{ id: string }> = [];
	let cursor: string | undefined;

	do {
		const result = await getCaller().place.getAllPlaces({
			limit: PAGINATION_LIMIT,
			sort: 'latest',
			cursor,
		});
		allPlaces.push(...result.items);
		cursor = result.nextCursor ?? undefined;
	} while (cursor);

	return allPlaces;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const entries: SitemapEntry[] = [];

	// Static pages
	const staticPages = [
		{ path: '', priority: PRIORITY.HOME, changeFrequency: 'daily' as const },
		{
			path: '/blog',
			priority: PRIORITY.MAIN_SECTION,
			changeFrequency: 'daily' as const,
		},
		{
			path: '/gallery',
			priority: PRIORITY.MAIN_SECTION,
			changeFrequency: 'daily' as const,
		},
		{
			path: '/gallery/collections',
			priority: PRIORITY.SUB_SECTION,
			changeFrequency: 'weekly' as const,
		},
		{
			path: '/gallery/trending',
			priority: PRIORITY.SUB_SECTION,
			changeFrequency: 'daily' as const,
		},
		{
			path: '/places',
			priority: PRIORITY.MAIN_SECTION,
			changeFrequency: 'weekly' as const,
		},
		{
			path: '/guestbook',
			priority: PRIORITY.GUESTBOOK,
			changeFrequency: 'weekly' as const,
		},
		{
			path: '/about',
			priority: PRIORITY.ABOUT,
			changeFrequency: 'monthly' as const,
		},
	];

	// Add static pages for each language
	for (const lang of SUPPORTED_LANGS) {
		for (const page of staticPages) {
			entries.push({
				url: `${SITE_URL}/${lang}${page.path}`,
				lastModified: new Date(),
				changeFrequency: page.changeFrequency,
				priority: page.priority,
				alternates: {
					languages: Object.fromEntries(
						SUPPORTED_LANGS.map((l) => [l, `${SITE_URL}/${l}${page.path}`]),
					),
				},
			});
		}
	}

	// Blog posts
	try {
		const posts = await fetchAllPosts();

		for (const post of posts) {
			for (const lang of SUPPORTED_LANGS) {
				entries.push({
					url: `${SITE_URL}/${lang}/blog/${post.id}`,
					lastModified: new Date(post.date),
					changeFrequency: 'weekly',
					priority: PRIORITY.BLOG_POST,
					alternates: {
						languages: Object.fromEntries(
							SUPPORTED_LANGS.map((l) => [
								l,
								`${SITE_URL}/${l}/blog/${post.id}`,
							]),
						),
					},
				});
			}
		}
	} catch (error) {
		console.error('Error fetching blog posts for sitemap:', error);
	}

	// Gallery photos
	try {
		const photos = await fetchAllPhotos();

		for (const photo of photos) {
			for (const lang of SUPPORTED_LANGS) {
				entries.push({
					url: `${SITE_URL}/${lang}/gallery/photo/${photo.id}`,
					lastModified: new Date(),
					changeFrequency: 'monthly',
					priority: PRIORITY.PHOTO,
					alternates: {
						languages: Object.fromEntries(
							SUPPORTED_LANGS.map((l) => [
								l,
								`${SITE_URL}/${l}/gallery/photo/${photo.id}`,
							]),
						),
					},
				});
			}
		}
	} catch (error) {
		console.error('Error fetching photos for sitemap:', error);
	}

	// Gallery collections
	try {
		const collections = await getCaller().galleryCollections.getAllCollections({
			sort: 'latest',
		});

		for (const collection of collections) {
			for (const lang of SUPPORTED_LANGS) {
				entries.push({
					url: `${SITE_URL}/${lang}/gallery/collections/${collection.id}`,
					lastModified: new Date(),
					changeFrequency: 'weekly',
					priority: PRIORITY.COLLECTION,
					alternates: {
						languages: Object.fromEntries(
							SUPPORTED_LANGS.map((l) => [
								l,
								`${SITE_URL}/${l}/gallery/collections/${collection.id}`,
							]),
						),
					},
				});
			}
		}
	} catch (error) {
		console.error('Error fetching collections for sitemap:', error);
	}

	// Places
	try {
		const places = await fetchAllPlaces();

		for (const place of places) {
			for (const lang of SUPPORTED_LANGS) {
				entries.push({
					url: `${SITE_URL}/${lang}/places/${place.id}`,
					lastModified: new Date(),
					changeFrequency: 'monthly',
					priority: PRIORITY.COLLECTION,
					alternates: {
						languages: Object.fromEntries(
							SUPPORTED_LANGS.map((l) => [
								l,
								`${SITE_URL}/${l}/places/${place.id}`,
							]),
						),
					},
				});
			}
		}
	} catch (error) {
		console.error('Error fetching places for sitemap:', error);
	}

	return entries;
}
