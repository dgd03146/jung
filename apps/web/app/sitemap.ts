import type { MetadataRoute } from 'next';
import { caller } from '@/fsd/shared/index.server';

const SITE_URL = 'https://www.geojung.com';
const SUPPORTED_LANGS = ['ko', 'en'] as const;

type SitemapEntry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const entries: SitemapEntry[] = [];

	// Static pages
	const staticPages = [
		{ path: '', priority: 1.0, changeFrequency: 'daily' as const },
		{ path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
		{ path: '/gallery', priority: 0.9, changeFrequency: 'daily' as const },
		{
			path: '/gallery/collections',
			priority: 0.8,
			changeFrequency: 'weekly' as const,
		},
		{
			path: '/gallery/trending',
			priority: 0.8,
			changeFrequency: 'daily' as const,
		},
		{ path: '/places', priority: 0.9, changeFrequency: 'weekly' as const },
		{ path: '/guestbook', priority: 0.7, changeFrequency: 'weekly' as const },
		{ path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
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
		const posts = await caller.blog.getAllPosts({
			limit: 100,
			sort: 'latest',
		});

		for (const post of posts.items) {
			for (const lang of SUPPORTED_LANGS) {
				entries.push({
					url: `${SITE_URL}/${lang}/blog/${post.id}`,
					lastModified: new Date(post.date),
					changeFrequency: 'weekly',
					priority: 0.8,
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
		const photos = await caller.photos.getAllPhotos({
			limit: 100,
			sort: 'latest',
		});

		for (const photo of photos.items) {
			for (const lang of SUPPORTED_LANGS) {
				entries.push({
					url: `${SITE_URL}/${lang}/gallery/photo/${photo.id}`,
					lastModified: new Date(),
					changeFrequency: 'monthly',
					priority: 0.6,
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
		const collections = await caller.galleryCollections.getAllCollections({
			sort: 'latest',
		});

		for (const collection of collections) {
			for (const lang of SUPPORTED_LANGS) {
				entries.push({
					url: `${SITE_URL}/${lang}/gallery/collections/${collection.id}`,
					lastModified: new Date(),
					changeFrequency: 'weekly',
					priority: 0.7,
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
		const places = await caller.place.getAllPlaces({
			limit: 100,
			sort: 'latest',
		});

		for (const place of places.items) {
			for (const lang of SUPPORTED_LANGS) {
				entries.push({
					url: `${SITE_URL}/${lang}/places/${place.id}`,
					lastModified: new Date(),
					changeFrequency: 'monthly',
					priority: 0.7,
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
