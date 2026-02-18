'use client';

import { Button } from '@jung/design-system/components';
import type { Photo } from '@jung/shared/types';
import { FaShareAlt } from 'react-icons/fa';
import { useTrackEvent } from '@/fsd/shared';
import { useSharePhoto } from '../model/useSharePhoto';
import { ShareModal } from './ShareModal';
import * as styles from './SharePhotoButton.css';

interface SharePhotoButtonProps {
	photo: Photo;
}

export const SharePhotoButton = ({ photo }: SharePhotoButtonProps) => {
	const { handleShare, isShareModalOpen, setIsShareModalOpen, getShareLinks } =
		useSharePhoto();

	const { trackEvent } = useTrackEvent();

	const openShareModal = () => {
		trackEvent({
			event_name: 'share_photo',
			event_category: 'engagement',
			resource_type: 'photo',
			resource_id: photo.id,
		});
		handleShare(photo);
	};

	return (
		<>
			<Button
				variant='ghost'
				color='primary'
				className={styles.sharePhotoButton}
				onClick={openShareModal}
				aria-label='사진 공유하기'
			>
				<FaShareAlt size={16} />
			</Button>
			{isShareModalOpen && (
				<ShareModal
					isOpen={isShareModalOpen}
					onClose={() => setIsShareModalOpen(false)}
					links={getShareLinks(photo)}
				/>
			)}
		</>
	);
};
