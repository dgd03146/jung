import { router } from '../lib/trpc';
import { blogRouter } from './blog';
import { categoryRouter } from './category';
import { galleryRouter } from './gallery';
import { galleryCollectionsRouter } from './gallery_collections';
import { guestbookRouter } from './guestbook';
import { photoCollectionsRouter } from './photo_collections';
import { photosRouter } from './photos';
import { placeRouter } from './place';
import { commentRouter } from './post_comment';
export const appRouter = router({
	blog: blogRouter,
	postComment: commentRouter,
	gallery: galleryRouter,
	galleryCollections: galleryCollectionsRouter,
	photos: photosRouter,
	photoCollections: photoCollectionsRouter,
	place: placeRouter,
	guestbook: guestbookRouter,
	category: categoryRouter,
});

export type AppRouter = typeof appRouter;
