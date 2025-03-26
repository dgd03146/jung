import { Button } from '@jung/design-system/components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useToggleSpotLike } from '../model/useToggleSpotLike';
import * as styles from './ToggleSpotLikeButton.css';

interface ToggleSpotLikeButtonProps {
	spotId: string;
}

export function ToggleSpotLikeButton({ spotId }: ToggleSpotLikeButtonProps) {
	const { toggleLike, getIsLiked } = useToggleSpotLike();
	const isLiked = getIsLiked(spotId);

	const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		toggleLike(spotId);
	};

	return (
		<Button
			className={styles.likeButton}
			type='button'
			onClick={handleLikeClick}
			aria-label={isLiked ? '좋아요 취소' : '좋아요'}
		>
			{isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
		</Button>
	);
}
