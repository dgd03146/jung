'use client';

import { Button } from '@jung/design-system/components';
import type { Photo } from '@jung/shared/types';
import { FaShareAlt } from 'react-icons/fa';
import * as styles from './SharePhotoButton.css';

interface SharePhotoButtonProps {
	photo: Photo;
	onShare: (photo: Photo) => void;
}

export const SharePhotoButton = ({ photo, onShare }: SharePhotoButtonProps) => {
	return (
		<Button
			variant='ghost'
			color='primary'
			className={styles.sharePhotoButton}
			onClick={() => onShare(photo)}
			aria-label='사진 공유하기'
		>
			<FaShareAlt size={16} />
		</Button>
	);
};
