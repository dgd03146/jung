import { SpotQueryParamsSchema } from '@jung/shared/types';
import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { spotsService } from '../services/spot';

export const spotRouter = router({
	getAllSpots: publicProcedure
		.input(SpotQueryParamsSchema)
		.query(async ({ input }) => {
			const { limit, category_id, sort, q, cursor } = input;
			return spotsService.findMany({
				limit,
				cursor,
				category_id,
				sort,
				q,
			});
		}),

	getSpotById: publicProcedure.input(z.string().uuid()).query(({ input }) => {
		return spotsService.findById(input);
	}),
	toggleLike: publicProcedure
		.input(z.object({ spotId: z.string(), userId: z.string() }))
		.mutation(({ input }) => {
			return spotsService.toggleLike(input);
		}),
});
