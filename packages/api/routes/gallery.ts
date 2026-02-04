import { z } from 'zod';
import { checkRateLimit } from '../lib/rateLimiter';
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
			z
				.object({
					photoId: z.string(),
					userId: z.string().optional(),
					anonymousId: z
						.string()
						.regex(/^anon_/)
						.optional(),
				})
				.refine((data) => data.userId || data.anonymousId, {
					message: 'userId 또는 anonymousId 중 하나는 필수입니다',
				}),
		)
		.mutation(async ({ input }) => {
			const isAnonymous = Boolean(input.anonymousId);
			const identifier = input.anonymousId ?? input.userId!;
			checkRateLimit(
				identifier,
				isAnonymous ? 'anonymousLike' : 'authenticatedLike',
			);
			return galleryService.toggleLike({
				photoId: input.photoId,
				identifier,
			});
		}),

	getLikeInfo: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		return galleryService.getLikeInfo(input);
	}),
});
