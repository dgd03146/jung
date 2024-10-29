import PostDetail from '@/fsd/features/blog/post/ui/PostDetail';
import { HydrateClient, trpc } from '@/fsd/shared/index.server';

export default async function Page({ params }: { params: { slug: string } }) {
	const postId = params.slug;

	void trpc.post.getPostById.prefetch(postId);

	return (
		<HydrateClient>
			<PostDetail postId={postId} />
		</HydrateClient>
	);
}
