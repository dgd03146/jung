import { TagList } from '@/fsd/shared';

interface PhotoTagsProps {
	tags?: string[];
}

export const PhotoTags = ({ tags }: PhotoTagsProps) => <TagList tags={tags} />;
