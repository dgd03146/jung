import { Flex, Tag, Typography } from '@jung/design-system/components';

interface PhotoTagsProps {
	tags?: string[];
}

export const PhotoTags = ({ tags }: PhotoTagsProps) => {
	if (!tags?.length) return null;

	return (
		<Flex gap='2'>
			{tags.map((tag) => (
				<Tag key={tag} variant='secondary'>
					<Typography.FootNote level={1}># {tag}</Typography.FootNote>
				</Tag>
			))}
		</Flex>
	);
};
