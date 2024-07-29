import { BlogPage } from '@/fsd/views';
import { caller } from '@jung/server';

export default async function Page() {
	const posts = await caller.post.getAllPosts();

	console.log(posts, 'posts');

	return <BlogPage />;
}
