import { Typography } from '@jung/design-system/components';
import type { CategoryWithCount } from '@jung/shared/types';

interface CategoryCellProps {
	category?: CategoryWithCount;
}

export const CategoryCell = ({ category }: CategoryCellProps) => {
	if (!category) return null;

	return (
		<Typography.Text
			level={3}
			style={{
				color: category.color || '#000000',
				display: 'inline-flex',
				alignItems: 'center',
				gap: '4px',
			}}
		>
			{category.name}
		</Typography.Text>
	);
};
