import { Button } from '@jung/design-system/components';
import type { Place } from '@jung/shared/types';
import { IoShareOutline } from 'react-icons/io5';
import { useSharePlace } from '../model/useSharePlace';

interface SharePlaceButtonProps {
	place: Place;
}

export const SharePlaceButton = ({ place }: SharePlaceButtonProps) => {
	const { handleShare } = useSharePlace();

	return (
		<Button
			variant='outline'
			borderRadius='md'
			onClick={() =>
				handleShare({
					title: place.title,
					description: place.description,
					imageUrl: place.photos[0]?.url,
					link: {
						mobileWebUrl: window.location.href,
						webUrl: window.location.href,
					},
				})
			}
			aria-label='Share place'
		>
			<IoShareOutline size={18} />
		</Button>
	);
};
