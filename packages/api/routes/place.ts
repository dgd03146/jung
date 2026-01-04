import { PlaceQueryParamsSchema } from '@jung/shared/types';
import { z } from 'zod';
import { publicProcedure, router } from '../lib/trpc';
import { placesService } from '../services/place';

export const placeRouter = router({
	getAllPlaces: publicProcedure
		.input(PlaceQueryParamsSchema)
		.query(async ({ input }) => {
			const { limit, sort, q, cat, cursor } = input;
			return placesService.findMany({
				limit,
				cursor,
				cat,
				sort,
				q,
			});
		}),

	getPlaceById: publicProcedure.input(z.string().uuid()).query(({ input }) => {
		return placesService.findById(input);
	}),

	getLikeInfo: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		return placesService.getLikeInfo(input);
	}),

	toggleLike: publicProcedure
		.input(z.object({ placeId: z.string(), userId: z.string() }))
		.mutation(({ input }) => {
			return placesService.toggleLike(input);
		}),
});
