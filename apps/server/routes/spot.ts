import { SpotQueryParamsSchema } from '@jung/shared/types';
import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { spotsService } from '../services/spot';

export const spotRouter = router({
	getAllSpots: publicProcedure
		.input(SpotQueryParamsSchema)
		.query(async ({ input }) => {
			const { limit, sort, q, cat, cursor } = input;
			return spotsService.findMany({
				limit,
				cursor,
				cat,
				sort,
				q,
			});
		}),

	getSpotById: publicProcedure.input(z.string().uuid()).query(({ input }) => {
		return spotsService.findById(input);
	}),

	getLikeInfo: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		return spotsService.getLikeInfo(input);
	}),

	toggleLike: publicProcedure
		.input(z.object({ spotId: z.string(), userId: z.string() }))
		.mutation(({ input }) => {
			return spotsService.toggleLike(input);
		}),
});
