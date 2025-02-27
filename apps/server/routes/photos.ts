import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { photosService } from '../services/photos';

export const photosRouter = router({
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
			return photosService.findMany({ limit, cursor, sort, q });
		}),

	getPhotoById: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		return photosService.findById(input);
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
			return photosService.findAdjacentPhotos(id, { sort, collectionId });
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
			return photosService.toggleLike({ photoId, userId });
		}),
});
