import { Flex, Tag, Typography } from '@jung/design-system/components';

export const PostTags = ({ tags }: { tags: string[] }) => (
	<Flex gap='2' wrap='wrap' flex='1' minWidth='0'>
		{tags.map((tag) => (
			<Tag key={tag} variant='secondary'>
				<Typography.FootNote># {tag}</Typography.FootNote>
			</Tag>
		))}
	</Flex>
);
