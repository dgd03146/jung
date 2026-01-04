import {
	Box,
	List,
	ListItem,
	Typography,
} from '@jung/design-system/components';
import * as styles from './PlaceTips.css';

interface PlaceTipsProps {
	tips: string[];
}

export function PlaceTips({ tips }: PlaceTipsProps) {
	if (!tips?.length) return null;

	return (
		<Box marginTop='6'>
			<Typography.Heading level={5} color='primary' marginBottom='4'>
				Tips
			</Typography.Heading>
			<List
				items={tips}
				display='flex'
				flexDirection='column'
				gap='3'
				renderItem={(tip) => (
					<ListItem
						className={styles.tipItem}
						key={tip}
						padding='4'
						borderRadius='lg'
					>
						<Typography.Text color='black100' level={4} fontWeight='medium'>
							{tip}
						</Typography.Text>
					</ListItem>
				)}
			/>
		</Box>
	);
}
