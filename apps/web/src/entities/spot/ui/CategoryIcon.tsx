import type { SpotCategory } from '@jung/shared/types';
import {
	MdBeachAccess,
	MdChurch,
	MdForest,
	MdHotel,
	MdLandscape,
	MdLocalCafe,
	MdLocalPlay,
	MdLocationCity,
	MdMuseum,
	MdNightlife,
	MdPark,
	MdRestaurant,
	MdShoppingBag,
	MdSports,
	MdStorefront,
	MdTempleHindu,
	MdTheaterComedy,
	MdTrain,
} from 'react-icons/md';

interface CategoryIconProps {
	category: SpotCategory;
	size?: number;
}

const getCategoryIcon = ({ category, size = 20 }: CategoryIconProps) => {
	const iconProps = {
		size,
		color: 'currentColor',
		style: {
			filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
		},
	};

	switch (category) {
		case 'nature':
			return <MdForest {...iconProps} />;
		case 'landmark':
			return <MdLocationCity {...iconProps} />;
		case 'historic':
			return <MdTempleHindu {...iconProps} />;
		case 'culture':
			return <MdTheaterComedy {...iconProps} />;
		case 'night':
			return <MdNightlife {...iconProps} />;
		case 'street':
			return <MdStorefront {...iconProps} />;
		case 'park':
			return <MdPark {...iconProps} />;
		case 'local':
			return <MdLocalCafe {...iconProps} />;
		case 'restaurant':
			return <MdRestaurant {...iconProps} />;
		case 'museum':
			return <MdMuseum {...iconProps} />;
		case 'shopping':
			return <MdShoppingBag {...iconProps} />;
		case 'beach':
			return <MdBeachAccess {...iconProps} />;
		case 'sports':
			return <MdSports {...iconProps} />;
		case 'entertainment':
			return <MdLocalPlay {...iconProps} />;
		case 'religious':
			return <MdChurch {...iconProps} />;
		case 'viewpoint':
			return <MdLandscape {...iconProps} />;
		case 'hotel':
			return <MdHotel {...iconProps} />;
		case 'transport':
			return <MdTrain {...iconProps} />;
		default:
			return <MdLocationCity {...iconProps} />;
	}
};

export const CategoryIcon = ({ category, size }: CategoryIconProps) => {
	return getCategoryIcon({ category, size });
};
