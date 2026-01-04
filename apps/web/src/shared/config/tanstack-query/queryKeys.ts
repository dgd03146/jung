import { createQueryKeyStore } from '@lukemorales/query-key-factory';

// FIXME: trpc useQuery는 쿼리키를 자체적으로 생산하기에 필요없을수도??
export const queryKeys = createQueryKeyStore({
	blog: {
		all: null,
		detail: (postId: string) => [postId],
		byCategory: (category: string) => [category],
	},
	comments: {
		all: (postId: string) => [postId],
		detail: (commentId: string) => [commentId],
	},
	user: {
		profile: null,
		posts: (userId: string) => [userId],
	},
});
