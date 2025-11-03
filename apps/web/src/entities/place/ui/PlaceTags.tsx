import { TagList } from '@/fsd/shared';
import * as styles from './PlaceTags.css';

interface PlaceTagsProps {
	tags: string[];
}

export function PlaceTags({ tags }: PlaceTagsProps) {
	return (
		<TagList
			tags={tags}
			className={styles.tagsContainer}
			borderColor='primary50'
			borderStyle='solid'
			paddingBottom='5'
		/>
	);
}
