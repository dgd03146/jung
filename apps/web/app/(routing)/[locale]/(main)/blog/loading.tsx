import { PostListSkeleton } from '@/fsd/entities/blog';

export default function Loading() {
	return <PostListSkeleton count={6} />;
}
