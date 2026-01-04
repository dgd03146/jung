import { Tag } from '@jung/design-system/components';
import type { CategoryCount } from '@jung/shared/types';

interface CategoryCellProps {
	category?: CategoryCount;
}

export const CategoryCell = ({ category }: CategoryCellProps) => {
	if (!category) return null;

	return <Tag variant='secondary'>{category.name}</Tag>;
};
