import { router } from '../lib/trpc';
import { postRouter } from './post';
import { commentRouter } from './post_comment';

export const appRouter = router({
	post: postRouter,
	comment: commentRouter,
});

export type AppRouter = typeof appRouter;

// const createCaller = createCallerFactory(appRouter);

// export const caller = createCaller({});
