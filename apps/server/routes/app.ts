import { createCallerFactory, router } from '../lib/trpc';
import { categoryRouter } from './category';
import { guestbookRouter } from './guestbook';
import { photoCollectionsRouter } from './photo_collections';
import { photosRouter } from './photos';
import { postRouter } from './post';
import { commentRouter } from './post_comment';
import { spotRouter } from './spot';
export const appRouter = router({
	post: postRouter,
	comment: commentRouter,
	photos: photosRouter,
	photoCollections: photoCollectionsRouter,
	spot: spotRouter,
	guestbook: guestbookRouter,
	category: categoryRouter,
});

export type AppRouter = typeof appRouter;

const createCaller = createCallerFactory(appRouter);

export const caller = createCaller({});
