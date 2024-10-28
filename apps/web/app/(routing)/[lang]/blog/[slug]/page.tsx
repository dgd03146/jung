import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import PostDetail from '@/fsd/views/blog/ui/PostDetail';

export default async function Page({ params }: { params: { slug: string } }) {
	const postId = params.slug;

	void trpc.post.getPostById.prefetch(postId);

	return (
		<HydrateClient>
			<PostDetail postId={postId} />
		</HydrateClient>
	);
}
