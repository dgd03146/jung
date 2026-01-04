import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { galleryService } from '../services/gallery';

export const galleryRouter = router({
	getAllPhotos: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).default(20),
				cursor: z.number().optional(),

				sort: z.enum(['latest', 'popular']).default('latest'),
				q: z.string().optional(),
			}),
		)
		.query(async (opts) => {
			const { input } = opts;
			const { limit, cursor, sort, q } = input;
			return galleryService.findMany({ limit, cursor, sort, q });
		}),

	getPhotoById: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		return galleryService.findById(input);
	}),

	getAdjacentPhotos: publicProcedure
		.input(
			z.object({
				id: z.string(),
				sort: z.enum(['latest', 'popular']).optional().default('latest'),
				collectionId: z.string().optional(),
			}),
		)
		.query(async (opts) => {
			const { id, sort, collectionId } = opts.input;
			return galleryService.findAdjacentPhotos(id, { sort, collectionId });
		}),

	toggleLike: publicProcedure
		.input(
			z.object({
				photoId: z.string(),
				userId: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const { photoId, userId } = input;
			return galleryService.toggleLike({ photoId, userId });
		}),

	getLikeInfo: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		return galleryService.getLikeInfo(input);
	}),
});
