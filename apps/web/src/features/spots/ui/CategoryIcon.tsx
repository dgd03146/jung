import type { SpotCategory } from '@jung/shared/types';
import {
	MdForest,
	MdLocalCafe,
	MdLocationCity,
	MdNightlife,
	MdPark,
	MdStorefront,
	MdTempleHindu,
	MdTheaterComedy,
} from 'react-icons/md';

interface CategoryIconProps {
	category: SpotCategory;
}

const getCategoryIcon = (category: SpotCategory) => {
	const iconProps = {
		size: 20,
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
		default:
			return <MdLocationCity {...iconProps} />;
	}
};

const CategoryIcon = ({ category }: CategoryIconProps) => {
	return getCategoryIcon(category);
};

export default CategoryIcon;
