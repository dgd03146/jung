import { TagList } from '@/fsd/shared';

export const PostTags = ({ tags }: { tags: string[] }) => (
	<TagList tags={tags} flex={1} minWidth='0' />
);
