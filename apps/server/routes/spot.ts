import { spotsService } from '@/services/spot';
import { SpotQueryParamsSchema } from '@jung/shared/types';
import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';

export const spotRouter = router({
	getAllSpots: publicProcedure
		.input(SpotQueryParamsSchema)
		.query(async ({ input }) => {
			const { limit, cat, sort, q, cursor } = input;
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
});
