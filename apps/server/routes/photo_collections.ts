import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { collectionsService } from '../services/photo_collections';

export const photoCollectionsRouter = router({
	// 전체 컬렉션 조회
	getAllCollections: publicProcedure
		.input(
			z.object({
				sort: z.enum(['latest', 'popular']).default('latest'),
			}),
		)
		.query(async (opts) => {
			const { input } = opts;
			const { sort } = input;
			return collectionsService.findMany({ sort });
		}),

	// 특정 컬렉션 조회
	getCollectionById: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		return collectionsService.findById(input);
	}),
});
