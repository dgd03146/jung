import { Box, Typography } from '@jung/design-system/components';
import { MdLightbulb } from 'react-icons/md';
import * as styles from '../SpotTable.css';

interface TipsCellProps {
	tips: string[];
}

export const TipsCell = ({ tips }: TipsCellProps) => (
	<Box display='flex' flexDirection='column' gap='1'>
		{tips.slice(0, 2).map((tip, index) => (
			<Box
				key={index}
				display='flex'
				alignItems='center'
				gap='1'
				className={styles.tipItem}
			>
				<MdLightbulb size={14} color='#6B7280' />
				<Typography.Text level={3} color='gray600' className={styles.tipText}>
					{tip}
				</Typography.Text>
			</Box>
		))}
		{tips.length > 2 && (
			<Typography.Text level={3} color='gray400'>
				+{tips.length - 2}개 더보기
			</Typography.Text>
		)}
	</Box>
);
