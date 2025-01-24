import { Tag } from '@jung/design-system/components';
import type { CategoryWithCount } from '@jung/shared/types';

interface CategoryCellProps {
	category?: CategoryWithCount;
}

export const CategoryCell = ({ category }: CategoryCellProps) => {
	if (!category) return null;

	return <Tag variant='secondary'>{category.name}</Tag>;
};
