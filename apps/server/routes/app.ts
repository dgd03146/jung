import { router } from '../lib/trpc';
import { photosRouter } from './photos';
import { postRouter } from './post';
import { commentRouter } from './post_comment';

export const appRouter = router({
	post: postRouter,
	comment: commentRouter,
	photos: photosRouter,
});

export type AppRouter = typeof appRouter;

// const createCaller = createCallerFactory(appRouter);

// export const caller = createCaller({});
