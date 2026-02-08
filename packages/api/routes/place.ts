import { PlaceQueryParamsSchema } from '@jung/shared/types';
import { z } from 'zod';
import { checkRateLimit } from '../lib/rateLimiter';
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

	/**
	 * 시맨틱 검색 (Agentic RAG)
	 */
	semanticSearch: publicProcedure
		.input(
			z.object({
				query: z
					.string()
					.transform((s) => s.trim())
					.refine((s) => s.length > 0, { message: '검색어를 입력해주세요' }),
				limit: z.number().min(1).max(20).default(5),
				mode: z.enum(['vector', 'keyword', 'hybrid']).default('hybrid'),
			}),
		)
		.query(({ input }) => {
			return placesService.semanticSearch(input);
		}),

	/**
	 * 장소 임베딩 생성
	 * 장소 생성/수정 시 호출
	 */
	generateEmbedding: publicProcedure
		.input(z.object({ placeId: z.string() }))
		.mutation(({ input }) => {
			checkRateLimit(input.placeId, 'embeddingGeneration');
			return placesService.generateEmbeddingForPlace(input.placeId);
		}),
});
