import { Flex, Tag, Typography } from '@jung/design-system/components';
import * as styles from './SpotTags.css';

interface SpotTagsProps {
	tags: string[];
}

export function SpotTags({ tags }: SpotTagsProps) {
	if (!tags?.length) return null;

	return (
		<Flex
			gap='2'
			wrap='wrap'
			className={styles.tagsContainer}
			borderColor='primary50'
			borderStyle='solid'
			paddingBottom='5'
		>
			{tags.map((tag) => (
				<Tag key={tag} variant='secondary'>
					<Typography.FootNote level={1}># {tag}</Typography.FootNote>
				</Tag>
			))}
		</Flex>
	);
}
