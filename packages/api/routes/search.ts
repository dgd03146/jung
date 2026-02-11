import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { blogService } from '../services/blog';
import { galleryService } from '../services/gallery';
import { placesService } from '../services/place';

const emptyItems = { items: [] };

export const searchRouter = router({
	global: publicProcedure
		.input(
			z.object({
				query: z
					.string()
					.transform((s) => s.trim())
					.refine((s) => s.length > 0, {
						message: '검색어를 입력해주세요',
					}),
				limit: z.number().min(1).max(10).default(3),
			}),
		)
		.query(async ({ input }) => {
			const { query, limit } = input;

			const [blogs, places, photos] = await Promise.all([
				blogService
					.semanticSearch({
						query,
						limit,
						mode: 'hybrid',
						locale: 'ko',
					})
					.catch(() => emptyItems),
				placesService
					.semanticSearch({ query, limit, mode: 'hybrid' })
					.catch(() => emptyItems),
				galleryService
					.semanticSearch({ query, limit, mode: 'hybrid' })
					.catch(() => emptyItems),
			]);

			return {
				blogs: blogs.items,
				places: places.items,
				photos: photos.items,
			};
		}),
});
