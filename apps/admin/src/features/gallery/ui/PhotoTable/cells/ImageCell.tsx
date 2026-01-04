import { Box } from '@jung/design-system/components';
import * as styles from './ImageCell.css';

interface ImageCellProps {
	url: string;
	alt: string;
}

export const ImageCell = ({ url, alt }: ImageCellProps) => (
	<Box
		as='img'
		className={styles.imageCell}
		src={url}
		alt={alt}
		width='20'
		height='20'
		borderRadius='lg'
		boxShadow='primary'
	/>
);
