import { createCallerFactory, router } from '../lib/trpc';
import { postRouter } from './post';

export const appRouter = router({
	post: postRouter,
});

export type AppRouter = typeof appRouter;

const createCaller = createCallerFactory(appRouter);

export const caller = createCaller({});
