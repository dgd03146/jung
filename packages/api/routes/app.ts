import { router } from '../lib/trpc';
import { analyticsRouter } from './analytics';
import { articleRouter } from './article';
import { blogRouter } from './blog';
import { categoryRouter } from './category';
import { galleryRouter } from './gallery';
import { galleryCollectionsRouter } from './gallery_collections';
import { guestbookRouter } from './guestbook';
import { photoCollectionsRouter } from './photo_collections';
import { photosRouter } from './photos';
import { placeRouter } from './place';
import { commentRouter } from './post_comment';
import { searchRouter } from './search';
import { translateRouter } from './translate';
export const appRouter = router({
	analytics: analyticsRouter,
	article: articleRouter,
	blog: blogRouter,
	postComment: commentRouter,
	gallery: galleryRouter,
	galleryCollections: galleryCollectionsRouter,
	photos: photosRouter,
	photoCollections: photoCollectionsRouter,
	place: placeRouter,
	guestbook: guestbookRouter,
	category: categoryRouter,
	translate: translateRouter,
	search: searchRouter,
});

export type AppRouter = typeof appRouter;
