import { Button } from '@jung/design-system/components';
import type { Spot } from '@jung/shared/types';
import { IoShareOutline } from 'react-icons/io5';
import { useShareSpot } from '../model/useShareSpot';

interface ShareSpotButtonProps {
	spot: Spot;
}

export const ShareSpotButton = ({ spot }: ShareSpotButtonProps) => {
	const { handleShare } = useShareSpot();

	return (
		<Button
			variant='outline'
			borderRadius='md'
			onClick={() =>
				handleShare({
					title: spot.title,
					description: spot.description,
					imageUrl: spot.photos[0]?.url,
					link: {
						mobileWebUrl: window.location.href,
						webUrl: window.location.href,
					},
				})
			}
			aria-label='Share spot'
		>
			<IoShareOutline size={18} />
		</Button>
	);
};
